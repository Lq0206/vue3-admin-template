<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2020-10-19 16:54:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-26 17:42:36
-->
<script>
import { reactive, ref } from 'vue'
export default {
  props: {
    color: {
      type: String,
      default: '#909399'
    }
  },
  setup() {
    const state = reactive({
      copyright: ref('Copyright @ 2020')
    })
    return state
  },
  render() {
    return (
      <p class='copyright' style={{ 'color': this.color }}>{this.copyright}</p>
    )
  }
}
</script>
