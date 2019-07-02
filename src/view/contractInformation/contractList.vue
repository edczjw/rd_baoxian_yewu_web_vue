<template>
  <div class="page-human">
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
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="签署日期" prop="beginDate">
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
                size="mini"
                v-model="searchform.endDate"
                type="date"
                value-format="yyyy-MM-dd"
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
        <el-table-column prop="processNo" label="案件编号" align="center"></el-table-column>
        <el-table-column prop="contractNo" label="合同编号" align="center"></el-table-column>
        <el-table-column v-if="false" prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status=='FC'">放款拒绝</span>
            <span v-if="scope.row.status=='FC'">放款拒绝</span>
            <span v-if="scope.row.status=='FC'">放款拒绝</span>
            <span v-if="scope.row.status=='FC'">放款拒绝</span>
            <span v-if="scope.row.status=='FC'">放款拒绝</span>
            <span v-if="scope.row.status=='FC'">放款拒绝</span>
          </template>
        </el-table-column>
        <el-table-column prop="channelCd" label="申请主体" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="godetail(scope.row.processNo,scope.row.status)"
            >{{scope.row.channelCd}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="applyLimit" label="放款金额（元）" align="center"></el-table-column>
        <el-table-column prop="applyTerm" label="借款期限（天）" align="center"></el-table-column>
        <el-table-column prop="contractTime" label="签署日期" align="center"></el-table-column>
        <el-table-column prop label="查看影像文件" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.agreementUrl && scope.row.agreementUrl.length>0">
              <template v-for="(item,index) in scope.row.agreementUrl">
                <a :href="item" target="_blank">查看</a>
              </template>
            </template>
            <!-- <el-button
              @click="handleClick(scope.row.reportName,scope.row.reportDate,scope.row.reportType)"
              type="text"
              size="small"
            >查看</el-button>-->
          </template>
        </el-table-column>
        <el-table-column prop label="查看合同" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.contractUrl && scope.row.contractUrl.length>0">
              <template v-for="(item,index) in scope.row.contractUrl">
                <a :href="item" target="_blank">查看</a>
              </template>
            </template>
            <!-- <el-button
              @click="handleClick(scope.row.reportName,scope.row.reportDate,scope.row.reportType)"
              type="text"
              size="small"
            >查看</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="human-pagination">
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
      count: 0,
      searchform: {
        channelCd: "",
        processNo: "",
        beginDate: "", //申请开始时间
        endDate: "", //至
        pageIndex: 1, //初始页
        pageSize: 50 //显示当前行的条数
      },
      tableData: [],
      text: ""
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
    //表单操作
    handleClick() {},
    godetail(processNo, status) {
      if (status == "FC") {
        this.text = "放款拒绝";
      } else if (status == "SU") {
        this.text = "签章中";
      } else if (status == "LU") {
        this.text = "放款中";
      } else if (status == "Ls") {
        this.text = "放款成功";
      } else if (status == "LF") {
        this.text = "放款失败";
      } else {
        this.text = "已还款";
      }
      this.$router.push({
        path: "/contractInformation/contractDetail",
        query: {
          processNo: processNo,
          status: this.text
        }
      });
    },

    //初始化
    load(data) {
      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/manage/Contractlist",
        data: data
      }).then(
        response => {
          var res = response.data;
          if (res.code == 0) {
            res.detail.result.pageList.forEach(data => {
              if (data.contractUrl) {
                data.contractUrl = data.contractUrl.split(",");
              }
              if (data.agreementUrl) {
                data.agreementUrl = data.agreementUrl.split(",");
              }
              this.tableData.push(data);
            });
            this.count = res.detail.result.count;
            this.searchform.pageIndex = res.detail.result.pageIndex;
            this.searchform.pageSize = res.detail.result.pageSize;
          }else if(res.code == 10){
            this.$message({
              message:res.msg,
              type:'error'
            })
            this.$router.push('/login')
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
.page-human {
  .human-table {
    margin-top: 40px;
  }
  .human-pagination {
    margin-top: 30px;
  }
}
</style>