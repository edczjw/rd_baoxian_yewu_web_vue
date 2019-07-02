import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      // 登录
      path: '/login',
      name: '登录',
      component: require('../view/login/login.vue').default,
    },
    {
      // 主页
      path: '/home',
      name: '空白主页',
      component: require('../view/index/index.vue').default,
      // 含有文件夹的文件children
      children: [{
        // 主题home
        path: '/mshome',
        name: '主题主页',
        component: require('../view/index/home.vue').default,
        meta: {
          requireAuth: true
        }
      },
      {
        // 修改密码
        path: '/changePassword',
        name: '修改密码',
        component: require('../view/changePassword/changePassword.vue').default,
      },
      {
        // 我的待办->人工审核
        path: '/myBacklog/humanReview',
        name: '人工审核',
        component: require('../view/myBacklog/humanReview.vue').default,
      },
      {
        // 我的待办->人工审核->人工审核详情
        path: '/myBacklog/reviewDetail',
        name: '人工审核详情',
        component: require('../view/myBacklog/reviewDetail.vue').default,
      },


      {
        // 企业管理->企业列表
        path: '/businessManagement/companiesList',
        name: '企业列表',
        component: require('../view/businessManagement/companiesList.vue').default,
      },
      {
        // 案件管理->案件清单
        path: '/caseManagement/caseListing',
        name: '案件清单',
        component: require('../view/caseManagement/caseListing.vue').default,
      },
      {
        // 案件管理->案件清单->案件清单详情
        path: '/caseManagement/caseDetail',
        name: '案件清单详情',
        component: require('../view/caseManagement/caseDetail.vue').default,
      },
      {
        // 放款记录->放款列表
        path: '/recordLending/loanList',
        name: '放款列表',
        component: require('../view/recordLending/loanList.vue').default,
      },
      {
        // 合同信息->合同列表
        path: '/contractInformation/contractList',
        name: '合同列表',
        component: require('../view/contractInformation/contractList.vue').default,
      },
      {
        // 合同信息->合同列表->合同列表详情
        path: '/contractInformation/contractDetail',
        name: '合同列表详情',
        component: require('../view/contractInformation/contractDetail.vue').default,
      },
      {
        // 合同信息->结清合约
        path: '/contractInformation/warehouseContract',
        name: '结清合约',
        component: require('../view/contractInformation/warehouseContract.vue').default,
      },
      {
        // 合同信息->在库合约
        path: '/contractInformation/settleContract',
        name: '在库合约',
        component: require('../view/contractInformation/settleContract.vue').default,
      },
      {
        // 还款审核->还款记录
        path: '/repaymentReview/repaymentRecord',
        name: '还款记录',
        component: require('../view/repaymentReview/repaymentRecord.vue').default,
      },
      {
        // 还款审核->还款审核
        path: '/repaymentReview/repaymentReview',
        name: '还款审核',
        component: require('../view/repaymentReview/repaymentReview.vue').default,
      },
      {
        // 还款审核->入账审核
        path: '/repaymentReview/entryAudit',
        name: '入账审核',
        component: require('../view/repaymentReview/entryAudit.vue').default,
      },
      {
        // 还款审核->还款入账确认
        path: '/repaymentReview/reviewDetail',
        name: '还款入账确认',
        component: require('../view/repaymentReview/reviewDetail.vue').default,
      },
      {
        // 对账管理->对账文件
        path: '/checkManagement/checkFile',
        name: '对账文件',
        component: require('../view/checkManagement/checkFile.vue').default,
      },
      ]
    }]
})
