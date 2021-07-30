<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2020-10-19 10:29:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-21 15:27:20
-->
<template>
  <el-scrollbar
ref="scrollContainer"
                :vertical="false"
                class="scroll-container"
                @wheel.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script>
import { defineComponent, reactive, computed, ref, onMounted, onUnmounted, toRefs, getCurrentInstance } from 'vue'
const tagAndTagSpacing = 4 // tagAndTagSpacing

export default defineComponent({
  name: 'ScrollPane',
  emits: ['handleScroll'],
  setup(props, cxt) {
    const state = reactive({
      left: 0
    })

    const scrollContainer = ref(null)
    const { proxy } = getCurrentInstance()

    const scrollWrapper = computed(() => scrollContainer.value.$refs.wrap)

    onMounted(() => {
      scrollWrapper.value.addEventListener('scroll', emitScroll, true)
    })

    onUnmounted(() => {
      scrollWrapper.value.removeEventListener('scroll', emitScroll)
    })

    const handleScroll = (e) => {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = scrollWrapper.value
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
    }

    const emitScroll = () => {
      cxt.emit('scroll')
    }

    const moveToTarget = (currentTag) => {
      const $container = scrollContainer.value.$el
      const $containerWidth = $container.offsetWidth
      const $scrollWrapper = scrollWrapper.value
      const tagList = proxy.$parent.tagList

      let firstTag = null
      let lastTag = null

      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }

      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex(item => item === currentTag)
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft = nextTag?.$el.offsetLeft + nextTag?.$el.offsetWidth + tagAndTagSpacing

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft = prevTag?.$el.offsetLeft - tagAndTagSpacing

        if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
        }
      }
    }

    return { ...toRefs(state),
      scrollContainer,
      scrollWrapper,
      handleScroll,
      emitScroll,
      moveToTarget }
  }
})
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  ::v-deep {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>
