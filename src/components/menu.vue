<template>
  <!-- template必须包裹一个div，否则会报错 -->
  <div class="side" :class="{'side-menu' : this.$store.state.isLeftHiden}">
    <el-row>
      <el-col>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#666"
          text-color="#fff"
          active-text-color="#EEDC82"
          unique-opened
          :collapse="this.$store.state.isLeftHiden"
        >
          <el-submenu index="1">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-qiyeguanli"></use>
              </svg>
              <span>企业管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/businessManagement/companiesList">
                <el-menu-item index="1-1">企业列表</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-anjianguanli"></use>
              </svg>
              <span>案件管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/caseManagement/caseListing">
                <el-menu-item index="2-1">案件清单</el-menu-item>
              </router-link>
              <!-- <router-link to="/caseManagement/caseListingtese">
                <el-menu-item index="2-2">案件清单测试</el-menu-item>
              </router-link>-->
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-wodedaiban"></use>
              </svg>
              <span>我的待办</span>
            </template>
            <el-menu-item-group>
              <router-link to="/myBacklog/humanReview">
                <el-menu-item index="3-1">人工审核</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-wodedaiban"></use>
              </svg>
              <span>放款记录</span>
            </template>
            <el-menu-item-group>
              <router-link to="/recordLending/loanList">
                <el-menu-item index="4-1">放款列表</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-hetongxinxiguanli"></use>
              </svg>
              <span>合同信息</span>
            </template>
            <el-menu-item-group>
              <router-link to="/contractInformation/contractList">
                <el-menu-item index="5-1">合同列表</el-menu-item>
              </router-link>
              <router-link to="/contractInformation/warehouseContract">
                <el-menu-item index="5-2">在库合约</el-menu-item>
              </router-link>
              <router-link to="/contractInformation/settleContract">
                <el-menu-item index="5-3">结清合约</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shenhe"></use>
              </svg>
              <span>还款审核</span>
            </template>
            <el-menu-item-group>
              <router-link to="/repaymentReview/repaymentRecord">
                <el-menu-item index="6-1">还款记录</el-menu-item>
              </router-link>
              <router-link to="/repaymentReview/entryAudit">
                <el-menu-item index="6-2">入账审核</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-duizhangzhongxin"></use>
              </svg>
              <span>对账管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/checkManagement/checkFile">
                <el-menu-item index="7-1">对账文件</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped  lang="less">
.el-menu {
  /* important的意义在于优先于它内部定义的样式 */
  margin: -0.9px !important;
  border-color: rgb(211, 212, 212);
  background-color: #666;
  border-right: none;
  /* background: #108dc6; */
  /deep/ .el-submenu__title i {
    color: #fff;
  }
  /deep/ .el-submenu .el-menu-item {
    min-width: 198px;
  }
}

/* 菜单 */
.side {
  position: fixed;

  width: 199px;
  height: 100%;
  transition: all 0.5s;
  /* background-color: rgb(211, 212, 212); */
  background: #666;
  // border: 1px solid rgb(211, 212, 212);
}

.side-menu {
  width: 64px;
  transition: all 0.5s;
  /* background-color: rgb(211, 212, 212); */
  background: #666;
}

.el-menu-item-group {
  text-align: center;
}
svg {
  width: 32px;
  height: 32px;
  padding: 1px 6px;
}
</style>