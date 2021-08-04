<!--
 * @Descripttion: 系统内页首页
 * @version:
 * @Author: Lqi
 * @Date: 2021-04-07 09:51:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-02 09:27:42
-->
<template>
  <div class="app-main-wrap">
    <el-row :gutter="24">
      <el-col
        :span="6"
        :xs="12"
      >
        <CusCard customClass="green-gradient">
          <template #header>
            <div class="header">
              <span>店铺数据</span>
              <a class="ops">
                <i class="el-icon-more"></i>
              </a>
            </div>
          </template>
          <div class="body">
            <i class="el-icon-eleme card-icon hidden-md-and-down"></i>
            <div class="money">
              <div>
                <span class="CNY">￥</span><span class="num">7,985,255</span>
              </div>
              <div class="order">共 26954 笔订单</div>
            </div>
          </div>
        </CusCard>
      </el-col>
      <el-col
        :span="6"
        :xs="12"
      >
        <CusCard customClass="red-gradient">
          <template #header>
            <div class="header">
              <span>店铺数据</span>
              <a class="ops">
                <i class="el-icon-more"></i>
              </a>
            </div>
            <div class="body">
              <i class="el-icon-star-on card-icon hidden-md-and-down"></i>
              <div class="money">
                <div>
                  <span class="CNY">￥</span><span class="num">85,298</span>
                </div>
                <div class="order">共 3546 笔订单</div>
              </div>
            </div>
          </template>
        </CusCard>
      </el-col>
      <el-col
        :span="6"
        :xs="12"
      >
        <CusCard customClass="orange-gradient">
          <template #header>
            <div class="header">
              <span>销售总额</span>
              <a class="ops">
                <i class="el-icon-more"></i>
              </a>
            </div>
          </template>
          <div class="body">
            <div class="flex-column">
              <div class="money">
                <span class="CNY">￥</span>
                <span class="num">7,229,822</span>
              </div>
              <div class="up-and-down">
                <i class="el-icon-top-right"></i>
                <span>2.63%</span>
              </div>
            </div>
          </div>
        </CusCard>
      </el-col>
      <el-col
        :span="6"
        :xs="12"
      >
        <CusCard customClass="blue-gradient">
          <template #header>
            <div class="header">
              <span>昨日新增用户</span>
              <a class="ops">
                <i class="el-icon-more"></i>
              </a>
            </div>
          </template>
          <div class="body">
            <div class="flex-column">
              <div class="money">
                <span class="num">14,822</span>
              </div>
              <div class="up-and-down">
                <i class="el-icon-top-right"></i>
                <span>2.63%</span>
              </div>
            </div>
            <div
              id="users"
              class="chart-wrap hidden-md-and-down"
            ></div>
          </div>
        </CusCard>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        :span="18"
        :lg="18"
        :md="24"
        :sm="24"
        :xs="24"
      >
        <CusCard>
          <template #header>
            <div
              class="header"
              style="color: #333"
            >
              <span>24小时用户趋势</span>
              <a class="ops">
                <i class="el-icon-more"></i>
              </a>
            </div>
          </template>
          <div
            id="pvuv"
            ref="pvuv"
            style="width: 100%; height: 400px"
          ></div>
        </CusCard>
      </el-col>
      <el-col
        :span="6"
        :lg="6"
        :md="24"
        :sm="24"
        :xs="24"
      >
        <CusCard>
          <template #header>
            <div
              class="header"
              style="color: #333"
            >
              <span>用户反馈</span>
              <a class="ops">
                <i class="el-icon-more"></i>
              </a>
            </div>
          </template>
          <ul class="feedback-list">
            <li>
              <p>用户觉得这次更新特别赞</p>
              <p class="feedback-info"><span>用户123</span><span>2021-04-07 13:15:45</span></p>
            </li>
            <li>
              <p>用户觉得这次更新特别赞</p>
              <p class="feedback-info"><span>用户123</span><span>2021-04-07 13:15:45</span></p>
            </li>
            <li>
              <p>用户觉得这次更新特别赞</p>
              <p class="feedback-info"><span>用户123</span><span>2021-04-07 13:15:45</span></p>
            </li>
            <li>
              <p>用户觉得这次更新特别赞</p>
              <p class="feedback-info"><span>用户123</span><span>2021-04-07 13:15:45</span></p>
            </li>
            <li>
              <p>用户觉得这次更新特别赞</p>
              <p class="feedback-info"><span>用户123</span><span>2021-04-07 13:15:45</span></p>
            </li>
            <li>
              <p>用户觉得这次更新特别赞</p>
              <p class="feedback-info"><span>用户123</span><span>2021-04-07 13:15:45</span></p>
            </li>
          </ul>
        </CusCard>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import { defineComponent, onMounted, onBeforeUnmount } from 'vue'
