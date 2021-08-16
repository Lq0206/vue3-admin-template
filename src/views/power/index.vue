<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-07-15 16:30:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-16 11:34:30
-->
<template>
  <el-card header="权限控制">
    <p style="margin-bottom: 20px">您当前的角色：{{ value ? ['admin'] : ['visitor'] }}</p>
    <el-switch
      v-model="value"
      active-text="['admin']"
      inactive-text="['visitor']"
      @change="handleChange"
    ></el-switch>
  </el-card>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import ls from '@/utils/local-ls'

export default defineComponent({
  setup() {
    const store = useStore()
    const state = reactive({
      value: ls.get('TOKEN') === 'admin-token'
    })
    const handleChange = async(value) => {
      store.dispatch('RolesChange', value ? ['admin'] : ['visitor'])
    }

    return {
      ...toRefs(state),
      handleChange
    }
  }
})
</script>
