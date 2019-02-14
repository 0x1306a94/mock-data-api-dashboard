<template>
  <div class="app-container">
    <el-select v-model="type" @change="typeChange" class="type-select">
      <el-option
        v-for="item in typeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <div class="project-table-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>

      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="Name">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="Key" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.key }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Host" align="center">
        <template slot-scope="scope">
          {{ scope.row.host }}
        </template>
      </el-table-column>

      <el-table-column v-if="type == 0" class-name="status-col" label="Status" width="100" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enable"
            :disabled="true"
            active-color="#13ce66"
            @change="toogleEableState(scope.row)" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.createdAt | formatDisplayDate }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="更新时间">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.updateAt | formatDisplayDate }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            @click="handleToggleStatus(scope.$index, scope.row)">{{ scope.row.enable | formatDisplayStatus }}</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-if="total > 10" class="page-bar">
      <el-pagination
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        :total="total"
        :current-page="pageNo"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentPageChange" />
    </div>
  </div>
  </div>
</template>

<script>
import dateformat from 'dateformat'
import { getProject, changeProjectInfo, deleteProject } from '@/api/project'

export default {
  filters: {
    formatDisplayDate(str) {
      const date = Date.parse(str)
      return dateformat(date, 'yyyy-mm-dd HH:mm:ss')
    },
    formatDisplayStatus(enable) {
      return enable ? '禁用' : '启用'
    }
  },
  data() {
    return {
      type: 0,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      // hasMore: false,
      list: [],
      listLoading: true
    }
  },
  computed: {
    typeOptions() {
      const options = [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '已启用'
        },
        {
          value: 2,
          label: '已禁用'
        }
      ]
      return options
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getProject(this.pageNo, this.pageSize, this.type).then((response) => {
        this.total = response.data.total
        this.list = response.data.list
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handlePageSizeChange(val) {
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentPageChange(val) {
      this.pageNo = val
      this.fetchData()
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleToggleStatus(index, row) {
      const params = {
        projectId: row.id,
        name: row.name,
        host: row.host,
        enable: !row.enable
      }
      changeProjectInfo(params).then(response => {
        if (response.data === true) {
          this.list[index].enable = !row.enable
        }
      })
    },
    handleDelete(index, row) {
      const params = {
        projectId: row.id
      }
      deleteProject(params).then(response => {
        if (response.data === true) {
          this.fetchData()
        }
      })
    },
    typeChange() {
      this.fetchData()
    }
  }
}
</script>

<style scoped>
.type-select {
  align-content: flex-end;
}
.project-table-container {
  margin-top: 10px;

}

.page-bar {
  text-align: center;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
</style>
