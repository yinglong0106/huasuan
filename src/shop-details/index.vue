<template>
  <div class="enterpriseDetails">
        <Re :title="title"></Re>
    <!-- 头像名字 -->
    <div class="head">
      <img src="../../static/img/hometu.png" class="head_left">
      <div class="head_right">
        <span class="one">阿迪达斯</span>
        <span class="two">企业号：10086</span>
        <div class="con">
          <span class="three">服饰衣服</span>
          <span class="four">中国-广东</span>
        </div>
      </div>
    </div>
    <!-- 关注 -->
    <div class="gz">
      <i>+</i><span>关注</span>
    </div>
    <!--线  -->
    <h1></h1>
    <!-- 获赞关注粉丝次数 -->
    <h2>
      <span>获赞 388</span>
      <span  @click="follow">关注 388</span>
      <span  @click="fans">粉丝 388</span>
    </h2>
    <!-- 分类 -->
    <h3>
      <span :class="{active: active == 0}" @click="active = 0">作品12</span>
      <span :class="{active: active == 1}" @click="active = 1">圈子126</span>
      <span :class="{active: active == 2}" @click="active = 2">喜欢123</span>
    </h3>
    <!-- 内容 -->
    <ul>
      <li>
         <img src="../../static/img/a.png" alt="" class="bg"/>
         <div>
           <img src="../../static/img/yan.png" alt="" class="yan"/>
           <span>7.8w</span>
         </div>
      </li>
       <li>
         <img src="../../static/img/a.png" alt="" class="bg"/>
         <div>
           <img src="../../static/img/yan.png" alt="" class="yan"/>
           <span>7.8w</span>
         </div>
      </li>
       <li>
         <img src="../../static/img/a.png" alt="" class="bg"/>
         <div>
           <img src="../../static/img/yan.png" alt="" class="yan"/>
           <span>7.8w</span>
         </div>
      </li>
       <li>
         <img src="../../static/img/a.png" alt="" class="bg"/>
         <div>
           <img src="../../static/img/yan.png" alt="" class="yan"/>
           <span>7.8w</span>
         </div>
      </li>
       <li>
         <img src="../../static/img/a.png" alt="" class="bg"/>
         <div>
           <img src="../../static/img/yan.png" alt="" class="yan"/>
           <span>7.8w</span>
         </div>
      </li>
       <li>
         <img src="../../static/img/a.png" alt="" class="bg"/>
         <div>
           <img src="../../static/img/yan.png" alt="" class="yan"/>
           <span>7.8w</span>
         </div>
      </li>
       <li>
         <img src="../../static/img/a.png" alt="" class="bg"/>
         <div>
           <img src="../../static/img/yan.png" alt="" class="yan"/>
           <span>7.8w</span>
         </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Re from '@/components/return'
export default {
  name: 'enterpriseDetails',
  components: {
    Re
  },
  data () {
    return {
      active: 0,
      title: '商城详情'
    }
  },
  methods: {
    follow () {
      this.$router.push({path: '/myFollow'})
    },
    fans () {
      this.$router.push({path: '/myFans'})
    }
  }
}
</script>

<style lang="less" scoped>

.enterpriseDetails {
  overflow-y: auto;
  // 头像名字
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
      .con{
          margin-top: .1rem;
         display: flex;
        align-items: center;
      .three{
        text-align: center;
        width: 6em;
        border-radius: .05rem;
        background: #9980a5;
        padding: .03rem .03rem;
        color: #fff;
        font-size: .22rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: .1rem;
      }
      .four{
        text-align: center;
        border-radius: .05rem;
        background: #9980a5;
        padding: .03rem .03rem;
        font-size: .22rem;
        color: #fff;
        width: 6em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
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
