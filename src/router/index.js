import Vue from 'vue'
import Router from 'vue-router'
import home from '@/home/index' //首页
import enterprise from '@/enterprise/index' //企业列表
import shop from '@/shop/index'
import my from '@/my/index' //个人中心
import myFollow from '@/my-follow/index' //我的关注
import myFans from '@/my-fans/index' //我的粉丝
import myFootprint from '@/my-footprint/index' //我的足迹
import myMoney from '@/my-money/index'  //我的钱包
import myCode from '@/my-code/index'  //二维码
import enterpriseDetails from '@/enterprise-details/index' //企业详情
import shopDetails from '@/shop-details/index'
import map from '@/components/map'
import moneyDetail from '@/my-moneyDetails/index' //零钱明细
import withdraw from '@/my-tixian/index' //提现记录
import detail from '@/detail/index' //作品详情
Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta:{
        title:"首页"
      }
    },
    {
      path: '/enterpriseDetails',
      name: 'enterpriseDetails',
      component: enterpriseDetails,
      meta:{
        title:'企业详情'
      }
    },
    {
      path: '/enterprise',
      name: 'enterprise',
      component: enterprise,
      meta:{
        title:'企业列表'
      }
    },
    {
      path: '/shopDetails',
      name: 'shopDetails',
      component: shopDetails
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop
    },
    {
      path: '/my',
      name: 'my',
      component: my,
      meta:{
        title:'个人中心'
      }
    },
    {
      path: '/myFollow',
      name: 'myFollow',
      component: myFollow,
      meta:{
        title:'我的关注'
      }
    },
    {
      path: '/myFans',
      name: 'myFans',
      component: myFans
    },
    {
      path: '/myFootprint',
      name: 'myFootprint',
      component: myFootprint
    },
    {
      path: '/myMoney',  
      name: 'myMoney',
      component: myMoney,
      meta:{
        title:'我的钱包'
      }
    },
    {
      path: '/myCode',
      name: 'myCode',
      component: myCode,
      meta:{
        title:'二维码'
      }
    },
    {
      path:'/map',
      name:'map',
      component:map
    },
    {
      path:'/moneyDetail',
      name:'moneyDetail',
      component:moneyDetail,
      meta:{
        title:'零钱明细'
      },
      
    },
    {
      path:'/withdraw',
      name:'withdraw',
      component:withdraw,
      meta:{
        title:'提现记录'
      },
      
    },
    {
      path:'/detail',
      name:'detail',
      component:detail,
      meta:{
        title:'作品详情'
      },
      
    },
    {
      path: '*',
      // 重定向
      redirect: '/'
    }
  ]
})

//进入页面后改变路由
router.beforeEach((to,from,next)=>{
  if(to.meta.title) {
    window.document.title = to.meta.title;
  }
  next()
})

export default router