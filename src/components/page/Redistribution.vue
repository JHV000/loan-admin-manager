<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          ><i class="el-icon-menu"></i> 客户</el-breadcrumb-item
        >
        <el-breadcrumb-item>待分配客户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      <!-- <el-button
        type="primary"
        icon="delete"
        class="handle-del mr10"
        @click="delAll"
        >批量删除</el-button
      > -->

      <!-- <el-input
        v-model="select_word"
        placeholder="请输入客户姓名"
        class="handle-input mr10"
      ></el-input>
      <el-button type="primary" icon="search" @click="search">搜索</el-button> -->
      <el-button type="primary" icon="search" @click="resign"
        >批量分配</el-button
      >
    </div>

    <el-table
      stripe
      :data="tableData"
      border
      style="width: 100%"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        align="center"
        prop="customer_name"
        label="客户名称"
        width="200"
      >
      </el-table-column>
      <el-table-column align="center" prop="customer_phone" label="联系方式">
      </el-table-column>
      <el-table-column align="center" prop="bel_staff_name" label="前业务员">
      </el-table-column>
      <el-table-column align="center" prop="remark" label="备注" width="200">
      </el-table-column>
    </el-table>

    <el-dialog title="分配给员工" :visible.sync="dialogTableVisible">
      <el-table
        highlight-current-row
        @current-change="handleCurrentChange"
        :data="emplyeeList"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column
          property="staff_name"
          align="center"
          label="姓名"
        ></el-table-column>
        <el-table-column
          property="customers_count"
          align="center"
          label="客户数"
        ></el-table-column>
      </el-table>
      <el-button type="primary" @click="submitResign">分配</el-button>
    </el-dialog>
  </div>
</template>

<script>
import * as api from "../../../config/request";
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: null,
      emplyeeList: [],
      is_search: false,
      dialogTableVisible: false,
      staff_id: null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleCurrentChange(val) {
      this.staff_id = val.staff_id;
    },
    resign() {
      if (this.multipleSelection == null) {
        this.$message.info("请先选择客户");
      } else {
        api.getUserList().then((res) => {
          this.emplyeeList = res.result.data.array;
          // console.log(res.result.data.array);
        });
        this.dialogTableVisible = true;
      }
    },
    getData() {
      api.getRedistribute().then((res) => {
        this.tableData = res.result.data;
        // console.log(res);
      });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(val);
    },
    submitResign() {
      var arr = this.multipleSelection;
      var eid = this.staff_id;
      var cidArr = [];
      arr.forEach(function (element) {
        cidArr.push(element.customer_id);
      });
      // console.log(cidArr);
      api.redistribute(cidArr, eid).then((res) => {
        console.log(res);
        if (res.result.code == 1) {
          this.$message.success("分配成功");
        } else {
          this.$message.error("分配失败，请重试");
        }
        this.dialogTableVisible = false;
        this.getData();
        // console.log(res);
      });
    },
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
  text-align: left;
}
.handle-select {
  width: 120px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>