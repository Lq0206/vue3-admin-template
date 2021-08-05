<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-07-30 10:02:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-05 17:26:52
-->
<template>
  <div class="pro-table">
    <SearchBar ref="SearchBarRef" @search="searchChange" @reset="searchReset"></SearchBar>
    <div class="pro-table__content">
      <div class="pro-table__header clearfix">
        <h4 class="pro-table__header-title fl">{{ title }}</h4>
        <div class="pro-table__options fr">
          <el-space>
            <slot name="extra"></slot>
            <a
              class="ops-item-icon"
              @click="reLoadData"
            >
              <i class="el-icon-refresh-right"></i>
            </a>
            <a class="ops-item-icon">
              <el-dropdown @command="handleTableSizeChange">
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
                  <ul v-if="cloneColumns.length > 0">
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
                        v-for="(check, i) in cloneColumns"
                        :key="`check_${i}`"
                      >
                        <el-checkbox :label="check.prop">{{ check.alias || check.prop }}</el-checkbox>
                        <div class="sort-ops">
                          <a
                            title="固定左侧显示"
                            @click="handleFieldTop(check)"
                          ><i :class="`el-icon-top ${check.fixed ? 'active' : '' }`"></i></a>
                          <!-- <a @click="handleFieldTop(check, 'bottom')"><i :class="`el-icon-bottom ${check.fixed && check.fixed === 'right' ? 'active' : '' }`"></i></a> -->
                        </div>
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
          ref="proTable"
          v-if="checkList.length > 0"
          :data="cloneTableData.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize)"
          :size="curSize"
          row-key="id"
          v-loading="tableLoading"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <template
            v-for="(column, i) in cloneColumns"
            :key="`column_${i}`"
          >
            <el-table-column
              v-if="column.show !== false"
              :width="column.width"
              :prop="column.prop"
              :fixed="column.fixed"
              :align="columnsConfig.align"
              :label="column.alias || column.prop"
            ></el-table-column>
          </template>
          <el-table-column
            fixed="right"
            width="200px"
            label="操作"
            :size="curSize"
          >
            <div class="pro-table__actions">
              <slot name="actions">
              </slot>
            </div>
          </el-table-column>
        </el-table>
        <div
          v-else
          class="not-data"
        >
          <el-empty :image-size="200"></el-empty>
        </div>
        <div class="pro-table__pagination">
          <el-pagination
            :hide-on-single-page="cloneColumns.length > 0"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 20]"
            :current-page="page.currentPage"
            :total="cloneTableData.length"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="multiple-selection-wrapper">
      <el-space>
        <slot name="multiple-extra"></slot>
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="multipleDelete"
        >批量删除</el-button>
        <el-button
          type="primary"
          icon="el-icon-delete"
        >批量审批</el-button>
      </el-space>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { defineComponent, toRefs, reactive, nextTick, ref, provide, watch } from 'vue'
