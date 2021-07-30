<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2020-10-19 10:28:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-22 17:51:25
-->
<template>
  <component
    :is="type"
    v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props, cxt) {
    const _isExternal = computed(() => isExternal(props.to))
    const type = computed(() => {
      if (_isExternal.value) {
        return 'a'
      }
      return 'router-link'
    })

    /* methods */
    const linkProps = (to) => {
      try {
        if (_isExternal.value) {
          return {
            href: to,
            target: '_blank',
            rel: 'noopener'
          }
        }
        return {
          to: to
        }
      } catch (e) {
        console.log(e)
      }
    }
    return { type, linkProps }
  }
})
</script>
