<template>
  <div>
    <img src="../../static/img/fan.png" alt="" class="bg" @click="back"/>
    <span>{{title}}</span>
    <i></i>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    title: String
  },
  data () {
    return {
      showBack:true
    }
  },
  mounted(){
    console.log('返回导航栏')
    console.log(this.$local.checkBrowser())
    if(this.$local.checkBrowser() == 0){ //是0代表是微信浏览器
      this.showBack = false
    }else{
      this.showBack = true   //99代表普通浏览器
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
<style  lang="less" scoped>
div{
  height: .8rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img{
    width: .22rem;
    height: .38rem;
    margin-left: .3rem;
  }
  span{
    color: #fff;
    font-size: .3rem;
  }
  i{
    width: .22rem;
    height: .38rem;
     margin-right: .3rem;
  }
}
</style>