import SearchBar from './components/searchBar.vue'
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
    /* columns config */
    columnsConfig: {
      type: Object,
      default: () => ({
        align: 'left'
      })
    },
    tableData: {
      type: Array,
      default: () => []
    },
    reload: {
      type: Function,
      default: null
    },
    pagination: {
      type: Boolean,
      default: false
    }
  },
  components: {
    SearchBar
  },
  setup(props, ctx) {
    const state = reactive({
      tableSize: [{ label: 'medium', value: 'medium' }, { label: 'small', value: 'small' }, { label: 'mini', value: 'mini' }],
      curSize: 'medium',
      checkAll: true,
      isIndeterminate: true,
      originalColumns: props.columns.map(v => v.prop), // 传入的原始columns
      checkList: props.columns.map(v => v.prop) || [], // 字段选择
      cloneColumns: _.cloneDeep(props.columns.map(v => {
        v.show = true
        v.fixed = false
        return v
      })),
      preSize: '',
      cloneTableData: [],
      tableLoading: false,
      page: {
        currentPage: 1,
        pageSize: 5
      },
      multipleSelection: [],
      isMultiple: false
    })
    const proTable = ref(null)
    const SearchBarRef = ref(null)
    provide('columns', props.columns)
    provide('searchBar', props.searchBar)

    watch(() => props.tableData, () => {
      if (_.isEmpty(props.tableData[0])) return
      /* 传入对象必须包含columns中的值 */
      state.originalColumns.forEach(key => {
        const tmp = Object.prototype.hasOwnProperty.call(props.tableData[0], key)
        if (!tmp) {
          throw new Error(`The object table-data-item must contain the key of the column`)
        }
      })
      state.cloneTableData = _.cloneDeep(props.tableData)
    })

    /* 重载数据 */

    const reLoadData = () => {
      state.tableLoading = true
      SearchBarRef.value.loading = true
      props.reload()
      setTimeout(() => {
        state.tableLoading = false
        SearchBarRef.value.loading = false
      }, 400)
    }

    /* 单项checkBox 改变事件 */

    const handleCheckedFieldChange = (params) => {
      state.tableLoading = true
      handleFieldDisplay()
      const checkedCount = params.length
      state.checkAll = checkedCount === state.originalColumns.length
      state.isIndeterminate = checkedCount > 0 && checkedCount < state.originalColumns.length
      setTimeout(() => {
        state.tableLoading = false
      }, 200)
    }

    /* 全选改变事件 */

    const handleCheckAllChange = (value) => {
      state.tableLoading = true
      state.checkList = value ? state.originalColumns : []
      state.isIndeterminate = false
      handleFieldDisplay()
      setTimeout(() => {
        state.tableLoading = false
      }, 200)
    }

    /* 控制字段显示数据 */
    const handleFieldDisplay = () => {
      state.cloneColumns.forEach(j => {
        j.show = state.checkList.includes(j.prop)
      })
    }

    /* 重置配置 */

    const resetConfig = () => {
      state.cloneColumns.map(v => {
        v.fixed = false
        return v
      })
    }

    /* table size set */
    const handleTableSizeChange = (size) => {
      state.curSize = size

      nextTick(() => {
        const els = document.body.querySelectorAll('.pro-table__body .el-button')
        if (state.preSize) {
          els.forEach(el => {
            el.classList.remove(`el-button--${state.preSize}`)
          })
        }
        els.forEach((el, i) => {
          el.classList.add(`el-button--${size}`)
        })
        state.preSize = size
      })
    }

    /* 调整字段置顶操作 */

    const handleFieldTop = (field) => {
      state.cloneColumns.map(v => {
        v.fixed = v.prop === field.prop
        return v
      })
    }

    /* 分页事件 */

    const handleSizeChange = (val) => {
      state.page.pageSize = val
      reLoadData()
    }

    /* 当前页事件 */
    const handleCurrentChange = (val) => {
      state.page.currentPage = val
      reLoadData()
    }

    /* table 多选 */

    const handleSelectionChange = (selection) => {
      state.multipleSelection = selection
      /* vif vshow 绑定多选值存在问题，先用原始方式解决 */
      document.querySelector('.multiple-selection-wrapper').style.display = selection.length > 0 ? 'block' : 'none'
    }

    /* 批量删除 */
    const multipleDelete = () => {
      const ids = state.multipleSelection.map(item => item.id)
      console.log('ids', ids.join(','))
    }

    /* searchBar sea */

    const searchChange = (params) => {
      ctx.emit('search', params)
    }

    /* searchBar reset */
    const searchReset = () => {
      ctx.emit('searchReset')
    }

    return {
      ...toRefs(state),
      proTable,
      SearchBarRef,
      resetConfig,
      handleTableSizeChange,
      handleCheckedFieldChange,
      handleCheckAllChange,
      reLoadData,
      handleFieldTop,
      handleSizeChange,
      handleCurrentChange,
      handleSelectionChange,
      multipleDelete,
      searchChange,
      searchReset
    }
  },
  emits: ['search', 'searchReset']
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
  .multiple-selection-wrapper {
    display: none;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 20px;
    text-align: right;
    background: #fff;
    box-shadow: 0 6px 16px -8px rgba(0, 0, 0, 0.08),
      0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03);
  }
  &__pagination {
    margin-top: 20px;
  }
}

.field-select-layout {
  .field-item {
    padding: 4px 0;
    display: flex;
    justify-content: space-between;
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
    & .sort-ops {
      font-size: 14px;
      display: inline-block;
      // display: none;
      a {
        padding: 0 4px;
        &:hover {
          color: $--color-primary;
        }
        i.active {
          font-weight: 600;
          color: $--color-primary;
          text-shadow: 0 0 2px $--color-primary;
        }
      }
    }
    &:hover .sort-ops {
      display: inline-block;
    }
  }
}
</style>
