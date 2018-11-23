<template>
  <div class="my-code">
    <Re :title="title"></Re>
    <h6></h6>
    <div class="code">
      <div  class="top">
        <img src="../../static/img/code.png" alt="" class="bg">
        <div  class="head">
          <img :src="data.imageUrl" alt="">
          <h3>{{data.nikeName}}</h3>
        </div>
      </div>
      <div  class="bom">
        <img :src="data.qrcodeUrl" alt="">
      </div>
      <h2>用微信扫一扫二维码，关注赚钱</h2>
    </div>
  </div>
</template>

<script>
import Re from '@/components/return'
import apiRequest from '@/library/apiRequest'
import { Toast } from 'mint-ui';
export default {
  name: 'my-code',
  components: {
    Re
  },
  data () {
    return {
      active: 0,
      title: ' 二维码',
      data:null
    }
  },
  mounted(){
    this.initData()
  },
  methods:{
    //初始化数据
    initData(){
      var that = this
      apiRequest.post('/index.php',{c: 'User', action: 'qrcodePage', uid: that.$local.uid,link_url:location.href},function(res){
            console.log("我的二维码")
            console.log(res)
            that.data = res.result
        })
    },
  }
}
</script>

<style lang="less" scoped>
.my-code {
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  h6{
    width: 100%;
    height: .02rem;
    background: #fff;
  }
  .code{
    width: 5.7rem;
    height: 8rem;
    border-radius: .1rem;
    margin-top: 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    .top{
      width: 100%;
      height: 1.76rem;
      border-radius: .1rem .1rem 0 0;
      position: relative;
      .bg{
        width: 100%;
        height: 100%;
      }
      .head{
        position: absolute;
        top: .4rem;
        left: .35rem;
        display: flex;
        align-items: center;
        img{
          width: .9rem;
          height: .9rem;
          margin-right: .22rem;
          border-radius: 50%;
        }
        h3{
          font-size: .3rem;
          color: #fff;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 70%;
        }
      }
    }
    .bom{
      width: 3.9rem;
      height: 3.9rem;
      margin-top: .78rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    h2{
      margin-top: .4rem;
      color: #000;
      font-size: .2rem;
    }
  }
}
</style>
