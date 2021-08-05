<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-07-30 09:39:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-05 17:27:37
-->
<template>
  <div class="page-wrapper">
    <el-card>
      <ProTable
        :tableData="tableData"
        :columns="columns"
        :reload="reLoadData"
        :columns-config="{
          align: 'center'
        }"
        pagination
        @search="handleTableSearch"
        @searchReset="searchReset"
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
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import ProTable from '@/components/ProTable'
import { initTableData } from '@/mock/mock'
import { postReq } from '@/api'
export default defineComponent({
  components: { ProTable },
  setup() {
    const state = reactive({
      tableData: [],
      columns: [
        { prop: 'id', width: '100px' },
        { prop: 'name', alias: '名称', width: '150px' },
        { prop: 'date', alias: '日期', width: '150px' },
        { prop: 'address', alias: '地址' }]
    })

    onMounted(async() => {
      state.tableData = await initTableData()
      // loadData()
    })

    const searchReset = async() => {
      state.tableData = await initTableData()
    }

    const loadData = async() => {
      console.log('loadData')
    }

    const reLoadData = () => {
      loadData()
    }

    const handleTableSearch = (params) => {
      postReq('/pro-table/data', params).then(res => {
        state.tableData = res.data
      })
    }

    return {
      ...toRefs(state),
      loadData,
      handleTableSearch,
      reLoadData,
      searchReset
    }
  }
})

</script>
<style lang="less" scoped>
</style>
