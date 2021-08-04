<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-07-23 16:54:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-04 17:55:37
-->
<template>
  <div class="app-main-wrap">
    <el-card shadow="never">
      <el-tabs v-model="activeName" :tab-position="device === 'desktop' ? 'left' : 'top'" @tab-click="handleClick">
        <el-tab-pane label="基本设置">
          <p class="setting-title">基本设置</p>
          <div class="setting-layout flex-layout">
            <div class="setting-left">
              <el-form
                :model="form"
                label-width="80px"
              >
                <el-form-item
                  label="昵称"
                  label-width="80px"
                >
                  <el-input
                    v-model="form.email"
                    placeholder=""
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="邮箱"
                  label-width="80px"
                >
                  <el-input
                    v-model="form.nikename"
                    placeholder=""
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="个人简介"
                  label-width="80px"
                >
                  <el-input
                    type="textarea"
                    :autosize="{
                      minRows: 2,
                      maxRows: 4 }"
                    v-model="form.introduction"
                    placeholder=""
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="地区"
                  label-width="80px"
                >
                  <el-select
                    v-model="form.country"
                    placeholder=""
                  >
                    <el-option
                      label="中国"
                      value="china"
                    >中国</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="所在省市"
                  label-width="80px"
                >
                  <el-select
                    v-model="form.city"
                    placeholder=""
                  ></el-select>
                </el-form-item>
                <el-form-item
                  label="详细地址"
                  label-width="80px"
                >
                  <el-select
                    v-model="form.address"
                    placeholder=""
                  ></el-select>
                </el-form-item>
                <el-form-item
                  label="详细地址"
                  label-width="80px"
                >
                  <el-input
                    type="textarea"
                    :autosize="{
                      minRows: 2,
                      maxRows: 4 }"
                    v-model="form.address"
                    placeholder=""
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="联系电话"
                  label-width="80px"
                >
                  <el-space>
                    <el-input
                      v-model="form.areaCode"
                      style="width: 100px"
                      placeholder=""
                    ></el-input>
                    <el-input
                      v-model="form.phone"
                      class="phone"
                      placeholder=""
                    ></el-input>
                  </el-space>
                </el-form-item>
                <el-form-item
                  label=""
                  label-width="80px"
                >
                  <el-button type="primary">保存</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="setting-right">
              <div class="avatar-wrap">
                <div class="avatar">
                  <img
                    src="../../assets/avatar.png"
                    alt=""
                  >
                </div>
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                >
                  <el-button
                    size="small"
                    icon="el-icon-upload2"
                    type="primary"
                    plain
                  >点击上传</el-button>
                </el-upload>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="安全设置">
          <div class="setting-layout">
            <p class="setting-title">安全设置</p>
            <div class="setting-layout">
              <ul class="setting-list">
                <li
                  v-for="(item, i) in securityList"
                  :key="i"
                  class="list-item"
                >
                  <div class="left">
                    <p class="title">{{ item.title }}</p>
                    <p class="des">{{ item.des }}</p>
                  </div>
                  <div class="right">
                    <el-button type="text" @click="handleSetting">{{ item.status > 0 ? '修改' : '设置' }}</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="配置管理">
          <div class="setting-layout">
            <p class="setting-title">配置管理</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="角色管理">
          <div class="setting-layout">
            <p class="setting-title">角色管理</p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import { defineComponent, reactive, toRefs, getCurrentInstance, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Srtting',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      form: {
        email: '',
        nikeName: '',
        introduction: '',
        country: '',
        city: '',
        address: ''
      },
      activeName: route.query.key || '0',
      securityList: [
        { title: '账户密码', des: '当前密码强度：强', status: 1 },
        { title: '密保手机', des: '已绑定手机：138****8293', status: 1 },
        { title: '密保问题', des: '未设置密保问题，密保问题可有效保护账户安全', status: 0 },
        { title: '备用邮箱', des: '已绑定邮箱：abc***gmail.com', status: 1 }
      ]
    })
    const device = computed(() => store.getters.device)
    const app = getCurrentInstance()?.appContext.config.globalProperties
    const handleClick = (tab, event) => {
      router.replace({ query: { key: tab.index }})
    }

    const handleSetting = () => {
      app.$message({
        type: 'success',
        message: '开发中...'
      })
    }

    return { ...toRefs(state), handleSetting, handleClick, device }
  }
})

</script>
<style lang="scss" scoped>
.setting-title {
  font-size: 20px;
  margin: 8px 0 30px 20px;
}
.setting-layout {
  padding-left: 20px;
  &.flex-layout {
    display: flex;
  }
  .setting-left {
    max-width: 600px;
    min-width: 400px;
  }
  .setting-right {
    flex: 1 1;
    padding-left: 100px;
    .avatar-wrap {
      text-align: center;
      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid transparent;
        overflow: hidden;
        margin: 0 auto 20px;
        &:hover {
          border-color: #1890ff;
        }
        img {
          display: block;
          width: 100%;
          height: 100%;
          border: 0;
        }
      }
    }
  }
  .setting-list {
    .list-item {
      display: flex;
      border-bottom: 1px solid #f5f5f5;
      padding-top: 20px;
      &:first-child {
        padding-top: 0;
      }
      .left {
        flex: 1;
        .title {
          font-size: 16px;
          margin-bottom: 16px;
          color: #606266;
        }
        .des {
          font-size: 16px;
          margin-bottom: 20px;
          color: #c0c4cc;
        }
      }
    }
  }
}
@media screen and (max-width: 1440px) {
  .setting-layout {
    flex-direction: column-reverse;
    .setting-right {
      margin-bottom: 40px;
      padding: 0;
    }
  }
}
</style>
