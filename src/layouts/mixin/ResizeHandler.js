/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-04-16 18:03:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-30 10:45:33
 */
import { useStore } from 'vuex'
import { watch, onBeforeMount, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const { body } = document
const WIDTH = 1024
const RATIO = 3

export default function() {
  const route = useRoute()
  const store = useStore()
  const device = computed(() => store.getters.device)
  const sidebar = computed(() => store.getters.sidebar)
  watch(() => route.path, () => {
    if (device.value === 'mobile' && sidebar.value.opened) {
      store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  })

  onBeforeMount(() => {
    window.addEventListener('resize', resizeHandler)
  })
  onMounted(() => {
    const isMobile = isMobileValid()
    if (isMobile) {
      store.dispatch('toggleDevice', 'mobile')
      store.dispatch('closeSideBar', { withoutAnimation: true })
    }
  })
  /* methods */
  const isMobileValid = () => {
    const rect = body.getBoundingClientRect()
    return rect.width - RATIO < WIDTH
  }
  const resizeHandler = () => {
    if (!document.hidden) {
      const isMobile = isMobileValid()
      store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop')

      if (isMobile) {
        store.dispatch('closeSideBar', { withoutAnimation: true })
      }
    }
  }
  return { isMobileValid, resizeHandler }
}
