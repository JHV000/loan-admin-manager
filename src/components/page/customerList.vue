<template>
  <div class="table">
    <div class="handle-box">
      <el-input
        v-model="select_word"
        placeholder="请输入客户姓名"
        class="handle-input mr10"
      ></el-input>
      <el-button
        type="primary"
        v-model="select_word"
        icon="search"
        @click="search"
        >搜索</el-button
      >
      <el-button type="default" @click="getData">重 置</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%" stripe class="eltable">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="客户名称">
              <span class="span-name">{{ props.row.customer_name }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.customer_sex }}</span>
            </el-form-item>
            <el-form-item label="联系方式">
              <span>{{ props.row.customer_phone }}</span>
            </el-form-item>

            <el-form-item label="业务员">
              <span>{{ props.row.bel_staff_name }}</span>
            </el-form-item>

            <el-form-item label="备注">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.created_at }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="客户名称" align="center" prop="customer_name"> </el-table-column>
      <el-table-column label="联系方式" align="center" prop="customer_phone">
      </el-table-column>
      <el-table-column label="业务员" align="center" prop="bel_staff_name"> </el-table-column>
      <el-table-column label="备注" align="center" prop="remark"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as api from "../../../config/request";
export default {
  data() {
    return {
      tableData: [],
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
      this.select_word = ''
      let self = this;
      api.getCustomerList().then((res) => {
        self.tableData = res.result.data.array;
        console.log(res.result.data.array);
      });
    },
    search() {
      api.searchCum(this.select_word).then((res) => {
        if(res.result.code==1){
          this.tableData = res.result.data.array
        }
        console.log(res);
      });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
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