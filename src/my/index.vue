<template>
  <div class="my">
    <!-- 头像名字 -->
    <div class="head">
      <img :src="imageUrl" class="head_left">
      <div class="head_right">
        <span class="one">{{nikeName}}</span>
        <span class="two">划算号：{{id}}</span>
        <!-- <div class="three">
          <div class="three_left"><img :src="sex=='男'?'../../static/img/my_man.png':'../../static/img/my_woman.png'" alt=""><span>{{age}}岁</span></div>
          <div class="three_right"><span>{{City}}</span></div>
        </div> -->
      </div>
    </div>
    <!-- 关注购物车等 -->
    <div class="head_com">
      <div class="one" v-if="userType != 'user'" @click="guanzhu">
        <img v-if="!isFollow" src="../../static/img/my_sc.png" alt="">
        <span>{{isFollow?'已关注':'关注'}}</span>
      </div>
      <!-- <div class="two">
        <img src="../../static/img/my_car.png" alt="" class="my_car">
      </div> -->
      <!-- <div class="two" @click="footprint">
        <img src="../../static/img/my_zj.png" alt="" class="my_zj">
      </div> -->
      <div class="two" @click="money"  v-if="userType == 'user'">
        <img src="../../static/img/money.png" alt="" class="my_money">
      </div>
      <div class="two" @click="code"  v-if="userType == 'user'">
        <img src="../../static/img/my_code.png" alt="" class="my_code">
      </div>
    </div>
    <!--线  -->
    <h1></h1>
    <!-- 获赞关注粉丝次数 -->
    <h2>
      <span>获赞 {{like_number}}</span>
      <span @click="follow">关注 {{follow_number}}</span>
      <!-- <span  @click="fans">粉丝 {{befollow_number}}</span> -->
    </h2>
    <!-- 分类 -->
    <h3>
      <span :class="{active: active == 0}" @click="active = 0">作品{{mywork.length}}</span>
      <!-- <span :class="{active: active == 1}" @click="active = 1">圈子126</span> -->
      <span :class="{active: active == 2}" @click="active = 2">喜欢{{myfocus.length}}</span>
    </h3>
    <!-- 内容 -->
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" style="color:#fff !important;">
      <ul wx:if="proList">
        <li v-for="(item,index) in proList" :key="index" @click="toDetail(item)">
          <img :src="item.img_url" alt="" class="bg"/>
          <div>
            <img src="../../static/img/yan.png" alt="" class="yan"/>
            <span>{{item.focus_number}}</span>
          </div>
        </li>
      </ul>
    </mt-loadmore>
    <div class="kong"></div>
    <BNai :idx="4"></BNai>
  </div>
</template>

