<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-07-30 09:45:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-03 15:23:00
-->
<template>
  <div class="page-wrapper">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>标准table列表</span>
          <div class="right-btn">
            <el-radio-group
              v-model="radio"
              size="small"
            >
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button
                label="进行中"
              ></el-radio-button>
              <el-radio-button label="等待中"></el-radio-button>
              <el-radio-button label="完成"></el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </template>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column
          prop="taskId"
          label="taskId"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="负责人"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="开始时间"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="progress"
          label="进度"
        >
        <template #default="scope">
          <el-progress :percentage="scope.row.progress" :color="customColors"></el-progress>
        </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template #default="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              size="small"
            >查看</el-button>
            <el-button
              type="text"
              size="small"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import { defineComponent, toRefs, reactive } from 'vue'
import dayjs from 'dayjs'
export default defineComponent({
  setup() {
    const startDate = dayjs()
      .startOf('month')
      .toDate()
    const endDate = new Date()
    const state = reactive({
      tableData: [],
      radio: '全部',
      percentage: 0,
      customColors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ]
    })

    const randomDate = (startDate, endDate) => {
      const date = new Date(+startDate + Math.random() * (endDate - startDate))
      const hour = 0 + Math.random() * (23 - 0) | 0
      const minute = 0 + Math.random() * (59 - 0) | 0
      const second = 0 + Math.random() * (59 - 0) | 0
      date.setHours(hour)
      date.setMinutes(minute)
      date.setSeconds(second)
      return date
    }

    for (let i = 0; i < 10; i++) {
      state.tableData.push({
        taskId: `task_${i + 1}`,
        title: '任务',
        date: dayjs(randomDate(startDate, endDate)).format('YYYY-MM-DD HH:mm:ss'),
        name: '王小虎',
        progress: Math.floor(Math.random() * (100 - 0)) + 0
      })
    }

    const handleClick = (row) => {
      console.log(row)
    }

    return { ...toRefs(state), handleClick }
  }
})

</script>
<style lang="scss" scoped>
.page-wrapper {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
