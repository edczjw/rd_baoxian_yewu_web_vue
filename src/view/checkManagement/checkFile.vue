<template>
  <div class="page-human">
    <el-card>
      <el-form :model="searchform" ref="searchform" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="选择报表日期" prop="beginDate">
              <el-date-picker
                size="mini"
                v-model="searchform.beginDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择开始日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="至" prop="endDate">
              <el-date-picker
                size="mini"
                v-model="searchform.endDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button size="mini" type="primary" @click="createForm()">生成</el-button>
              <el-button size="mini" type="primary" @click="submitForm()">查询</el-button>
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
        <el-table-column prop="fileName" label="文件名称" align="center"></el-table-column>
        <el-table-column prop="createTime" label="生成时间" align="center"></el-table-column>
        <el-table-column prop label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click="download(scope.row.downloadUrl,scope.row.fileName,scope.row.createTime)"
              type="text"
              size="small"
            >下载</el-button>
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
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      count: 0,
      searchform: {
        beginDate: "",
        endDate: "",
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
    // var data = {};
    // this.load(data);
  },

  methods: {
    submitForm() {
      if (this.requireTime()) {
        this.load(this.searchform);
      }
    },
    handleSizeChange(psize) {
      // 改变每页显示的条数
      this.searchform.pageSize = psize;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.searchform.pageIndex = 1;
      if (this.requireTime()) {
        this.load(this.searchform);
      }
    },
    requireTime() {
      if (
        this.searchform.beginDate.length == 0 ||
        this.searchform.endDate.length == 0
      ) {
        this.$message({
          message: "请先选择报表日期",
          type: "error"
        });
        return false;
      } else {
        return true;
      }
    },
    // 初始页currentPage
    handleCurrentChange(pindex) {
      this.searchform.pageIndex = pindex;
      if (this.requireTime()) {
        this.load(this.searchform);
      }
    },
    createForm() {
      if (
        this.searchform.beginDate.length == 0 ||
        this.searchform.endDate.length == 0
      ) {
        this.$message({
          message: "请先选择报表日期",
          type: "error"
        });
        return;
      }
      var data = {
        beginDate: this.searchform.beginDate,
        endDate: this.searchform.endDate
      };
      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/manage/createReport",
        data: data
      }).then(
        response => {
          var res = response.data;
          if (res.code == 0) {
            this.$message({
              message: res.detail.result,
              type: "success"
            });
          }else if(res.code == 10){
            this.$message({
              message:res.msg,
              type:'error'
            })
            this.$router.push('/login')
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        },
        error => {}
      );
    },
    download(path, filename, time) {
      let data = {
        filePath: path
      };
      const url = this.$store.state.domain + "/manage/download";
      this.$http
        .post(url, data, {
          responseType: "blob",
          emulateJSON: true
        })
        .then(res => {
          let blob = new Blob([res.data], {
            type:
              "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          });
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob);
          } else {
            let elink = document.createElement("a");
            elink.download = time + filename + ".xls";
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            document.body.removeChild(elink);
          }
        })
        .catch(err => {
          console.warn(err);
        });
    },
    //表单操作
    // handleClick(filePath) {
    //   this.$axios({
    //     method: "post",
    //     url: this.$store.state.domain + "/manage/download",
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    //     },
    //     responseType: "blob",
    //     params: {
    //       filePath: filePath
    //     }
    //   }).then(
    //     res => {
    //       let blob = new Blob([res.data], {
    //         type: "application/vnd.ms-excel;charset=utf-8"
    //       });
    //       let url = window.URL.createObjectURL(blob);
    //       let aLink = document.createElement("a");
    //       aLink.style.display = "none";
    //       aLink.href = url;
    //       aLink.setAttribute("download", "excel.xlsx");
    //       document.body.appendChild(aLink);
    //       aLink.click();
    //       document.body.removeChild(aLink);
    //       window.URL.revokeObjectURL(url);
    //     },
    //     error => {}
    //   );
    // },
    //初始化
    load(data) {
      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/manage/getReport",
        data: data
      }).then(
        response => {
          var res = response.data;
          if (res.code == 0) {
            this.tableData = [];
            console.log("res", res);
            // this.tableData.push(res.detail.result);
            this.tableData = res.detail.result.pageList;
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