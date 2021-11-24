<template>
  <div
    id="tags-view-container"
    class="tags-view-container"
  >
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="(tag, i) in visitedViews"
        :ref="el => tagList[i]=el"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle="!isAffix(tag)?closeSelectedTag(tag):''"
        @contextmenu.prevent="openMenu(tag,$event)"
      >
        {{ tag.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close tag-icon"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{left:left+'px',top:top+'px'}"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <li
        v-if="!isAffix(selectedTag)"
        @click="closeSelectedTag(selectedTag)"
      >Close</li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import path from 'path'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { defineComponent, computed, watch, toRefs, onMounted, reactive, ref, nextTick, getCurrentInstance } from 'vue'

export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const { proxy } = getCurrentInstance()
    const state = reactive({
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    })
    const tagList = ref([])
    const scrollPane = ref(null)
    const visitedViews = computed(() => store.state.tagsView.visitedViews)
    const routes = computed(() => {
      return JSON.parse(JSON.stringify(store.state.permission.routes))
    })

    /* watch */
    watch(() => route.path, () => {
      addTags()
      moveToCurrentTag()
    })

    watch(() => state.visible, (value) => {
      if (value) {
        document.body.addEventListener('click', closeMenu)
      } else {
        document.body.removeEventListener('click', closeMenu)
      }
    })

    /* methods */
    const isActive = (_route) => {
      return _route.path === route.path
    }

    const isAffix = (tag) => {
      return tag.meta && tag.meta.affix
    }

    const filterAffixTags = (routes, basePath = '/') => {
      let tags = []
      if (routes) {
        routes.forEach(route => {
          if (route.meta && route.meta.affix) {
            const tagPath = path.resolve(basePath, route.path)
            tags.push({
              fullPath: tagPath,
              path: tagPath,
              name: route.name,
              meta: { ...route.meta }
            })
          }
          if (route.children) {
            const tempTags = filterAffixTags(route.children, route.path)
            if (tempTags.length >= 1) {
              tags = [...tags, ...tempTags]
            }
          }
        })
        return tags
      }
    }

    const initTags = () => {
      const affixTags = state.affixTags = filterAffixTags(routes.value)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          store.dispatch('addVisitedView', tag)
        }
      }
    }

    const addTags = () => {
      const { name } = route
      if (name) {
        store.dispatch('addView', route)
      }
      return false
    }

    const moveToCurrentTag = () => {
      const tags = tagList.value
      nextTick(() => {
        for (const tag of tags) {
          if (tag?.to.path === route.path) {
            scrollPane.value.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== route.fullPath) {
              store.dispatch('updateVisitedView', route)
            }
            break
          }
        }
      })
    }

    const refreshSelectedTag = (view) => {
      store.dispatch('delCachedView', view).then(() => {
        const { fullPath } = view
        nextTick(() => {
          router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    }

    const closeSelectedTag = (view) => {
      store.dispatch('delView', view).then(({ visitedViews }) => {
        if (isActive(view)) {
          toLastView(visitedViews, view)
        }
      })
    }

    const closeOthersTags = () => {
      router.push(state.selectedTag)
      store.dispatch('delOthersViews', state.selectedTag).then(() => {
        moveToCurrentTag()
      })
    }

    const closeAllTags = (view) => {
      store.dispatch('delAllViews').then(({ visitedViews }) => {
        if (state.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        toLastView(visitedViews, view)
      })
    }

    const toLastView = (visitedViews, view) => {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          router.replace({ path: '/redirect' + view.fullPath })
        } else {
          router.push('/')
        }
      }
    }

    const openMenu = (tag, e) => {
      const _this = proxy.$el
      const menuMinWidth = 105
      const offsetLeft = _this.getBoundingClientRect().left // container margin left
      const offsetWidth = _this.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        state.left = maxLeft
      } else {
        state.left = left
      }

      state.top = e.clientY
      state.visible = true
      state.selectedTag = tag
    }

    const closeMenu = () => {
      state.visible = false
    }

    const handleScroll = () => {
      closeMenu()
    }

    onMounted(() => {
      initTags()
      addTags()
    })

    return {
      ...toRefs(state), visitedViews, isActive, tagList, scrollPane,
      isAffix, refreshSelectedTag,
      closeSelectedTag,
      closeOthersTags,
      closeAllTags,
      toLastView,
      openMenu,
      handleScroll,
      filterAffixTags
    }
  },
  components: { ScrollPane }

})
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #1890ff;
        color: #fff;
        border-color: #1890ff;
        // &::before {
        //   content: "";
        //   background: #fff;
        //   display: inline-block;
        //   width: 8px;
        //   height: 8px;
        //   border-radius: 50%;
        //   position: relative;
        //   margin-right: 2px;
        // }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 0;
      height: 16px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        // vertical-align: middle;
      }
      &:hover {
        background-color: #d9d9d9;
        color: #000;
      }
    }
    &.active .el-icon-close:hover {
      background-color: #fff;
      color: #1890ff;
    }
    .tag-icon {
      font-size: 0;
    }
    &:hover {
      .el-icon-close {
        width: 16px;
      }
      .tag-icon {
        font-size: 16px;
      }
    }
  }
}
</style>
