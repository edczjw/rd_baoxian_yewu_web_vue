<template>
  <div>
    <el-card>
      <el-form label-width="100px">
        <el-row type="flex" class="human-form">
          <el-col :span="6">
            <el-form-item label="申请主体">
              <el-input size="mini" v-model.trim="ruleForm.applicationMain"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="案件号">
              <el-input size="mini" v-model.trim="ruleForm.caseNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="案件状态">
              <el-select size="mini" v-model="ruleForm.caseStatu" placeholder>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="申请时间">
              <el-date-picker
                size="mini"
                v-model="ruleForm.startTime"
                type="datetime"
                placeholder="申请开始时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="至">
              <el-date-picker
                size="mini"
                v-model="ruleForm.endTime"
                type="datetime"
                placeholder="申请结束时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button size="mini" type="primary" @click="submitForm()">搜索</el-button>
              <el-button size="mini" @click="resetForm()">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["model", "value"],
  data() {
    return {
      options: [
        {
          value: "1",
          label: "审核中"
        },
        {
          value: "0",
          label: "待审核"
        }
      ],
      ruleForm: {
        applicationMain: "",
        caseNo: "",
        caseStatu: "",
        startTime: "",
        endTime: ""
      }
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    submitForm(formName) {
      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/biz/user/login",
        data: this.loginform
      }).then(
        response => {
          if (response.data.code == 0) {
            //开户状态、用户名、企业编号
            var accountStatus = response.data.detail.accountStatus;
            var username = response.data.detail.username;

            //未开户时不返回
            if (
              response.data.detail.enterpriseNo != "" ||
              response.data.detail.enterpriseNo != null
            ) {
              var enterpriseNo = response.data.detail.enterpriseNo;
            }

            console.log(username);

            //存储状态、用户名、企业编号
            sessionStorage.setItem("accountStatus", accountStatus);
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("enterpriseNo", enterpriseNo);

            //登录成功
            this.$message({
              message: "恭喜你" + response.data.msg,
              type: "success"
            });

            if (accountStatus == 2) {
              //已开户
              this.$router.push("/mshome"); //跳转
              console.log(accountStatus + "跳转到主页");
            } else if (accountStatus == 0) {
              this.$router.push("/creatuser/creatus");
              console.log(accountStatus + "创建账户");
              this.$store.state.buttonshow = true; //隐藏开户提交按钮
            } else if (
              accountStatus == 1 ||
              accountStatus == 4 ||
              accountStatus == 5
            ) {
              this.$router.push("/creatuser/creatus");
              console.log(accountStatus + "创建账户");
              this.$store.state.buttonshow = false; //隐藏开户提交按钮
            } else if (accountStatus == 3) {
              this.$router.push("/failcreatuser/failcreatus");
              console.log(accountStatus + "创建账户失败");
            }
          } else {
            this.$message.error(response.data.msg);
          }
        },
        response => {
          console.log(response);
        }
      );
    },
    resetForm(formName) {
      // 重置页面数据
      this.ruleForm = {
        applicationMain: "",
        caseNo: "",
        startTime: "",
        endTime: "",
        caseStatu: ""
      };
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
</style>