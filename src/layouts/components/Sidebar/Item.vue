<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2020-10-19 10:28:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-23 17:25:07
-->
<template>
  <i v-if="props.icon" :class="props.icon"></i>
  <span v-if="props.title" class="menu-item-text">
    {{ title }}
  </span>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props, cxt) {
    return { props }
  }
})
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
.menu-item-text {
  margin-left: 8px;
}
</style>