<script>
import BNai from '@/components/BottomNav'
import apiRequest from '@/library/apiRequest'
import { Toast } from 'mint-ui';
export default {
  name: 'my',
  components: {
    BNai
  },
  data () {
    return {
      active: 0,
      id: '',
      imageUrl: '',
      nikeName: '',
      age: '',
      sex: '',
      City: '',
      follow_number: '',
      befollow_number: '',
      like_number: '',
      mywork:null, //作品
      myfocus:null, //我的关注
      proList:null, //要渲染的作品
      userType:null,//是自己的个人中心还是别人的个人中心
      detail_id	:'', //要被查看的会员id
      action:'',
      isFollow:false, //是否已关注该用户
      allLoaded:false  //可以下拉标志
    }
  },
  created () {
    console.log("个人中心的query")
    console.log(location.href)
    console.log(this.$route.query)
    var url = location.href,that = this
    this.userType = this.$route.query.user

    if(this.$route.query.user == 'other'){
      this.detail_id = this.$route.query.id
    }
    this.axios
      .post('/index.php', this.qs.stringify({c: 'User', action: this.$route.query.user == 'user'?'index':"detail", link_url: url, uid:this.$local.uid,detail_id:that.detail_id}))
      .then(
        (d) => {
          console.log("个人中心初始化信息")
          console.log({c: 'User', action: that.$route.query.user == 'user'?'index':"detail", link_url: url, uid:this.$local.uid,detail_id:that.detail_id})
          console.log(d.data)
          if(that.$route.query.user == 'user'){
            this.id = d.data.result.uInfo.id
            this.nikeName = d.data.result.uInfo.nikeName
            this.imageUrl = d.data.result.uInfo.imageUrl
            this.age = d.data.result.uInfo.age?d.data.result.uInfo.age:0
            this.City = d.data.result.uInfo.City
            this.sex = d.data.result.uInfo.sex
            this.follow_number = d.data.result.uInfo.follow_number //我的关注数量
            this.befollow_number = d.data.result.uInfo.befollow_number //我被关注的数量
            this.like_number = d.data.result.uInfo.like_number  //被点赞数量
            this.proList = this.active == 0?d.data.result.mywork:d.data.result.myfocus
            this.mywork = d.data.result.mywork?d.data.result.mywork:[]
            this.myfocus = d.data.result.myfocus?d.data.result.myfocus:[]
          }else{
            this.id = d.data.result.userInfo.id
            this.nikeName = d.data.result.userInfo.nikeName
            this.imageUrl = d.data.result.userInfo.imageUrl
            this.age = d.data.result.userInfo.age?d.data.result.userInfo.age:0
            this.City = d.data.result.userInfo.City
            this.sex = d.data.result.userInfo.sex
            this.follow_number = d.data.result.userInfo.follow_number //我的关注数量
            this.befollow_number = d.data.result.userInfo.befollow_number //我被关注的数量
            this.like_number = d.data.result.userInfo.like_number  //被点赞数量
            this.proList = this.active == 0?d.data.result.userWork:d.data.result.userFocus
            this.mywork = d.data.result.mywork?d.data.result.userWork:[]
            this.myfocus = d.data.result.myfocus?d.data.result.userFocus:[],
            this.isFollow = d.data.result.isFollow
          }
        }
      )
      .catch(
        (err) => {
          if (err.response) {
            console.log(err.response)
            // 控制台打印错误返回的内容
          }
        }
      )
  },
  watch:{
    active(newVal,oldVal){
      var that = this     
      that.proList = that.active == 0?that.mywork:that.myfocus
    }
  },
  methods: {
    //加载更多
    loadBottom(){
      var that = this
      that.page++
      apiRequest.post('/index.php',{c: 'User', action: 'userWorkList', uid: that.$local.uid,rows:that.rows,page:that.page},function(res){
              console.log("我的关注")
              console.log(res)
              if(that.page == 1){
                that.list = res.result
              }else{
                that.list = that.list.concat(res.result)
              }
            
          })
      this.$refs.loadmore.onBottomLoaded();
    },
    follow () {
      this.$router.push({path: '/myFollow'})
    },
    fans () {
      this.$router.push({path: '/myFans'})
    },
    footprint () {
      this.$router.push({path: '/myFootprint'})
    },
    money () {
      this.$router.push({path: '/myMoney'})
    },
    code () {
      this.$router.push({path: '/myCode'})
    },

    //点击关注该用户
    guanzhu(){
      var that = this
        apiRequest.post('/index.php',{c: 'User', action: 'follow', uid: that.$local.uid,focus_id:that.detail_id,focus_type:1},function(res){
            console.log("关注")
            console.log(res)
            that.isFollow = !that.isFollow
        })
    },

    //前往作品详情
    toDetail(item){
      console.log(item)
      if(this.userType == 'user'&&this.active == 0){
         this.$router.push({name:'detail',params:{id:item.id}})
      }
     
    }
  }
}
</script>

<style lang="less" scoped>

.my {
  overflow-y: auto;
  .mint-loadmore-content{
    color:#fff !important;
  }
  // 头像名字
  .head{
    width: 6.9rem;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    margin: 1.1rem .3rem .5rem;
    .head_left{
      width: 1.66rem;
      height: 1.66rem;
      border-radius: 50%;
    }
    .head_right{
      display: flex;
      padding-left:15px;
      flex-direction: column;
      width: 65%;
      .one{
        color: #fff;
        font-size: .45rem;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .two{
        color: #fff;
        font-size: .22rem;
      }
      .three{
        margin-top: .08rem;
        display: flex;
        align-items: center;
        .three_left{
          width: 1rem;
          height: .33rem;
          border-radius: .05rem;
          display: flex;
          align-items: center;
          background: #9980a5;
          justify-content: center;
          img{
            width: .16rem;
            height: .16rem;
            margin-right: .16rem;
          }
          span{
            color: #fff;
            font-size: .2rem;
          }
        }
        .three_right{
          background: #9980a5;
          width: 1rem;
          height: .33rem;
          border-radius: .05rem;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: .32rem;
          span{
            color: #fff;
            font-size: .2rem;
            width: 4em;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  // 关注购物车等
  .head_com{
    display: flex;
    align-items: center;
    margin-left: .35rem;
    .one{
      width: 1.66rem;
      height: .66rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #9980a5;
      border-radius: .05rem;
      margin-right: .1rem;
      img{
        width: .36rem;
        height: .36rem;
        margin-right: .2rem;
      }
      span{
        color: #fff;
        font-size: .27rem;
      }
    }
    .two{
      width: .66rem;
      height: .66rem;
      background: #9980a5;
      border-radius: .05rem;
      margin-right: .1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .my_car{
        width: .36rem;
        height: .32rem;
      }
      .my_zj{
        width: .28rem;
        height: .38rem;
      }
      .my_money{
        width: .33rem;
        height: .32rem;
      }
      .my_code{
        width: .31rem;
        height: .31rem;
      }
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
    margin-bottom: 1rem;
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
  // 块
  .kong{
    width: 100%;
    height: .9rem;
    background: #32004b;
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>
