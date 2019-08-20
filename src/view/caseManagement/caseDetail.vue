<template>
  <div class="page-detail">
    <h1>借款信息</h1>
    <div class="detail-table">
      <el-row>
        <el-col :span="4">
          <div>申请主体</div>
        </el-col>
        <el-col :span="4">
          <div>{{data.channelName}}</div>
        </el-col>
        <el-col :span="4">
          <div>手机号</div>
        </el-col>
        <el-col :span="4">
          <div>{{data.channelPhone}}</div>
        </el-col>
        <el-col :span="4">
          <div>申请日期</div>
        </el-col>
        <el-col :span="4">
          <div>{{data.createTime | formatDate}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">借款金额</el-col>
        <el-col :span="4">{{data.applyLimit}}</el-col>
        <el-col :span="4">借款期限</el-col>
        <el-col :span="4">{{data.applyTerm}}</el-col>
        <el-col :span="4">银行卡号</el-col>
        <el-col :span="4">{{data.cardNo}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">银行卡名称</el-col>
        <el-col :span="4">{{data.bankName}}</el-col>
        <el-col :span="4">支行名称</el-col>
        <el-col :span="4" style="font-size:12px;">{{data.branchBankName}}</el-col>
        <el-col :span="4">影像文件</el-col>
        <el-col :span="4">
          <template v-if="data.agreementUrl && data.agreementUrl.length>0">
            <template v-for="(item,index) in data.agreementUrl">
              <a :href="item" target="_blank">查看</a>
            </template>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">审批结果</el-col>
        <el-col :span="4">{{data.rtfState}}</el-col>
        <el-col :span="4"></el-col>
        <el-col :span="4"></el-col>
        <el-col :span="4"></el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/config/utils.js";
export default {
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  data() {
    return {
      data: {}
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    var data = {
      processNo: this.$route.query.processNo
    };
    this.load(data);
  },

  methods: {
    load(data) {
      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/manage/caseInfo",
        data: data
      }).then(
        response => {
          var res = response.data;
          if (res.code == 0) {
            if (res.detail.result.agreementUrl) {
              res.detail.result.agreementUrl = res.detail.result.agreementUrl.split(
                ","
              );
            }
            this.data = res.detail.result;
            console.log("data", this.data);
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
/deep/ .el-card {
  background: rgba(255, 255, 255, 0);
}
.page-detail {
  h1 {
    font-size: 22px;
    margin-bottom: 20px;
  }
  .detail-table {
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
      height: 40px;
      text-align: center;
      line-height: 40px;
      border-right: 1px solid #f5f5f5;
      font-size: 14px;
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
}
</style>