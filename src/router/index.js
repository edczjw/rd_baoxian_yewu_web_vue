import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/1111s',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      // 登录
      path: '/login',
      name: '登录',
      component: require('../view/login/login.vue').default,
    },{
      // 主页
      path: '/home',
      name: '空白主页',
      component: require('../view/index/index.vue').default,
      // 含有文件夹的文件children
      children:[{
        // 主题home
          path: '/mshome',
          name: '主题主页',
          component: require('../view/index/home.vue').default,
          meta: {
            requireAuth: true
          }
        }]
      }]
})
