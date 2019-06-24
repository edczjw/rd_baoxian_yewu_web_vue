<template>
<!-- template必须包裹一个div，否则会报错 -->
<div class="side" :class="{'side-menu' : this.$store.state.isLeftHiden}">
   <el-row>
      <el-col>
        <el-menu default-active="1" class="el-menu-vertical-demo" background-color="rgb(211, 212, 212)" text-color="green" active-text-color="#1682c0" unique-opened
        :collapse="this.$store.state.isLeftHiden">
        
            <el-submenu index="1">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhifu"></use>
              </svg>
              <span>案件管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/zhifuguanli/fangkuanjilu">
                <el-menu-item index="1-1">案件清单</el-menu-item>
              </router-link>
              <router-link to="/zhifuguanli/huankuanjilu">
                <el-menu-item index="1-2">人工审核</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

            <el-submenu index="2">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhifu"></use>
              </svg>
              <span>放款列表</span>
            </template>
            <el-menu-item-group>
              <router-link to="/zhifuguanli/fangkuanjilu">
                <el-menu-item index="2-1">放款记录</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

            <el-submenu index="3">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhifu"></use>
              </svg>
              <span>合同信息</span>
            </template>
            <el-menu-item-group>
              <router-link to="/zhifuguanli/fangkuanjilu">
                <el-menu-item index="3-1">合同列表</el-menu-item>
              </router-link>
              <router-link to="/zhifuguanli/huankuanjilu">
                <el-menu-item index="3-2">在库合约</el-menu-item>
              </router-link>
              <router-link to="/zhifuguanli/huankuanjilu">
                <el-menu-item index="3-3">结清合约</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhifu"></use>
              </svg>
              <span>还款审核</span>
            </template>
            <el-menu-item-group>
              <router-link to="/zhifuguanli/fangkuanjilu">
                <el-menu-item index="4-1">还款记录</el-menu-item>
              </router-link>
              <router-link to="/zhifuguanli/huankuanjilu">
                <el-menu-item index="4-2">还款审核</el-menu-item>
              </router-link>
              <router-link to="/zhifuguanli/huankuanjilu">
                <el-menu-item index="4-3">入账审核</el-menu-item>
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
      return {
      };
    },
    methods: {
      
    }
  }
</script>

<style scoped  lang=less>
  .el-menu {
  /* important的意义在于优先于它内部定义的样式 */
  margin: -.9px !important;
      border-color: rgb(211, 212, 212);
      background-color: rgb(94, 108, 122);
  }

/* 菜单 */
.side {
  position: fixed;

  width: 199px;
  height: 100%;
  transition: all .5s;
  background-color: rgb(211, 212, 212);
  border:1px solid rgb(211, 212, 212);
}

.side-menu {
  width: 66px;
  transition: all .5s;
  background-color: rgb(211, 212, 212);
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