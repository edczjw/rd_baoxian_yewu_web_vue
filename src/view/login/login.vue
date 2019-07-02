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
  mounted() {},
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

              // if(str=='陈春松'){
              //   this.setCookie('admint=bdd6df454ac00feece272c0f2c8e53a252dabba4;')
              //   this.setCookie('adminhostid=3')
              // }
              // else if(str=='林中林'){
              //   this.setCookie('admint=91b5e4269fb5564aadca6982d9bf2c0b47469dde;')
              //   this.setCookie('adminhostid=10')
              // }else if(str=='刘建平'){
              //   this.setCookie('admint=677a0e45cfa3a9e49f9a06d82863b276cdcbc6d6;')
              //   this.setCookie('adminhostid=2')
              // }else if(str=='邓永枢'){
              //   this.setCookie('admint=8a0056d7ef024b4055c0a33a4c56176e3c96dd0c;')
              //   this.setCookie('adminhostid=1')
              // }else if(str=='何稳'){
              //   this.setCookie('admint=4fe5e00d51d8edeec543ddf2cb939c70dc131b87;')
              //   this.setCookie('adminhostid=4')
              // }else if(str=='菜小池'){
              //   this.setCookie('admint=5825152c96d4aeadbe002c4c6cdcc27283828a54;')
              //   this.setCookie('adminhostid=5')
              // }else if(str=='闫勇'){
              //   this.setCookie('admint=941a7eb3a3186ad643dc31b3dd058aa485799b31;')
              //   this.setCookie('adminhostid=6')
              // }else if(str=='廖凯璇'){
              //   this.setCookie('admint=b384cd26f0f8484bbd99593a16cc56cae5086dba;')
              //   this.setCookie('adminhostid=7')
              // }else if(str=='朱雪玲'){
              //   this.setCookie('admint=5960ab324eccd7ed4bd01912c969fe3e51dbcf16;')
              //   this.setCookie('adminhostid=8')
              // }else if(str=='傅羿方'){
              //   this.setCookie('admint=55c08dbd3775245f0cef1f50ac7bca46655a2130;')
              //   this.setCookie('adminhostid=9')
              // } else{
              //   this.setCookie('admint=1213;')
              //   this.setCookie('adminhostid=120')
              // }
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
  // margin-block-start: 3.67em;
  // margin-block-end: 0.67em;
  // margin-inline-start: 0px;
  // margin-inline-end: 0px;
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
