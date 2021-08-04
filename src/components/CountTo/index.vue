<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-07-23 11:48:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-03 15:42:14
-->
<template>
  <div>
    <slot name="left"></slot>
    <span
      ref="number"
      :id="countId"
      :class="classList"
    ></span>
    <slot name="right"></slot>
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue'
import { createHash } from '@/utils'
export default defineComponent({
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, cxt) {
    const classList = computed(() => props.className)
    const countId = computed(() => 'conut_id_' + createHash(8))

    return { classList, countId }
  }
})
</script>
