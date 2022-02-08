<template>
  <div class="login-wrap">
    <!-- <img src="../../../static/img/bank.png" alt=""> -->
    <div class="ms-title">后台管理系统</div>
    <div class="ms-login">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="demo-ruleForm"
      >
        <el-form-item prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm"
          ></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm">登录</el-button>
        </div>
        <div>
          <span class="register" @click="showDialog">注册新账号</span>
        </div>
        <!-- <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p> -->
      </el-form>
    </div>

    <el-dialog
      class="rigister-dialog"
      title="注册新账号"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="密 码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="register">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from "../../../config/request";
export default {
  data: function () {
    return {
      ruleForm: {
        name: "",
        password: "",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur"},
        { min: 8, message: '长度至少为8个字符', trigger: 'blur' }],
      },
      form: {},
      dialogFormVisible: false,
    };
  },
  created(){
    var dd = JSON.parse(localStorage.getItem('login_info'))
    // console.log("dd"+dd);
    if(dd!=null){
      this.ruleForm.name = dd.username
      // console.log(dd);
    }
  },
  methods: {
    showDialog() {
      this.dialogFormVisible = true;
    },
    register() {
      api.register(this.form).then((res) => {
        if (res.result.code == 1) {
          this.$message.success("注册成功");
        } else {
          this.$message.error("注册失败，请重试");
        }
        this.dialogFormVisible = false;
        // console.log(res);
      });
    },
    submitForm(formName) {
      var that = this;
      //   console.log(this.$refs.ruleForm.value);
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          api.login(that.ruleForm).then((res) => {
            var code = res.result.code;
            if (code == 1) {
              this.$message({
                message: res.result.msg,
                type: "success",
              });
              var access_token = res.result.data.access_token;
              localStorage.setItem(
                "login_info",
                JSON.stringify({
                  access_token: access_token,
                  username: this.ruleForm.name,
                })
              );
              this.$router.push("/home");
            } else {
              this.$message({
                message:"用户名或密码错误",
                type: "error",
              });
            }

            var dd = JSON.parse(localStorage.getItem("login_info"));
            // console.log(dd);`
          });
          // console.log(that.ruleForm);
        }
      });
    },
  },
};
</script>

<style scoped>
.register {
  color: #0d6fbb;
  float: left;
  text-decoration: underline;
  font-size: 15px;
  padding-top: 5px;
  cursor: pointer;
}

.rigister-dialog {
  width: 500px;
  margin: 0 auto;
}

.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
</style>