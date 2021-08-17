<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2020-10-19 09:49:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-16 14:49:24
-->

<template>
  <section class="app-main">
    <router-view :key="key" v-slot="{Component}">
      <transition name="slide-fade">
        <keep-alive :include="cachedViews">
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>
<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'AppMain',
  setup() {
    const store = useStore()

    /* computed */
    const cachedViews = computed(() => store.state.tagsView.cachedViews)
    const key = computed(() => store.path)
    return { cachedViews, key }
  }
})
</script>
<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 20px;
  background: #f0f2f5;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>
<style lang="scss">
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
