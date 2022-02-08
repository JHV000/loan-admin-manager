<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="6"
          ><div class="grid-content bg-purple-light">
            <div class="left">
              <img class="icon-home" src="../../../static/img/emplyee.png" alt="" />
            </div>
            <div class="right">
              <div class="word">员工总数</div>
              <div class="num">{{count.staff_num}}</div>
            </div>
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple-light">
            <div class="left">
              <img class="icon-home" src="../../../static/img/customer.png" alt="" />
            </div>
            <div class="right">
              <div class="word">客户总数</div>
              <div class="num">{{count.discus_num + count.rescus_num}}</div>
            </div>
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple-light">
            <div class="left">
              <img class="icon-home" src="../../../static/img/warn.png" alt="" />
            </div>
            <div class="right">
              <div class="word">无主客户数</div>
              <div class="num">{{count.rescus_num}}</div>
            </div>
          </div></el-col
        >
      </el-row>
    </div>
    <div class="schart">
      <!-- <div class="content-title">饼状图</div> -->
      <schart
        canvasId="pie"
        width="500"
        height="400"
        :data="data2"
        type="pie"
        :options="options2"
      ></schart>
    </div>
  </div>
</template>

<script>
import Schart from "vue-schart";
import * as api from "../../../config/request";
export default {
  components: {
    Schart,
  },
  created() {
    api.getCount().then((res) => {
      this.count = res.result.data[0];
      var data = [
        { name: "员工总数", value: res.result.data[0].staff_num },
        {
          name: "客户总数",
          value: res.result.data[0].discus_num + res.result.data[0].rescus_num,
        },
      ];
      this.data2 = data;
      // console.log(res.result.data[0]);
    });
  },
  data() {
    return {
      count: [],
      data2: [],
      options2: {
        title: "数据分析",
      },
    };
  },
};
</script>

<style scoped>
.icon-home {
  width: 40px;
  height: 40px;
}
.schart {
  margin-top: 20px;
  text-align: initial;
}
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #fff;
}
/* .el-icon-user-solid:before {
  content: "\e7a5";
} */
.grid-content {
  /* border-radius: 4px; */
  min-height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 108px;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  -webkit-box-shadow: 4px 4px 40px rgb(0 0 0 / 5%);
  box-shadow: 4px 4px 40px rgb(0 0 0 / 5%);
  border-color: rgba(0, 0, 0, 0.05);
}
.grid-content .right {
  text-align: center;
}

.right .word {
  font-size: 20px;
  color: #8c8c8c;
  font-weight: 700;
}
.right .num {
  font-size: 20px;
  color: #666666;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>