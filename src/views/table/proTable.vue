<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-07-30 09:39:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-30 15:00:58
-->
<template>
  <div class="page-wrapper">
    <el-card>
      <ProTable
        :tableData="tableData"
        :columns="columns"
      ></ProTable>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import { defineComponent, reactive, toRefs } from 'vue'
import ProTable from '@/components/ProTable'
export default defineComponent({
  components: { ProTable },
  setup() {
    const state = reactive({
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      columns: [{ prop: 'date', alias: '日期' }, { prop: 'name', alias: '名称' }, { prop: 'address', alias: '地址' }]
    })

    return { ...toRefs(state) }
  }
})

</script>
<style lang="less" scoped>
</style>
