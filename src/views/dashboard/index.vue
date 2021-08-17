<!--
 * @Descripttion: 系统内页首页
 * @version:
 * @Author: Lqi
 * @Date: 2021-04-07 09:51:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-17 11:14:09
-->
<template>
  <div class="app-main-wrap">
    <TopLayout></TopLayout>
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
import { defineComponent, onMounted, onBeforeUnmount, watch } from 'vue'
import CusCard from '@/components/CusCard'
import * as echarts from 'echarts'
import { useStore } from 'vuex'
import TopLayout from './components/top.vue'
export default defineComponent({
  name: 'Dashboard',
  components: { CusCard, TopLayout },
  setup() {
    let pvuvChart = null
    const store = useStore()
    onMounted(() => {
      initPVUV()
      window.addEventListener('resize', () => {
        pvuvChart.resize()
      })
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', pvuvChart.resize())
    })

    watch(() => store.getters.sidebar.opened, () => {
      pvuvChart.resize()
    })

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

    return { }
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
    margin-bottom: 10px;
    span {
      font-size: 14px;
      line-height: 22px;
      height: 22px;
      color: rgba(0, 0, 0, 0.45);
    }
  }
  > .body {
    // display: flex;
    // justify-content: space-between;
    // padding: 10px;
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
      margin-bottom: 30px;
    }
    .money {
      z-index: 1;
      color: rgba(0, 0, 0, 0.85);
      .CNY {
        bottom: 0;
      }
      .num {
        font-size: 30px;
        height: 38px;
        line-height: 38px;
        white-space: nowrap;
        transition: all 0.28s ease;
      }
    }
    .order {
      height: 26px;
      span {
        font-size: 14px;
        height: 22px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.85);
        white-space: nowrap;
      }
      // margin: 20px 0 30px;
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
.box-padding {
  padding-bottom: 0;
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
  // position: absolute;
  // left: 0;
  // right: 0;
  // bottom: 0;
  width: 100%;
  height: 70px;
  z-index: 0;
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
    }
  }
}
</style>
