<template>
  <div class="wrapper">
    <h1>保费佣金贷-业务端</h1>
    <div class="login-box">
      <div class="switch">
        <h3>账号登录</h3> 
      </div>

      <div class="lo-mo">
      <el-form
        ref="loginform"
        :model="this.loginform"
        status-icon
        label-width="65px"
        class="demo-ruleForm"
      >
        <div class="login-content">
          <el-form-item label="账号" prop="mobile">
            <el-input class="ell" placeholder="请输入手机号" v-model.trim="loginform.mobile">
              <template slot="prepend">
                <i class="el-icon-edit"></i>
              </template>
            </el-input>
          </el-form-item>
        </div>

        <div class="login-content">
              <el-form-item label="密码" prop="password">
                <el-input
                  class="ell"
                  placeholder="请输入密码"
                  type="password"
                  v-model.trim="loginform.password"
                > 
                  <template slot="prepend">
                    <i class="el-icon-view"></i>
                  </template>
                </el-input>
              </el-form-item>
          </el-row>
        </div>

        <div class="button-content">
          <el-button class="butt1" type="primary" size="medium" @click="login('loginform')">登录</el-button>
        </div>
      </el-form>
      </div>

    </div>
  </div>
</template>
<script>
import Router from "vue-router";
//引入jquery插件
import $ from "jquery";
export default {
  data() {
    // 确认密码校验
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registform.password) {
        callback(new Error("两次输入密码不一致!")); 
      } else {
        callback();
      }
    };
    return {
      count: '',   // 初始化次数
      timer: null,

      // 登录表单
      loginform: {
        mobile: "",
        password: ""
      },

      //输入框验证
      rules: {
        mobile: [
          { required: true, message: "账号不能为空。", trigger: "blur" },
          { max: 11, message: "长度 11 个字符。", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "请输入正确的手机号码。",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空。", trigger: "blur" }
          // { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
        ],
        realpassword: [
          { required: true, message: "不能为空。", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ],
        agreementStatus: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    
  },
  methods: {
    //登录
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            method: "post",
            url: this.$store.state.domain + "/manage/user/login",
            data: this.loginform
          }).then(
          //成功
          response => {
            console.log('response',response)
            if (response.data.code == 0) { 

              var str = response.data.detail.name;  
              var strid=response.data.detail.auditor_id;
              
              for(var x=0; x<response.data.detail.role.length;x++){
                if((response.data.detail.role[x].roleName)=="systemOperator"){
                 var rolename="showtrue";
                 sessionStorage.setItem("role",rolename);//本地存储角色
                }else{
                  console.log(response.data.detail.role[x].roleName)
                 sessionStorage.setItem("role",null);
                }
              }
              sessionStorage.setItem("username", str);//本地存储用户名
               this.$message({
                message: '登录成功',
                type: 'success'
              });
              sessionStorage.setItem("userId", strid);//本地存储用户ID
              this.$router.push("/home");//跳转
            } 
            //失败
            else {
              this.$message({
                message: response.data.msg,
                type: "error"
              });
              this.tips_show = true;
              this.tips = response.data.description;
              this.is_error = true;

            }
          },
          //打印
          response => {
            console.log(response);
          }
        );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  computed: {},
  components: {}
};
</script>

<style lang='less' scoped>
.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561288758180&di=e6540ebe97f725897ffd77bf6a0687e2&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1205%2F27%2Fc0%2F11769362_11769362_1338048682432.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
h1 {
  text-align: center;
  color: #fff;
  font-size: 35px;
  font-weight: 700;
  text-shadow: 0 1px 1px #555;
  display: block;
  padding-top:6%;
}
.login-box {
  opacity: .8;
  border-bottom-left-radius: 120px;
  border-top-right-radius: 120px;
  background-color: #fff;
  position: relative;
  margin: 0 auto;
  width: 30%;
  height: 380px;
  margin-top: 70px;
  border: 1px solid black;
}
.switch {
  width: 100%;
  font-size: 28px;
  text-align: center;
  color: rgb(68, 65, 65);
  padding: 40px 40px 0 40px;
}
.lo-mo{
  padding:40px 50px;
}
.button-content{
  width: 100%;
  margin-top: 20px;
  text-align: center;
}
.butt1{
  width: 100%;
}
</style>
