<template>
  <div class="page-loanList">
    <el-card>
      <el-form :model="searchform" ref="searchform" label-width="100px">
        <el-row type="flex" class="human-form">
          <el-col :span="6">
            <el-form-item label="申请主体" prop="channelCd">
              <el-input size="mini" v-model.trim="searchform.channelCd"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="案件号" prop="processNo">
              <el-input size="mini" v-model.trim="searchform.processNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="放款状态" prop="status">
              <el-select size="mini" v-model="searchform.status" placeholder="请选择放款状态">
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
            <el-form-item label="放款日期" prop="beginDate">
              <el-date-picker
                size="mini"
                v-model="searchform.beginDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择开始日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="至" prop="endDate">
              <el-date-picker
                value-format="yyyy-MM-dd"
                size="mini"
                v-model="searchform.endDate"
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
    <el-card class="loanList-table">
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
        <el-table-column prop="processNo" label="案件编号" align="center"></el-table-column>
        <el-table-column prop="channelCd" label="申请主体" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="godetail(scope.row.processNo,scope.row.channelCode)"
            >{{scope.row.channelCd}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="loanInitPrin" label="放款金额（元）" align="center"></el-table-column>
        <el-table-column prop="month" label="借款期限（天）" align="center"></el-table-column>
        <el-table-column prop="status" label="放款状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">已签约</span>
            <span v-if="scope.row.status == 2">放款中</span>
            <span v-if="scope.row.status == 3">放款失败</span>
            <span v-if="scope.row.status == 4">还款中</span>
            <span v-if="scope.row.status == 5">还款失败</span>
            <span v-if="scope.row.status == 6">已逾期</span>
            <span v-if="scope.row.status == 7">已结清</span>
            <span v-if="scope.row.status == 8">放款异常</span>
          </template>
        </el-table-column>
        <el-table-column prop="borrowTime" label="放款时间" align="center"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="loanList-pagination">
        <el-pagination
          background
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
      options: [
        {
          value: 1,
          label: "已签约"
        },
        {
          value: 2,
          label: "放款中"
        },
        {
          value: 3,
          label: "放款失败"
        },
        {
          value: 4,
          label: "还款中"
        },
        {
          value: 5,
          label: "还款失败"
        },
        {
          value: 6,
          label: "已逾期"
        },
        {
          value: 7,
          label: "已结清"
        },
        {
          value: 8,
          label: "放款异常"
        }
      ],
      count: 0, //总信息数
      searchform: {
        channelCd: "",
        processNo: "",
        status: "",
        beginDate: "", //申请开始时间
        endDate: "", //至
        pageIndex: 1, //初始页
        pageSize: 50 //显示当前行的条数
      },
      tableData: []
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    var data = {};
    this.load(data);
  },

  methods: {
    submitForm() {
      this.load(this.searchform);
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
      this.load(this.searchform);
    },

    // 初始页currentPage
    handleCurrentChange(pindex) {
      this.searchform.pageIndex = pindex;
      this.load(this.searchform);
    },
    godetail(processNo, channelCode) {
      this.$router.push({
        path: "/caseManagement/caseDetail",
        query: {
          processNo: processNo
        }
      });
    },
    //初始化
    load(data) {
      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/manage/msloanlist",
        data: data
      }).then(
        response => {
          var res = response.data;
          if (res.code == 0) {
            this.tableData = res.detail.result.pageList;
            this.count = res.detail.result.count;
            this.searchform.pageIndex = res.detail.result.pageIndex;
            this.searchform.pageSize = res.detail.result.pageSize;
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
.page-loanList {
  .loanList-table {
    margin-top: 40px;
  }
  .loanList-pagination {
    margin-top: 30px;
  }
}
</style>