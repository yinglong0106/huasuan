<template>
  <div class="enterpriseDetails">
        <Re :title="title"></Re>
    <!-- 头像名字 -->
    <div class="head">
      <img v-if="shopInfo" :src="shopInfo.imageUrl" class="head_left">
      <div class="head_right">
        <span class="one">{{shopInfo.shop_name}}</span>
        <span class="two">企业号：{{shopInfo.id}}</span>
        <span class="three">{{shopInfo.guimo}}</span>
        <div class="four">{{shopInfo.type_name}}</div>
      </div>
    </div>
    <!-- 关注 -->
    <div class="gz" @click="follow" >
      <div v-if="!shopInfo.is_focus" style="display:flex;align-items:center;justify-content:center;"><i>+</i><span>关注</span></div>
      <div v-else style="display:flex;align-items:center;justify-content:center;"><span>已关注</span></div>
    </div>
    <!--线  -->
    <h1></h1>
    <!-- 获赞关注粉丝次数 -->
    <h2>
      <!-- <span>获赞 388</span> -->
      <span>关注 {{shopInfo.befollow_number}}</span>
      <!-- <span  @click="fans">粉丝 388</span> -->
    </h2>
    <!-- 分类 --> 
    <h3>
      <span :class="{active: active == 0}" @click="active = 0">作品{{shopInfo.list.length}}</span>
      <!-- <span :class="{active: active == 1}" @click="active = 1">圈子126</span>
      <span :class="{active: active == 2}" @click="active = 2">喜欢123</span> -->
    </h3>
    <!-- 内容 -->
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <img :src="item.img_url" alt="" class="bg"/>
          <div>
            <img src="../../static/img/yan.png" alt="" class="yan"/>
            <span>{{item.focus_number}}</span>
          </div>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
import Re from '@/components/return'
import apiRequest from '@/library/apiRequest'
export default {
  name: 'enterpriseDetails',
  components: {
    Re
  },
  data () {
    return {
      active: 0,
      title: '企业详情',
      shop_id:'',//企业id
      shopInfo:null,  //企业信息
      list: null,//企业作品列表
      allLoaded:false,  //可以上拉加载标志
      page:1,  //当前页数
      rows:5  //每页列表数量
    }
  },
  created () {
    console.log(this.$route.query.id)
    var that = this
    that.initData()

  },
  methods: {
    //加载更多
    loadBottom(){
      var that = this
      that.page++
      apiRequest.post('/index.php',{c: 'Home', action: 'shopWorkList', rows:that.rows,page:that.page,shop_id:that.$route.query.id},function(res){
          // that.list = res.result
          that.list = that.list.concat(res.result)
          
      })
      this.$refs.loadmore.onBottomLoaded();
    },
    //初始化数据
    initData(){
      var that = this,url = location.href
      console.log("企业id")
      console.log(that.$route.query.id)
      apiRequest.post('/index.php',{c: 'Home', action: 'enterpriseDetail', uid: that.$local.uid,link_url:url,shop_id:that.$route.query.id},function(res){
          // that.list = res.result
          console.log("获取企业详情初始数据")
          console.log(res)
          that.shopInfo = res.result
          that.list = res.result.list
          
      })
    },

    //点击关注
    follow () {
      var that = this
      console.log("点击关注")
      apiRequest.post('/index.php',{c: 'User', action: 'follow', uid: that.$local.uid,focus_id:that.$route.query.id,focus_type:2},function(res){
          // that.list = res.result
          console.log("关注企业")
          console.log(res)
          that.shopInfo.is_focus = !that.shopInfo.is_focus
      },false)
    },

    //点击成为粉丝
    // fans () {
    //   this.$router.push({path: '/myFans'})
    // }
  }
}
</script>

<style lang="less" scoped>

.enterpriseDetails {
  overflow-y: auto;
  // 头像名字
  .mint-loadmore-content{
      color:#fff !important;
    }
  .head{
    width: 6.9rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: .6rem .3rem .5rem;
    .head_left{
      width: 1.66rem;
      height: 1.66rem;
      border-radius: 50%;
    }
    .head_right{
      display: flex;
      flex-direction: column;
      .one{
        color: #fff;
        font-size: .25rem;
        width: 12em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .two{
        margin-top: .1rem;
        color: #fff;
        font-size: .22rem;
      }
      .three{
        text-align: center;
        width: 7em;
        margin-top: .1rem;
        border-radius: .05rem;
        background: #9980a5;
        padding: .03rem .05rem;
        color: #fff;
        font-size: .22rem;
      }
      .four{
        text-align: center;
        margin-top: .14rem;
        border-radius: .05rem;
        background: #9980a5;
        padding: .05rem .05rem;
        font-size: .22rem;
        color: #fff;
         width: 12em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  // 关注
  .gz{
    margin-left: .4rem;
    width: 1.66rem;
    height: .66rem;
    background: #ff0042;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: .1rem;
    i{
      display: flex;
      font-size: .56rem;
      color: #fff;
      margin-right: .1rem;
      margin-bottom: .002rem;
    }
    span{
      display: flex;
      font-size: .32rem;
      color: #fff;
    }
  }
  // 线
  h1{
    width: 6.9rem;
    height: .02rem;
    background: #fff;
    margin: .24rem .3rem .5rem;
  }
  // 获赞关注粉丝次数
  h2{
    display: flex;
    align-items: center;
    margin-left: .3rem;
    span{
      color: #fff;
      font-size: .29rem;
      padding-right: .27rem;
    }
  }
  // 分类
  h3{
    width: 6.9rem;
    margin: .6rem .3rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span{
      display: flex;
      justify-content: center;
      font-size: .3rem;
      color: #fff;
      width: 1.92rem;
      padding-bottom: .3rem;
      border-bottom: .05rem solid transparent;
    }
    .active{
      border-bottom: .05rem solid #ff0042;
    }
  }
  // 内容
  ul{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    margin-bottom: .1rem;
    li{
      width: 2.46rem;
      border: .02rem solid #fff;
      height: 3.28rem;
      position: relative;
      .bg{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
      div{
        position: absolute;
        bottom: .12rem;
        left: .1rem;
        display: flex;
        align-items: center;
        img{
          width: .2rem;
          height: .14rem;
          margin-right: .07rem;
        }
        span{
          font-size: .15rem;
          color: #fff;
        }
      }
    }
  }
}
</style>
