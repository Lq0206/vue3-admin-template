<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">系统配置</h3>

      <div class="drawer-item">
        <span>主题颜色</span>
        <theme-picker
          style="float: right;height: 26px;margin: -3px 8px 0 0;"
          @change="themeChange"
        />
      </div>

      <div class="drawer-item">
        <span>启用页面标签</span>
        <el-switch
          v-model="tagsView"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>固定顶部</span>
        <el-switch
          v-model="fixedHeader"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>启用菜单LOGO</span>
        <el-switch
          v-model="sidebarLogo"
          class="drawer-switch"
        />
      </div>
      <!-- <div class="drawer-item">
        <span>黑暗模式</span>
        <el-switch
          v-model="darkMode"
          class="drawer-switch"
        />
      </div> -->

    </div>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  components: { ThemePicker },
  setup() {
    const store = useStore()
    const fixedHeader = computed({
      get() {
        return store.state.settings.fixedHeader
      },
      set(val) {
        store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val
        })
      }
    })

    const tagsView = computed({
      get() {
        return store.state.settings.tagsView
      },
      set(val) {
        store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: val
        })
      }
    })

    const sidebarLogo = computed({
      get() {
        return store.state.settings.sidebarLogo
      },
      set(val) {
        store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val
        })
      }
    })

    // const darkMode = computed({
    //   get() {
    //     return store.state.settings.darkMode
    //   },
    //   set(val) {
    //     store.dispatch('settings/changeSetting', {
    //       key: 'darkMode',
    //       value: val
    //     })
    //   }
    // })

    const themeChange = (val) => {
      store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
    }

    // watch(() => darkMode.value, () => {
    //   if (darkMode.value) {
    //     window.document.documentElement.setAttribute('data-theme', 'dark')
    //   } else {
    //     window.document.documentElement.setAttribute('data-theme', 'light')
    //   }
    // })

    return {
      fixedHeader,
      tagsView,
      sidebarLogo,
      themeChange
    }
  }
})
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
