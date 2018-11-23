<template>
  <div class="my-fans">
    <Re :title="title"></Re>
    <!-- 分类 -->
    <h3>
      <span :class="{active: active == 0}" @click="active = 0">个人</span>
      <span :class="{active: active == 1}" @click="active = 1">企业</span>
      <span :class="{active: active == 2}" @click="active = 2">商家</span>
    </h3>
    <!-- 线 -->
    <h1></h1>
    <!-- 内容 -->
    <ul>
      <li>
        <img src="../../static/img/hometu.png" alt="" class="left">
        <div class="con">
          <span>拉肯定是房价</span>
          <div>
            <img src="../../static/img/my_man.png" alt=""><i>18岁</i>
          </div>
          <i>福建 厦门</i>
        </div>
        <span class="right">关注</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Re from '@/components/return'
export default {
  name: 'my-follow',
  components: {
    Re
  },
  data () {
    return {
      active: 0,
      title: ' 我的粉丝'
    }
  }
}
</script>

<style lang="less" scoped>

.my-fans {
  overflow-y: auto;
  // 分类
  h3{
    width: 6.9rem;
    margin: .2rem .3rem 0;
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
        width: .80rem;
        height: .36rem;
        border-radius: .05rem;
        background: #ff0042;
        color: #fff;
        font-size: .2rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .con{
        display: flex;
        flex-direction: column;
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
