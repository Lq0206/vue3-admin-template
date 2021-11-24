<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-07-30 09:39:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-23 11:02:20
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
        <template v-slot:actions="{props}">
          <el-space>
            <el-button
              type="primary"
              plain
              icon="el-icon-edit"
              @click="handleEdit(props)"
            >编辑</el-button>
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
            >删除</el-button>
          </el-space>
        </template>
        <template #extra>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="handleAdd"
          >新建</el-button>
        </template>
      </ProTable>
    </el-card>
    <el-drawer
      :title="drawerIsEdit ? '编辑' : '新增'"
      v-model="drawer"
      direction="rtl"
      :before-close="handleClose"
      destroy-on-close
    >
      <div class="form-content">
        <el-form ref="form" :model="form" label-width="40px">
          <el-form-item v-if="drawerIsEdit" label="id" prop="id">
            <el-input v-model="form.id" readonly></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" placeholder="请填写名称"></el-input>
          </el-form-item>
          <el-form-item label="日期" prop="date">
            <el-input v-model="form.date" placeholder="请选择日期"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="form.address" placeholder="请填写地址"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script type="text/ecmascript-6">
import { defineComponent, onMounted, reactive,
  toRefs, getCurrentInstance, nextTick } from 'vue'
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
        { prop: 'address', alias: '地址' }
      ],
      drawer: false,
      drawerIsEdit: false,
      form: {
        id: '1',
        name: '2',
        date: '2',
        address: '3'
      }
    })
    const app = getCurrentInstance().appContext.config.globalProperties

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

    const handleEdit = (props) => {
      state.drawer = true
      state.drawerIsEdit = true
      console.log(props)
      nextTick(() => {
        // state.form = Object.assign({}, props)
        console.log(state.form)
      })
    }

    const handleAdd = () => {
      state.drawer = true
    }

    const handleClose = (done) => {
      app.$confirm('确认关闭？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确认'
      })
        .then(_ => {
          state.drawerIsEdit = false
          console.log(app)
          done()
        })
        .catch(_ => { })
    }

    return {
      ...toRefs(state),
      loadData,
      handleTableSearch,
      reLoadData,
      searchReset,
      handleEdit,
      handleClose,
      handleAdd
    }
  }
})

</script>
<style lang="scss">
.el-drawer__header {
  height: 48px;
  line-height: 48px;
  margin-bottom: 20px;
  > :first-child {
    padding: 0 20px;
  }
}
.form-content {
  padding: 0 20px;
}
</style>
