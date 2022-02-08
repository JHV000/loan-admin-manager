<template>
  <div class="table">
    <div class="handle-box">
      <el-input
        v-model="select_word"
        placeholder="请输入员工名称"
        class="handle-input mr10"
      ></el-input>
      <el-button type="primary" icon="search" @click="searchStaff"
        >搜 索</el-button
      >
      <el-button type="default" @click="getData">重 置</el-button>
    </div>
    <el-table stripe :data="tableData" border style="width: 100%">
      <el-table-column
        align="center"
        prop="created_at"
        label="注册日期"
        sortable
        width="200"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="staff_name"
        label="姓名"
        width="120"
      >
      </el-table-column>
      <el-table-column align="center" prop="identity" label="审核状态">
      </el-table-column>
      <el-table-column align="center" prop="customers_count" label="客户数">
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template scope="scope">
          <!-- <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button type="danger" @click="handleDelete(scope.row)"
            >离职</el-button
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
      select_cate: "",
      select_word: "",
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
      this.select_word = "";
      let self = this;
      api.getUserList().then((res) => {
        self.tableData = res.result.data.array;
        console.log(res.result.data.array);
      });
    },
    searchStaff() {
      api.searchStaff(this.select_word).then((res) => {
        if (res.result.code == 1) {
          this.tableData = res.result.data.array;
        }else {
          this.$message.error("查询失败，请重试")
        }
        // console.log(res);
      });
    },
    handleDelete(row) {
      // console.log(row.staff_id);
      this.$confirm("此操作将删除该员工并保留其客户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api.resign(row.staff_id).then((res) => {
            if (res.result.code == 1) {
              this.$message.success("员工删除成功");
            } else {
              this.$message.error("离职失败，请重试");
            }
            this.getData();
            // console.log(res);
          });
        })
        .catch(() => {});
    },
    search() {},
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