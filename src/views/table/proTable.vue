<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-07-30 09:39:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-03 11:42:39
-->
<template>
  <div class="page-wrapper">
    <el-card>
      <ProTable
        :tableData="tableData"
        :columns="columns"
        :reload="loadData"
        :columns-config="{
          align: 'center'
        }"
        pagination
        @search="handleTableSearch"
      >
        <template #actions>
          <el-space>
            <el-button
              type="primary"
              plain
              icon="el-icon-edit"
            >编辑</el-button>
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
            >删除</el-button>
          </el-space>
        </template>
      </ProTable>
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
      tableData: [],
      columns: [{ prop: 'id', width: '100px' }, { prop: 'date', alias: '日期', width: '150px' },
        { prop: 'name', alias: '名称', width: '150px' }, { prop: 'address', alias: '地址' }]
    })

    const loadData = () => {
      for (let i = 0; i < 20; i++) {
        state.tableData.push({
          id: `id_${i + 1}`,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        })
      }
    }
    loadData()

    const handleTableSearch = (params) => {
      console.log(params)
    }

    return {
      ...toRefs(state),
      loadData,
      handleTableSearch
    }
  }
})

</script>
<style lang="less" scoped>
</style>
