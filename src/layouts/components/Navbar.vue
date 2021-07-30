<template>
  <div class="navbar">
    <hamburger
id="hamburger-container"
               :is-active="sidebar.opened"
               class="hamburger-container"
               @toggleClick="toggleSideBar" />
    <breadcrumb
id="breadcrumb-container"
                class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <NavBarMessage></NavBarMessage>
        <el-tooltip
                    content="全屏"
                    effect="dark"
                    placement="bottom">
          <screenfull class="right-menu-item hover-effect" />
        </el-tooltip>
        <el-tooltip
                    content="全局尺寸"
                    effect="dark"
                    placement="bottom">
          <size-select class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>
      <el-dropdown class="avatar-container">
        <span class="el-dropdown-link">
          <div class="avatar-wrapper">
            <img
src="@/assets/avatar.png"
                 class="user-avatar"
alt="用户头像">
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="setting">
              <span>个人设置</span>
            </el-dropdown-item>
            <el-dropdown-item @click="logout">
              <span style="display:block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import NavBarMessage from '@/components/NavBarMessage'
// import Search from '@/components/HeaderSearch'

import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    Breadcrumb,
    Hamburger,
    // ErrorLog,
    Screenfull,
    SizeSelect,
    NavBarMessage
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const sidebar = computed(() => store.getters.sidebar)
    const avatar = computed(() => store.getters.avatar)
    const device = computed(() => store.getters.device)

    const toggleSideBar = () => {
      store.dispatch('toggleSideBar')
    }

    const logout = async() => {
      await store.dispatch('LoginOut')
      router.push(`/login`)
    }

    const setting = async() => {
      router.push('/setting')
    }
    return { sidebar, avatar, device, toggleSideBar, logout, setting }
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    padding: 0 20px;
    line-height: 50px;
    display: flex;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        margin-left: 12px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .navbar-icon {
    font-size: 24px;
  }
}

</style>
