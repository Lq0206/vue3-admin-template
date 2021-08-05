<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-08-03 09:36:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-05 16:53:41
-->
<template>
  <div
    v-if="searchBar"
    class="pro-table__search-bar"
  >
    <el-form label-width="80px" :model="form">
      <el-row>
        <template
          v-for="(item, i) in cloneColumns"
          :key="i"
        >
          <el-col v-show="item.show" :span="8">
            <el-form-item
              label-width="80px"
              :label="item.alias || item.prop"
            >
              <el-input v-model="form[item.prop]"></el-input>
            </el-form-item>
          </el-col>
        </template>
        <el-col :span="8">
          <el-form-item
            label=""
            label-width="80px"
          >
            <el-space>
              <el-button
                type="primary"
                icon="el-icon-search"
                :loading="loading"
                size="small"
                plain
                @click="handleSearch"
              >查询</el-button>
              <el-button
                icon="el-icon-refresh"
                size="small"
                @click="reset"
              >重置</el-button>
              <el-button
                type="text"
                size="small"
                @click="toggleOpen"
              >{{ opened ? '收起' : '展开' }}
                <i :class="`open-btn el-icon-arrow-down ${opened ? 'opened': ''}`"></i>
              </el-button>
            </el-space>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import { defineComponent, inject, toRefs, reactive } from 'vue'
import _ from 'lodash'
export default defineComponent({
  setup(props, ctx) {
    const searchBar = inject('searchBar')

    const state = reactive({
      opened: false,
      cloneColumns: _.cloneDeep(inject('columns')),
      form: _.cloneDeep(inject('columns')).reduce((t, c) => {
        t[c.prop] = ''
        return t
      }, {}),
      loading: false
    })

    const intHide = () => {
      for (let i = 0; i < state.cloneColumns.length; i++) {
        state.cloneColumns[i].show = i < 2
      }
    }
    intHide()

    const toggleOpen = () => {
      state.opened = !state.opened
      if (state.opened) {
        state.cloneColumns.map(v => {
          v.show = true
          return v
        })
      } else {
        intHide()
      }
    }

    const handleSearch = () => {
      ctx.emit('search', state.form)
    }

    const reset = () => {
      Object.keys(state.form).forEach(key => (state.form[key] = ''))
      ctx.emit('reset')
    }

    return {
      ...toRefs(state),
      searchBar,
      toggleOpen,
      handleSearch,
      reset
    }
  },
  emits: ['search', 'reset']
})

</script>
<style lang="scss" scoped>
.pro-table__search-bar {
  .open-btn {
    transition: all 0.28s ease;
  }
  .open-btn.opened {
    transform: rotate(180deg);
  }
}
</style>
