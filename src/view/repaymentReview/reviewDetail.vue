<template>
  <div class="page-detail">
    <div class="detail-table">
      <el-row>
        <el-col :span="6">
          <div>还款状态</div>
        </el-col>
        <el-col :span="6">
          <div>{{text}}</div>
        </el-col>
        <el-col :span="6">
          <div>剩余还款天数</div>
        </el-col>
        <el-col :span="6">
          <div style="color:red;">{{data.surplusRepayDates}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">借款总金额</el-col>
        <el-col :span="6">{{data.loanInitPrin}}</el-col>
        <el-col :span="6">借款时间</el-col>
        <el-col :span="6">{{data.borrowTime}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">已还总金额</el-col>
        <el-col :span="6">{{data.paidTotalMoney}}</el-col>
        <el-col :span="6">剩余总金额</el-col>
        <el-col :span="6">{{data.surplusTotalMoney}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">已还本金</el-col>
        <el-col :span="6">{{data.paidPrincipal}}</el-col>
        <el-col :span="6">剩余未还本金</el-col>
        <el-col :span="6">{{data.surplusPrincipal}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">已还利息</el-col>
        <el-col :span="6">{{data.paidInterest}}</el-col>
        <el-col :span="6">剩余未还利息</el-col>
        <el-col :span="6">{{data.surplusInterest}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">已还罚息</el-col>
        <el-col :span="6">{{data.paidPenalty}}</el-col>
        <el-col :span="6">剩余未还罚息</el-col>
        <el-col :span="6">{{data.surplusPenalty}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">逾期天数</el-col>
        <el-col :span="6">{{data.overdueDates}}</el-col>
        <el-col :span="6">影像文件</el-col>
        <el-col :span="6">
          <template v-if="data.contUrl && data.contUrl.length>0">
            <template v-for="(item,index) in data.contUrl">
              <a :href="item" target="_blank">查看</a>
            </template>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6"></el-col>
      </el-row>
      <el-row>
        <el-col :span="6">本次还款总金额</el-col>
        <el-col :span="6">{{data.repayAmt}}</el-col>
        <el-col :span="6">本次还款本金</el-col>
        <el-col :span="6">{{data.repayPrincipal}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">本次还款利息</el-col>
        <el-col :span="6">{{data.repayInterest}}</el-col>
        <el-col :span="6">本次还款罚息</el-col>
        <el-col :span="6">{{data.repayPenalty}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">审核结果</el-col>
        <el-col :span="6">
          <el-select size="mini" v-model="result" placeholder="请选择审核结果" @change="changeR">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">入账时间</el-col>
        <el-col :span="6">
          <el-date-picker
            size="mini"
            v-model="repayTime"
            :disabled="result == 'pass'?false:true"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="请选择时间"
          ></el-date-picker>
        </el-col>
      </el-row>
    </div>
    <el-row type="flex" justify="center">
      <el-button type="primary" @click="submit">提交</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: "",
      repayTime: "",
      options: [
        {
          value: "pass",
          label: "通过"
        },
        {
          value: "refuse",
          label: "拒绝"
        }
      ],
      data: {},
      text: "",
      processNo: ""
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    this.text = this.$route.query.status;
    var data = {
      processNo: this.$route.query.processNo
    };
    this.processNo = this.$route.query.processNo;
    this.load(data);
  },

  methods: {
    changeR(event) {
      if (event == "refuse") {
        this.repayTime = "";
      }
    },
    load(data) {
      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/manage/order/getRepayAuditDetail",
        data: data
      }).then(
        response => {
          var res = response.data;
          if (res.code == 0) {
            if (res.detail.result.contUrl) {
              res.detail.result.contUrl = res.detail.result.contUrl.split(",");
            }
            this.data = res.detail.result;
          }
        },
        error => {}
      );
    },

    submit() {
      if (this.result.length > 0) {
        var data = {};
        if (this.result == "pass") {
          if (this.repayTime.length == 0) {
            this.$message({
              message: "请选择时间",
              duration: 1000,
              type: "error"
            });
          } else {
            data = {
              result: this.result,
              repayTime: this.repayTime,
              processNo: this.processNo
            };
          }
        } else {
          data = {
            result: this.result,
            processNo: this.processNo
          };
        }
        this.$axios({
          method: "post",
          url: this.$store.state.domain + "/manage/repayRecordAcct",
          data: data
        }).then(
          response => {
            var res = response.data;
            if (res.code == 0) {
              this.$message({
                message: res.msg,
                duration: 1000,
                type: "success"
              });
              this.$router.back(-1);
            } else {
              this.$message({
                message: res.msg,
                duration: 1000,
                type: "error"
              });
            }
          },
          error => {}
        );
      }
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
.page-detail {
  .detail-table {
    width: 70%;
    margin: 40px auto;
    border: 1px solid #f5f5f5;
    background: rgba(173, 173, 173, 0.2);
    .el-row {
      border-bottom: 1px solid #f5f5f5;
      &:last-child {
        margin-bottom: 0;
        border-bottom: none;
      }
    }
    .el-col {
      border-radius: 4px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      font-size: 14px;
      border-right: 1px solid #f5f5f5;
      &:last-child {
        border-right: none;
      }
      a {
        color: #66b1ff;
        padding: 0px 20px;
      }
    }
  }
  .comfirmButton {
    margin-top: 30px;
  }
  /deep/ .el-card {
    width: 60%;
    margin: 40px auto;
  }
}
</style>