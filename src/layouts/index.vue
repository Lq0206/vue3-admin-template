<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-04-16 18:03:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-16 18:19:08
-->
<template>
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <div
      v-if="device==='mobile'&&sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div
      :class="{hasTagsView:needTagsView}"
      class="main-container"
    >
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { useStore } from 'vuex'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
    // TagsView
  },
  // mixins: [ResizeMixin],
  setup() {
    const store = useStore()
    const { isMobileValid, resizeHandler } = ResizeMixin()
    // resizeHandler()

    const sidebar = computed(() => store.state.app.sidebar)
    const device = computed(() => store.state.app.device)
    const showSettings = computed(() => store.state.settings.showSettings)
    const needTagsView = computed(() => store.state.settings.tagsView)
    const fixedHeader = computed(() => store.state.settings.fixedHeader)
    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
        withoutAnimation: sidebar.value.withoutAnimation,
        mobile: device.value === 'mobile'
      }
    })

    const handleClickOutside = () => {
      store.dispatch('closeSideBar', { withoutAnimation: false })
    }

    return { sidebar, device, showSettings,
      needTagsView, fixedHeader, classObj,
      handleClickOutside, isMobileValid,
      resizeHandler }
  }
})
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
