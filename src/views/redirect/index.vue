<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2020-10-19 14:25:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-22 17:13:20
-->
<script>
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  created() {
    const { params, query } = useRoute()
    const { path } = params
    useRouter().replace({ path: '/' + path, query }).catch((err) => {
      console.warn(err)
    })
  }
})
</script>
