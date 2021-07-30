<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-07-30 10:02:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-30 17:35:19
-->
<template>
  <div class="pro-table">
    <div
      v-if="searchBar"
      class="pro-table__search-bar"
    >searchBar</div>
    <div class="pro-table__content">
      <div class="pro-table__header clearfix">
        <h4 class="pro-table__header-title fl">{{ title }}</h4>
        <div class="pro-table__options fr">
          <el-space>
            <slot name="extra"></slot>
            <a class="ops-item-icon">
              <i class="el-icon-refresh-right"></i>
            </a>
            <a class="ops-item-icon">
              <el-dropdown @command="handleSizeChange">
                <span class="el-dropdown-link">
                  <i class="el-icon-c-scale-to-original"></i>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="(item, i) in tableSize"
                      :key="i"
                      :command="item.value"
                      :disabled="item.value === curSize"
                    >{{ item.label }}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </a>
            <a class="ops-item-icon">
              <el-popover
                placement="bottom-end"
                :width="200"
                trigger="hover"
              >
                <template #reference>
                  <i class="el-icon-setting"></i>
                </template>
                <div class="field-select-layout">
                  <ul>
                    <li class="field-item all-select">
                      <el-checkbox
                        :indeterminate="isIndeterminate"
                        v-model="checkAll"
                        @change="handleCheckAllChange"
                      >显示字段</el-checkbox>
                      <a @click="resetConfig">重置</a>
                    </li>
                    <el-checkbox-group
                      v-model="checkList"
                      @change="handleCheckedFieldChange"
                    >
                      <li
                        class="field-item"
                        v-for="(check, i) in columns"
                        :key="`check_${i}`"
                      >
                        <el-checkbox :label="check.prop">{{ check.alias }}</el-checkbox>
                      </li>
                    </el-checkbox-group>
                  </ul>
                </div>
              </el-popover>
            </a>
          </el-space>
        </div>
      </div>
      <div class="pro-table__body">
        <el-table
          :data="tableData"
          :size="curSize"
          v-loading="tableLoading"
        >
          <template
            v-for="(column, i) in cloneColumns"
            :key="`column_${i}`"
          >
            <el-table-column
              v-if="column.show !== false"
              :prop="column.prop"
              :label="column.alias"
            ></el-table-column>
          </template>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { defineComponent, toRefs, reactive } from 'vue'
import _ from 'lodash'
export default defineComponent({
  props: {
    /* searchBar */
    searchBar: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: 'Table Name'
    },
    columns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const state = reactive({
      tableSize: [{ label: 'medium', value: 'medium' }, { label: 'small', value: 'small' }, { label: 'mini', value: 'mini' }],
      curSize: 'medium',
      checkAll: true,
      isIndeterminate: true,
      allList: props.columns.map(v => v.prop),
      checkList: props.columns.map(v => v.prop) || [], // 字段选择
      cloneColumns: _.cloneDeep(props.columns.map(v => {
        v.show = true
        return v
      })),
      tableLoading: false
    })

    /* plan A */
    // const columnList = computed(() => {
    //   const arr = []
    //   let nCheckList = state.checkList
    //   nCheckList = nCheckList.sort((a, b) => {
    //     return state.allList.indexOf(a) - state.allList.indexOf(b)
    //   })
    //   nCheckList.forEach(i => {
    //     props.columns.forEach(j => {
    //       if (i === j.prop) arr.push(j)
    //     })
    //   })
    //   return arr
    // })

    const handleCheckedFieldChange = (params) => {
      state.tableLoading = true
      state.cloneColumns.forEach(j => {
        j.show = state.checkList.includes(j.prop)
      })
      const checkedCount = params.length
      state.checkAll = checkedCount === state.allList.length
      state.isIndeterminate = checkedCount > 0 && checkedCount < state.allList.length
      setTimeout(() => {
        state.tableLoading = false
      }, 200)
    }

    const handleCheckAllChange = (value) => {
      state.tableLoading = true
      state.checkList = value ? state.allList : []
      state.isIndeterminate = false
      setTimeout(() => {
        state.tableLoading = false
      }, 200)
    }

    const resetConfig = (params) => {

    }

    /* table size set */
    const handleSizeChange = (size) => {
      state.curSize = size
    }

    return { ...toRefs(state), resetConfig, handleSizeChange, handleCheckedFieldChange, handleCheckAllChange }
  }
})

</script>
<style lang="scss" scoped>
@import "~@/styles/element-variables.scss";
.pro-table {
  &__search-bar {
    padding-bottom: 20px;
    border-bottom: 1px solid #f5f5f5;
  }
  &__content {
    .pro-table__header {
      padding: 16px 0;
    }
    &__body {
    }
  }
}

.field-select-layout {
  .field-item {
    padding: 4px 0;
    // cursor: pointer;
    &:hover {
      background: #f5f5f5;
    }
    &.all-select {
      display: flex;
      justify-content: space-between;
      &:hover {
        background: none;
      }
      a:hover {
        color: $--color-primary;
      }
    }
  }
}
</style>
