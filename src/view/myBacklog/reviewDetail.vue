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
        <el-col :span="4">
          <el-select size="mini" v-model="rtfState" placeholder="请选择审批结果" @change="changeSelect">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">拒绝码</el-col>
        <el-col :span="4">
          <el-select
            size="mini"
            v-model="refuseCode"
            placeholder="请选择拒绝码"
            :disabled="rtfState=='Pass'?true:false"
          >
            <el-option
              v-for="item in refuse"
              :key="item.value"
              :label="item.desc"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <!-- 二级拒绝原因 -->
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </div>
    <el-row type="flex" justify="center" class="comfirmButton">
      <el-button type="primary" size="mini" @click="submit">提交</el-button>
    </el-row>
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
      data: {},
      rtfState: "",
      refuseCode: "",
      options: [
        {
          value: "Pass",
          label: "通过"
        },
        {
          value: "Reject",
          label: "拒绝"
        }
      ],
      refuse: [],
      queryData: {}
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    var data = {
      processNo: this.$route.query.processNo
    };
    this.queryData = this.$route.query;
    var userId = sessionStorage.getItem("userId");
    Object.assign(this.queryData, { userId: userId });
    this.load(data);
    this.loadRefuse();
  },

  methods: {
    changeSelect(event) {
      if (event == "Pass") {
        this.refuseCode = "";
      } else {
        this.rtfState = event;
      }
    },
    submit() {
      if (this.rtfState.length == 0) {
        this.$message({
          message: "请选择审核结果",
          type: "error"
        });
        return;
      }
      if (this.rtfState == "Reject") {
        if (this.refuseCode.length == 0) {
          this.$message({
            message: "请选择拒绝码",
            type: "error"
          });
          return;
        }
        var data = {
          rtfState: this.rtfState,
          refuseCode: this.refuseCode
        };
      } else {
        var data = {
          rtfState: this.rtfState
        };
      }
      this.submitNext(data);
    },
    submitNext(data) {
      Object.assign(data, this.queryData);
      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/manage/task/complete",
        data: data
      }).then(
        response => {
          var res = response.data;
          console.log("res", res);
          if (res.code == 0) {
            console.log(res);
            this.$message({
              message: res.detail.result,
              duration: 1000,
              type: "success"
            });
            this.$router.back(-1);
          } 
        },
        error => {}
      );
    },
    loadRefuse() {
      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/manage/refuseCode",
        data: {}
      }).then(
        response => {
          var res = response.data;
          if (res.code == 0) {
            this.refuse = res.detail.result;
          }
        },
        error => {}
      );
    },
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
}
</style>