<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-07-23 14:41:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-16 15:13:54
-->
<template>
  <div :class="['custom-card', customClass]">
    <slot name="header">
      <span>{{ title }}</span>
    </slot>
    <slot></slot>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    customClass: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props, cxt) {
    return { props }
  }
})
</script>
<style lang="scss" scoped>
.custom-card {
  position: relative;
  background: #fff;
  margin-bottom: 24px;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  &:hover {
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    transition: all 0.28s linear;
  }
}
</style>
