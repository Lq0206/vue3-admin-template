<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2020-10-19 14:25:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-02 10:58:23
-->
<script>
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const { params, query } = useRoute()
    const { path } = params
    useRouter().replace({ path: '/' + path, query }).catch((err) => {
      console.warn(err)
    })
  },
  // eslint-disable-next-line vue/require-render-return
  render() {
    // Avoid warning for missing template
  }
})
</script>
