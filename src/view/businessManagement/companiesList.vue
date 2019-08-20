<template>
  <div class="page-companiesList">
    <el-card class="companiesList-table">
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
        <el-table-column prop="channelCd" label="企业编号" align="center"></el-table-column>
        <el-table-column prop="applySubject" label="申请主体" align="center"></el-table-column>
        <el-table-column prop="creditLimit" label="授信额度（元）" align="center"></el-table-column>
        <el-table-column prop="availableCredit" label="当前可用额度（元）" align="center"></el-table-column>
        <el-table-column prop="creditTerm" label="授信期限（天）" align="center"></el-table-column>
        <el-table-column prop="ctime" label="注册时间" align="center"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="companiesList-pagination">
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
      count: 0, //总信息数
      searchform: {
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
    var data = {
      pageIndex: this.searchform.pageIndex,
      pageSize: this.searchform.pageSize
    };
    this.load(data);
  },

  methods: {
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
      // this.search();
      this.load(this.searchform);
    },
    //初始化
    load(data) {
      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/manage/channelInfo",
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
.page-companiesList {
  .companiesList-table {
    margin-top: 40px;
  }
  .companiesList-pagination {
    margin-top: 30px;
  }
}
</style>