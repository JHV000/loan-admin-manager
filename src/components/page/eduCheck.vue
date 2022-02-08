<template>
  <div class="table">
    <div class="handle-box">
      <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
      <el-input
        v-model="select_word"
        placeholder="请输入公司名称"
        class="handle-input mr10"
      ></el-input>
      <el-button type="primary" icon="search" @click="searchEdu">搜索</el-button>
      <el-button type="default" @click="getData">重 置</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column align="center" prop="created_at" label="提交日期" sortable width="200">
      </el-table-column>
      <el-table-column align="center" prop="enterprise" label="公司名称" width="120">
      </el-table-column>
      <el-table-column align="center" prop="status" label="审核状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status == 0 ? 'warning' : 'success'"
            disable-transitions
            >{{ scope.row.status == 0 ? '未出额' : '已出额' }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column align="center" prop="bel_staff_name" label="业务员"> </el-table-column>
      <el-table-column align="center" prop="quota" label="额度(单位:万)"> </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)"
            >提交额度</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="填写预测额度" :visible.sync="dialogFormVisible">
  <el-form>
    <el-form-item label="额度(单位：万)" :label-width="formLabelWidth">
      <el-input v-model="quotaList.quota" auto-complete="off"></el-input>
    </el-form-item>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateEdu">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import * as api from "../../../config/request";
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      quotaList: {
        id: null,
        quota: null,
      },
      formLabelWidth: "120px",
      is_search: false,
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
      api.getEduList().then((res) => {
        self.tableData = res.result.data.array;
        // console.log(res.result.data.array);
      });
    },
    searchEdu() {
      api.searchEdu(this.select_word).then((res) => {
        if (res.result.code == 1) {
          this.tableData = res.result.data.array;
        }
        console.log(res);
      });
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.quotaList.id = row.quota_id;
      console.log(row.quota_id);
      //   this.$message("编辑第" + (index + 1) + "行");
    },
    handleDelete(row) {
      // console.log(row);
      api.deleteEdu(row.quota_id).then((res) => {
        if (res.result.code == 1) {
          this.$message.success("删除成功");
          this.getData();
        }
        console.log(res);
      });
    },
    updateEdu() {
      var dd = this.quotaList;
      api.updateEdu(dd.id, dd.quota).then((res) => {
        if (res.result.code == 1) {
          this.$message.success("出额成功！");
          this.dialogFormVisible = false;
          this.getData();
        } else {
          this.$message.error("出额失败，请重试");
        }
        console.log(res);
      });
      //  this.dialogFormVisible = false;
    },
    delAll() {
      const self = this,
        length = self.multipleSelection.length;
      let str = "";
      self.del_list = self.del_list.concat(self.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += self.multipleSelection[i].name + " ";
      }
      self.$message.error("删除了" + str);
      self.multipleSelection = [];
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

.table {
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
</style>