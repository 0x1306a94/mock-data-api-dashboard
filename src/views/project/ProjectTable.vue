<template>
  <div class="project-table-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      @current-change="handleCurrentSelectChange"
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

      <el-table-column v-if="projectType == 0" class-name="status-col" label="Status" width="100" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enable"
            :disabled="true"
            active-color="#13ce66"
            @change="toogleEableState(scope.row)" />
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.createdAt | formatDisplayDate }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="update_at" label="更新时间">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.updateAt | formatDisplayDate }}</span>
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
</template>

<script>
import dateformat from 'dateformat'

import { getProject } from '@/api/project'

export default {
  filters: {
    formatDisplayDate(str) {
      const date = Date.parse(str)
      return dateformat(date, 'yyyy-mm-dd HH:mm:ss')
    }
  },
  props: {
    projectType: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 0,
      // hasMore: false,
      list: [],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getProject(this.pageNo, this.pageSize, this.projectType).then((response) => {
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
    handleCurrentSelectChange(val) {
      console.log('tag', val)
    }
  }
}
</script>

<style scoped>
.project-table-container {
  padding: 0px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.page-bar {
  text-align: center;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
</style>
