<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-07-26 18:14:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-27 15:11:47
-->
<template>
  <div class="page-wrapper">
    <el-card>
      <el-descriptions
        title="用户信息"
        style="margin-bottom: 40px"
      >
        <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
        <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
        <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-tag size="small">学校</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
      </el-descriptions>
      <el-descriptions
        class="margin-top"
        title="带边框列表"
        :column="3"
        border
      >
        <template #extra>
          <el-button size="small">操作</el-button>
        </template>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-user"></i>
            用户名
          </template>
          kooriookami
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-mobile-phone"></i>
            手机号
          </template>
          18100000000
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-location-outline"></i>
            居住地
          </template>
          苏州市
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-tickets"></i>
            备注
          </template>
          <el-tag size="small">学校</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-office-building"></i>
            联系地址
          </template>
          江苏省苏州市吴中区吴中大道 1188 号
        </el-descriptions-item>
      </el-descriptions>
      <!-- <el-table>
        <el-table-column label="商品编号"></el-table-column>
        <el-table-column label="商品名称"></el-table-column>
        <el-table-column label="商品条码"></el-table-column>
        <el-table-column label="订单编号"></el-table-column>
        <el-table-column label="下单时间"></el-table-column>
        <el-table-column label="单价"></el-table-column>
        <el-table-column label="数量"></el-table-column>
        <el-table-column label="金额"></el-table-column>
      </el-table> -->
      <div style="margin-top: 40px">
        <h4>商品列表</h4>
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column type="expand">
            <template #default="props">
              <el-form
                label-position="left"
                inline
                class="demo-table-expand"
              >
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="所属店铺">
                  <span>{{ props.row.shop }}</span>
                </el-form-item>
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="店铺 ID">
                  <span>{{ props.row.shopId }}</span>
                </el-form-item>
                <el-form-item label="商品分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="店铺地址">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="商品 ID"
            prop="id"
          >
          </el-table-column>
          <el-table-column
            label="商品名称"
            prop="name"
          >
          </el-table-column>
          <el-table-column
            label="描述"
            prop="desc"
          >
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
export default defineComponent({
  setup() {
    const state = reactive({
      tableData: []
    })
    onMounted(() => {
      for (let i = 0; i < 8; i++) {
        state.tableData.push({
          id: '1298712' + i,
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        })
      }
    })

    return { ...toRefs(state) }
  }
})

</script>
<style lang="scss">
.demo-table-expand {
  .el-form-item {
    margin-right: 0px;
    margin-bottom: 0px;
    width: 50%;
  }
  label {
    width: 90px;
    color: rgb(153, 169, 191);
  }
}
</style>
