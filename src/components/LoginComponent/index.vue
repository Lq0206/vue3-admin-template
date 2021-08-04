<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2020-10-19 15:06:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-03 15:42:28
-->
<template>
  <div class="login-form">
    <h2 class="logo">LOGO<span class="logo-txt">用戶登录</span></h2>
    <el-form
      ref="loginForm"
      label-width="0"
      :model="form"
      @submit.prevent="submit"
    >
      <el-form-item label-width="0">
        <el-input
          v-model="form.username"
          prefix-icon="el-icon-user"
          placeholder="账号: admin"
        />
      </el-form-item>
      <el-form-item label-width="0">
        <el-input
          v-model="form.password"
          prefix-icon="el-icon-lock"
          type="password"
          placeholder="密码: 123456"
          show-password
        />
      </el-form-item>
      <el-form-item label-width="0">
        <el-space>
          <el-input
            v-model="form.verifyCode"
            prefix-icon="el-icon-key"
            placeholder="验证码"
          />
          <a class="verify-code">
            <img
              src="../../assets/404.png"
              alt=""
            >
          </a>
        </el-space>
      </el-form-item>
      <el-form-item label-width="0">
        <el-button
          :loading="btnLoading"
          native-type="submit"
          type="primary"
          block
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
// import mixins from '@/utils/mixins/FormMixins'
import { defineComponent, reactive, toRefs, watch, getCurrentInstance, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { greet } from '@/utils'
export default defineComponent(
  {
    name: 'LoginComponent',
    setup() {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()
      const loginForm = ref(null)
      const app = getCurrentInstance()
      const state = reactive({
        form: {
          username: 'admin',
          password: '123456',
          verifyCode: '1234'
        },
        otherQuery: {},
        redirect: '/',
        btnLoading: false
      })

      watch(
        () => route,
        (route) => {
          const query = route.query
          if (query) {
            state.redirect = query.redirect
            state.otherQuery = getOtherQuery(query)
          }
        }
      )

      const submit = () => {
        loginForm.value.validate(valid => {
          if (valid) {
            const instance = app.appContext.config.globalProperties
            state.btnLoading = true
            const { username, password } = state.form
            if (!username || !password) {
              instance.$message({
                message: '请输入账号或密码',
                type: 'error'
              })
            } else {
              store.dispatch('Login', state.form).then(res => {
                /* 需要定向操作 */
                res && router.push('/dashboard').catch((err) => {
                  console.log(err)
                })
                setTimeout(() => {
                  instance.$notify.success({
                    message: `${greet()}，欢迎回来！`
                  })
                }, 1000)
              })
                .catch(err => {
                  state.btnLoading = false
                  console.log('登录失败', err)
                })
            }
            state.btnLoading = false
          }
        })
      }
      const getOtherQuery = (query) => {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      }

      return { ...toRefs(state), store, loginForm, submit, getOtherQuery }
    },
    emits: ['submit'],
    components: {}
  })

</script>
<style lang="scss" scoped>
</style>
