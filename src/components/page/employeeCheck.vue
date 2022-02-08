<template>
  <div class="table">

    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
    >
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column align="center" prop="created_at" label="注册日期" sortable width="200">
      </el-table-column>
      <el-table-column align="center" prop="staff_name" label="姓名" width="200">
      </el-table-column>
      <el-table-column align="center" prop="identity" width="200" label="审核状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.identity == '未认证' ? 'warning' : 'success'"
            disable-transitions
            >{{ scope.row.identity }}</el-tag
          >
        </template>
      </el-table-column>
      <!-- <el-table-column prop="customers_count" label="客户数">
            </el-table-column> -->
      <el-table-column align="center" label="操作">
        <template scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)"
            >审核通过</el-button
          >
          <el-button size="small" type="danger" @click="handleDelete(scope.row)"
            >拒绝</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as api from "../../../config/request";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    getData() {
      let self = this;
      api.getEmployeeCheckList().then((res) => {
        self.tableData = res.result.data;
        console.log(res.result.data);
      });
    },
    handleEdit(row) {
      api.checkEmployee(row.staff_id,1).then((res) => {
          if(res.result.code==1){
              this.$message.success(res.result.msg)
              this.getData()
          }else {
              this.$message.error(res.result.msg)
          }
        // console.log(res);
      });
    },
    handleDelete(row) {
     api.checkEmployee(row.staff_id,0).then((res) => {
          if(res.result.code==1){
              this.$message.success(res.result.msg)
              this.getData()
          }else {
              this.$message.success("已拒绝该申请")
          }
        // console.log(res);
      });
    },

  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}
.handle-select {
  width: 120px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
</style>