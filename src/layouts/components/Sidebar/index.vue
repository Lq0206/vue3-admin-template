<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2020-10-19 10:16:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-21 17:05:19
-->
<template>
  <div :class="{'has-logo':showLogo}">
    <logo
      v-if="showLogo"
      :collapse="isCollapse"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script type="text/ecmascript-6">
import { useStore } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variablesStyle from '@/styles/variables.scss'
import { defineComponent, computed, provide } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'Sidebar',
  components: { SidebarItem, Logo },
  setup() {
    const store = useStore()
    const route = useRoute()
    const permission_routes = computed(() => store.getters.permission_routes)
    const sidebar = computed(() => store.getters.sidebar)
    const activeMenu = computed(() => {
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    const showLogo = computed(() => store.state.settings.sidebarLogo)
    const variables = computed(() => variablesStyle)
    const isCollapse = computed(() => !sidebar.value.opened)
    provide('isCollapse', isCollapse)
    return { permission_routes, sidebar, activeMenu, showLogo, isCollapse, variables }
  }
})

</script>
<style lang="scss" scoped>
</style>
