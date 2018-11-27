<template>
  <div class="my-follow">
    <Re :title="title"></Re>
    <!-- 分类 -->
    <h3>
      <span :class="{active: focus_type == 1}" @click="secTap(1)">个人</span>
      <span :class="{active: focus_type == 2}" @click="secTap(2)">企业</span>
    </h3>
    <!-- 线 -->
    <h1></h1>
    <!-- 内容 -->
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="toDetail(item)">
          <img :src="item.imageUrl" alt="" class="left">
          <div class="con">
            <span>{{item.realName}}</span>
            <!-- <div>
              <img src="../../static/img/my_man.png" alt=""><i>18岁</i>
            </div> -->
            <i>福建 厦门</i>
          </div>
          <img src="../../static/img/b.png" alt="" class="right">
        </li>
      </ul>
    </mt-loadmore>


     
  </div>
   

</template>

<script>
import {Loadmore } from 'mint-ui';
import Re from '@/components/return'
import apiRequest from '@/library/apiRequest'
import { Toast } from 'mint-ui';
export default {
  name: 'my-follow',
  components: {
    Re
  },
  data () {
    return {
      title: ' 我的关注',
      rows:10,//每页请求的数量
      page:1,  //当前请求的页数
      focus_type:1, //关注类型,1为会员,2为企业 
      list:[],
      allLoaded:false
    }
  },
  mounted(){
    var that = this
    this.initData()
  },
  methods:{
    //加载更多
    loadBottom(){
      var that = this
      that.page++
      that.initData()
      this.$refs.loadmore.onBottomLoaded();
    },
    //初始化数据
    initData(){
      console.log("关注页面")
      var that = this
      console.log({c: 'User', action: 'myFollow', uid: that.$local.uid,rows:that.rows,page:that.page,focus_type:that.focus_type})
      apiRequest.post('/index.php',{c: 'User', action: 'myFollow', uid: that.$local.uid,rows:that.rows,page:that.page,focus_type:that.focus_type},function(res){
            console.log("我的关注")
            console.log(res)
            if(that.page == 1){
               that.list = res.result
            }else{
              that.list = that.list.concat(res.result)
            }
           
        })
    },

    //导航栏切换
    secTap(num){
      console.log(2)
      if(this.focus_type != num){
        this.focus_type = num
        this.list = []
        this.page = 1
        this.initData()
      }
    },

    //跳转相关的企业详情和个人信息
    toDetail(item){
      var that = this
      console.log(item)
      if(this.focus_type==1){
        //会员
        this.$router.push({path: '/my',
          query: {
            user: 'other',
            id:item.id
          }
        })
      }else{
        //企业
        this.$router.push({path: '/enterpriseDetails',
          query: {
            id: item.id
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>

.my-follow {
  overflow-y: auto;
  // 分类
  .mint-loadmore-content{
    color:#fff !important;
  }
  h3{
    width: 70%;
    margin: .2rem auto 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span{
      display: flex;
      justify-content: center;
      font-size: .3rem;
      color: #fff;
      width: 1.92rem;
      padding-bottom: .16rem;
      border-bottom: .04rem solid transparent;
    }
    .active{
      border-bottom: .04rem solid #ff0042;
    }
  }
  // 线
  h1{
    width: 100%;
    height: .02rem;
    background: #fff;
  }
  // 内容
  ul{
    width: 100%;
    margin-top: .2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    li{
      width: 6.9rem;
      margin: .0 .3rem 0.4rem;
      display: flex;
      align-items: center;
      .left{
        width: 1.32rem;
        height: 1.32rem;
        margin-right: .2rem;
      }
      .right{
        margin-left: auto;
        width: .36rem;
        height: .36rem;
      }
      .con{
        display: flex;
        flex-direction: column;
        height: 1.32rem;
        justify-content: space-between;
        span{
          color: #fff;
          font-size: .25rem;
          display: flex;
        }
        div{
          display: flex;
          align-items: center;
          margin: .05rem 0;
          img{
            width: .16rem;
            height: .16rem;
            margin-right: .08rem;
          }
          i{
            font-size: .2rem;
            color: #784f8d;
          }
        }
        i{
          display: flex;
          font-size: .2rem;
          color: #784f8d;
        }
      }
    }
  }
}
</style>