import CusCard from '@/components/CusCard'
import * as echarts from 'echarts'
export default defineComponent({
  name: 'Dashboard',
  components: { CusCard },
  setup() {
    let pvuvChart = null
    let userChart = null
    onMounted(() => {
      initUsers()
      initPVUV()
      window.addEventListener('resize', () => {
        pvuvChart.resize()
        userChart.resize()
      })
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', pvuvChart.resize())
      window.removeEventListener('resize', userChart.resize())
    })

    const initUsers = () => {
      userChart = echarts.init(document.getElementById('users'))
      userChart.setOption({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          x: 50,
          x2: 20
        },
        legend: {
          textStyle: {
            color: '#fff'
          }
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        }]
      })
    }

    const initPVUV = () => {
      pvuvChart = echarts.init(document.getElementById('pvuv'))
      pvuvChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['PV', 'UV']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['00:00', '01:00', '02:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
            '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'PV',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 40, 31, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 266, 284, 246, 352]
          },
          {
            name: 'UV',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 166, 122, 102, 90, 111, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 220, 235, 289, 236]
          }
        ]
      })
    }

    return { initUsers }
  }
})

</script>
<style lang="scss">
.custom-card {
  padding: 20px;
  border-radius: 4px;
  > .header {
    display: flex;
    justify-content: space-between;
    color: #fff;
    margin-bottom: 10px;
  }
  > .body {
    display: flex;
    justify-content: space-between;
    color: #fff;
    padding: 10px;
    .flex-column {
      display: flex;
      flex-direction: column;
    }
    .card-icon {
      font-size: 40px;
    }
    .up-and-down {
      display: block;
      white-space: nowrap;
      width: 100%;
    }
    .money {
      .CNY {
        bottom: 0;
      }
      .num {
        font-size: 40px;
        white-space: nowrap;
        transition: all 0.28s ease;
      }
    }
    .order {
      text-align: right;
      white-space: nowrap;
    }
  }
  > .ops {
    display: block;
  }
  .feedback-list {
    // margin-top: 36px;
    li {
      padding: 10px 0;
      color: #606266;
      border-bottom: 1px solid #f5f5f5;
      .feedback-info {
        display: flex;
        margin-top: 14px;
        flex-flow: row nowrap;
        justify-content: space-between;
        color: #c0c4cc;
        text-align: left;
        font-size: 12px;
      }
    }
  }
}
.red-gradient {
  background: linear-gradient(#ffab91, #ff7043) !important;
}
.green-gradient {
  background: linear-gradient(#69f0ae, #00c853) !important;
}
.blue-gradient {
  background: linear-gradient(#90caf9, #00b0ff) !important;
}
.orange-gradient {
  background: linear-gradient(#ffcc80, #ffa726) !important;
}
.chart-wrap {
  width: 200px;
}

@media screen and (max-width: 992px) {
  .custom-card {
    .body {
      flex-direction: row;
      justify-content: center;
      flex: 1;
      .money {
        .num {
          font-size: 30px;
        }
      }
      .order,
      .up-and-down {
        text-align: center;
      }
    }
  }
}
</style>
