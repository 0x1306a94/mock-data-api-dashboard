<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="全部">
        <project-table :project-type="0" class="project-table" />
      </el-tab-pane>
      <el-tab-pane label="已启用">
        <project-table :project-type="1" class="project-table" />
      </el-tab-pane>
      <el-tab-pane label="已禁用">
        <project-table :project-type="2" class="project-table" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ProjectTable from '@/views/project/ProjectTable'

export default {
  components: {
    ProjectTable
  }
}
</script>

<style scoped>

</style>
