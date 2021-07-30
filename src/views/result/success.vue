<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-07-27 15:08:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-27 15:58:55
-->
<template>
  <div class="page-wrapper">
    <el-card>
      <el-result
        icon="success"
        title="提交成功"
        subTitle="您的退款申请已提交成功，工作人员将在48小时内对您提交的信息进行审核，请耐心等待。"
      >
        <template #extra>
          <el-space>
            <el-button type="primary">返回</el-button>
            <el-button>
              查看详情
            </el-button>
            <el-button>打印</el-button>
          </el-space>
        </template>
      </el-result>
      <div class="result-step-layout">
        <h4 class="step-title">商品退款</h4>
        <div class="subtitle">
          <span>ID: 235336</span>
          <span>用户：一位不知名的用户</span>
          <span>生效时间：2021-07-27 16:03:54</span>
        </div>
        <el-steps
          :active="1"
          finish-status="success"
        >
          <el-step title="提交退款申请" description="2021-07-27 17:22:13"></el-step>
          <el-step title="人工审核" description="人工客服审核中"></el-step>
          <el-step title="退款"></el-step>
        </el-steps>
      </div>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() { }
})

</script>
<style lang="scss" scoped>
.result-step-layout {
  margin: 0 40px 60px;
  padding: 20px 40px;
  background: #f6faff;
  .subtitle {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
  }
}
</style>
