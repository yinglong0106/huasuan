<template>
  <div class="my-money">
    <Re :title="title"></Re>
    <h6></h6>
    <h1 @click="goChange">零钱明细</h1>
    <img src="../../static/img/jb.png" alt="" class="money"/>
    <h2>我的余额</h2>
    <h3><span>￥</span>{{tcRemainMoney}}</h3>
    <div class="btn" @click="tixian">提现</div>
    <div class="btn2" @click="showRule">提现规则</div>
    <div class="btn3" @click="toRecord">提现记录</div>
    <div class="money_box" v-if="withDraw">
      <div class="box">
        <div class="title">微信提现</div>
        <div class="outLine"><input type="number" class="writeMoney" v-model="tx_money"></div>
        <div class="box_bottom">
          <div><span @click="getMoney">提现</span></div>
          <div><span @click="cancel" style="background:#ff0042;">返回</span></div>
        </div>
      </div>
    </div>
    <h4>常见问题</h4>
    <h5>本服务由创时间提供</h5>
    <!-- 分类 -->
  </div>
</template>

<script>
import Re from '@/components/return'
import apiRequest from '@/library/apiRequest'
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { setTimeout } from 'timers';

export default {
  name: 'my-follow',
  components: {
    Re
  },
  data () {
    return {
      active: 0,
      title: '我的钱包',
      content:'',  //提现规则,
      tcRemainMoney:'',  //剩余提现余额
      tx_money:'',  //要提现的金额
      withDraw:false //显示提现页面
    }
  },
  mounted(){
      this.initData()
  },
  methods:{

    //初始化数据
    initData(){
      var that = this
      apiRequest.post('/index.php',{c: 'User', action: 'walletPage', uid: that.$local.uid,link_url:location.href},function(res){
            console.log("我的钱包")
            console.log(res)
            that.tcRemainMoney = res.result.tcRemainMoney,
            that.content = res.result.content
        })
    },

    //显示规则
    showRule(){
      var that = this
      MessageBox({
        title: '提现规则',
        message: that.content,
        showCancelButton: false
      });
    },

    //提现请求函数
    getMoney(){
      var that = this
      if(!that.tx_money){
        Toast("提现金额不得为空");
        return false
      }
      if(parseFloat(that.tx_money)>parseFloat(that.tcRemainMoney)){
        Toast("提现金额不得大于账户余额");
        return false
      }
       apiRequest.post('/index.php',{c: 'User', action: 'withdraw', uid: that.$local.uid,money:that.tx_money},function(res){
            console.log("提现")
            console.log(res)
            Toast(res.msg);
            that.tx_money = ''
            setTimeout(function(){
                that.$router.push({path: 'my',query:{user:'user'}})
            },2000)
        })
    },
    //取消
    cancel(){
      this.withDraw = false
    },
    // 提现
    tixian(){
      var that = this
      that.withDraw = true
    },

    //前往零钱明细
    goChange(){
      this.$router.push({path:'/moneyDetail'})
    },

    //前往提现记录
    toRecord(){
      this.$router.push({path:'/withdraw'})
    }
  }
}
</script>

<style lang="less" scoped>
.mint-msgbox{
  width:90% !important;
}
.my-money {
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .money_box{
    position:fixed;
    top:0;
    left:0;
    height:100%;
    width:100%;
    background:rgba(0,0,0,0.4);
    display:flex;
    justify-content: center;
    align-items: center;
    .box{
        width:78%;
        height:40%;
        background:#fff;
        border-radius:10px;
        padding:30px 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .title{
          color:#32004b;
        }
        .outLine{
          .writeMoney{
            text-align: center;
            width: 100%;
            font-size: 16px;
            height: 35px;
            outline: none !important;
            border: none;
            border-bottom: 1px solid #ff0042 !important;
          }
           
        }
        .box_bottom{
          width:100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          div{
            flex:1;
            text-align: center;
            span{
              width:100px;
              background:#32004b;
              color:#fff;
              padding:5px 20px;
            }
          }
        }
        
    }
  }
  h6{
    width: 100%;
    height: .02rem;
    background: #fff;
  }
  h1{
    position: absolute;
    right: .3rem;
    top: 1rem;
    color: #fff;
    font-size: .3rem;
  }
  .money{
    margin-top: 1.3rem;
    width: 1.6rem;
    height: 1.6rem;
  }
  h2{
    font-size: .3rem;
    color: #fff;
    margin-top: .4rem;
  }
  h3{
    font-size: .75rem;
    color: #fff;
    margin-top: .3rem;
    span{
      font-size: .55rem;
    }
  }
  .btn{
    margin-top: .4rem;
    height: .8rem;
    width: 6.9rem;
    background: #ff0042;
    border-radius: .1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .btn2{
    margin-top: .2rem;
    height: .8rem;
    width: 6.9rem;
    background: #fff;
    border-radius: .1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #32004b;
  }
  .btn3{
    border:1px solid #ff0042;
    margin-top: .2rem;
    height: .8rem;
    width: 6.9rem;
    border-radius: .1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color:#ff0042;

  }
  h4{
    color: #fff;
    font-size: .25rem;
    position: fixed;
    left: 50%;
    bottom: .56rem;
    width: 4em;
    margin-left: -2em;
  }
  h5{
    color: #fff;
    font-size: .2rem;
    position: fixed;
    left: 50%;
    bottom: .24rem;
    width: 9em;
    margin-left: -4.5em;
  }
}
</style>
