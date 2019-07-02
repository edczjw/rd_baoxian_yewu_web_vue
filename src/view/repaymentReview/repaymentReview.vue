<template>
  <div class="page-human">
    <el-card>
      <el-form :model="searchform" ref="searchform" label-width="100px">
        <el-row type="flex" class="human-form">
          <el-col :span="6">
            <el-form-item label="申请主体" prop="applicationMain">
              <el-input size="mini" v-model.trim="searchform.applicationMain"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="案件号" prop="caseNo">
              <el-input size="mini" v-model.trim="searchform.caseNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="还款日期" prop="startTime">
              <el-date-picker
                size="mini"
                v-model="searchform.startTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择开始日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="至">
              <el-date-picker
                size="mini"
                v-model="searchform.endTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button size="mini" type="primary" @click="submitForm()">搜索</el-button>
              <el-button size="mini" @click="resetForm('searchform')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="human-table">
      <el-table
        :data="tableData"
        border
        size="mini"
        stripe
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%; height:100%;"
      >
        <el-table-column prop="reportCode" label="案件编号" align="center"></el-table-column>
        <el-table-column prop="reportName" label="申请主体" align="center"></el-table-column>
        <el-table-column prop="reportTotalMomey" label="还款总金额（元）" align="center"></el-table-column>
        <el-table-column prop="reportMomey" label="还款本金（元）" align="center"></el-table-column>
        <el-table-column prop="reportinterestMoney" label="还款利息（元）" align="center"></el-table-column>
        <el-table-column prop="reportpinterestMoney" label="还款罚息（元）" align="center"></el-table-column>
        <el-table-column prop="reportApplicationTime" label="还款时间" align="center"></el-table-column>
        <el-table-column prop label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row.reportName,scope.row.reportDate,scope.row.reportType)"
              type="text"
              size="small"
            >审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="human-pagination">
        <el-pagination
          backgrounda
          style="text-align:center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.searchform.pageIndex"
          :page-sizes="[20,50,100]"
          :page-size="this.searchform.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="count"
        >
          <!--这是显示总共有多少数据-->
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      searchform: {
        applicationMain: "",
        caseNo: "",
        startTime: "",
        endTime: "",
        pageIndex: 1, //初始页
        pageSize: 50 //显示当前行的条数
      },
      tableData: [
        {
          reportCode: "MS002647",
          reportName: "民盛小待",
          reportMomey: "30，000.00",
          reportTotalMomey: "20，000.00",
          reportinterestMoney: "10，000.00",
          reportpinterestMoney: "0",
          reportApplicationTime: "2019.01.24  15:31:35"
        }
      ]
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    submitForm() {
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
    // 重置功能
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // this.getlist();
    },
    handleSizeChange(psize) {
      // 改变每页显示的条数
      this.searchform.pageSize = psize;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.searchform.pageIndex = 1;
      // this.search();
    },

    // 初始页currentPage
    handleCurrentChange(pindex) {
      this.searchform.pageIndex = pindex;
      // this.search();
    },
    //表单操作
    handleClick() {}
  },

  watch: {}
};
</script>
<style lang='less' scoped>
/deep/ .el-card {
  background: rgba(255, 255, 255, 0.1);
  /deep/ .el-table tr,
  .el-table th {
    background: rgba(173, 173, 173, 0.3);
  }
  /deep/ .el-table--border td,
  .el-table--border th,
  .el-table__body-wrapper
    .el-table--border.is-scrolling-left
    ~ .el-table__fixed {
    border-right: 1px solid #fff;
  }
}
.page-human {
  .human-table {
    margin-top: 40px;
  }
  .human-pagination {
    margin-top: 30px;
  }
}
</style>