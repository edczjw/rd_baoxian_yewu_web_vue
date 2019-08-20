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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      text: ""
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
    this.load(data);
  },

  methods: {
    load(data) {
      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/manage/order/getRepayDetail",
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
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
.page-detail {
  .detail-table {
    width: 50%;
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