<template>
  <div class="enterprise">
    <swiper :options="swiperOption">
      <swiper-slide  v-for="(item,index) in list" :key="index">
        <div class="br">
          <img :src="item.imageUrl" alt="" class="tu">
          <div>
            <img src="../../static/img/yan.png" alt="" class="yan">
            <span>3</span>
          </div>
          <ul>
            <li>企业名称：{{item.shop_name}}</li>
            <li>企业行业：{{item.type_name}}</li>
            <li>企业规模：{{item.guimo}}</li>
            <li>在招职位：{{item.recruit_number}}个</li>
          </ul>
        </div>
        <ol>
          <!-- <li>
            <div>
             <img src="../../static/img/qy3.png" alt="">
            </div>
            <span>忽略</span>
          </li> -->
          <li @click="details(item.id)">
            <div>
              <img src="../../static/img/qy2.png" alt="">
            </div>
            <span>详情</span>
          </li>
          <li @click="focusQi(item)">
            <div>
              <img v-if="!item.is_focus" src="../../static/img/qy1.png" alt="">
              <img v-else src="../../static/img/home11.png">
            </div>
            <span>{{item.is_focus?'已关注':'关注'}}</span>
          </li>
        </ol>
      </swiper-slide>
    </swiper>
    <BNai :idx="1"></BNai>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css' // 在全局没引入，这里记得要！
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import BNai from '@/components/BottomNav'
import apiRequest from '@/library/apiRequest'
import { Toast } from 'mint-ui';
export default {
  name: 'home',
  components: {
    BNai,
    swiper,
    swiperSlide
  },
  data () {
    return {
      list: [],
      rows:5,
      page:1,
      swiperOption: null,
      currentIndex:0 //当前轮播到第几个
    }
  },
  beforeMount(){
    var that = this
    that.swiperOption = {
        notNextTick: true,
        // 循环
        // loop: true,
        // 设定初始化时slide的索引
        initialSlide: 0,
        // 自动播放
        // autoplay: {
        //   delay: 3000,
        //   stopOnLastSlide: false,
        //   disableOnInteraction: true
        // },
        // 滑动速度
        speed: 800,
        // 滑动方向 horizontal
        direction: 'horizontal',
        // 小手掌抓取滑动
        grabCursor: true,
        // 滑动之后回调函数
        on: {
          slideChangeTransitionEnd: function () {
            that.currentIndex = this.activeIndex
            console.log(this.activeIndex) // 切换结束时，告诉我现在是第几个slide
            if((that.list.length-1) == that.currentIndex){
                that.page++
                console.log("调用加载更多")
                that.initData()
              }
          },
        },
        // 左右点击
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        // 分页器设置
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'custom',
          // 自定义分页器样式
          renderCustom: function (swiper, current, total) {
            const activeColor = '#168fed'
            const normalColor = '#aeaeae'
            let color = ''
            let paginationStyle = ''
            let html = ''
            for (let i = 1; i <= total; i++) {
              if (i === current) {
                color = activeColor
              } else {
                color = normalColor
              }
              paginationStyle = `background:${color};opacity:1;margin-right:20px;width:20px;height:20px;transform:skew(15deg);border-radius:0;`
              html += `<span class="swiper-pagination-bullet" style=${paginationStyle}></span>`
            }
            return html
          }
        }
      }
  },
  created () {
    var that = this
    that.initData()
  },
  methods: {
     initData(){
      var url = location.href,that = this
      apiRequest.post('/index.php',{c: 'Home', action: 'enterprise', link_url: url, uid: that.$local.uid, rows: that.rows, page: that.page},function(res){
          // that.list = res.result
          console.log("初始数据")
          console.log(res)
          if(that.page == 1){
            that.list = res.result
          }
          else{
            if(res.code == 200){
              that.list =  that.list.concat(res.result)
            }
            
          }
            
      })
    },
    //关注
    focusQi(item){
      var that = this
      console.log(item)
       apiRequest.post('/index.php',{c: 'User', action: 'follow', uid: that.$local.uid, focus_id: item.id, focus_type: 2},function(res){
          // that.list = res.result
          console.log("点击关注企业")
          console.log(res)   
          item.is_focus = !item.is_focus
      },false)
    },
    
    //跳转企业详情
    details (e) {
      this.$router.push({path: '/enterpriseDetails',
        query: {
          id: e
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.enterprise {
  .br {
    position: relative;
    margin: .8rem auto 0;
    width: 6.2rem;
    height: 7.6rem;
    border-radius: .15rem;
    background: #fff;
    -moz-box-shadow:-2px 2px 5px #e6f2ff, 2px -2px 5px #E6F2FF;
    -webkit-box-shadow:-2px 2px 5px #e6f2ff, 2px -2px 5px #E6F2FF;
    box-shadow:-2px 2px 5px #e6f2ff, 2px -2px 5px #E6F2FF;
    .tu{
      width: 50%;
      height: 3.2rem;
      margin-left: 25%;
      margin: 0.3rem 25%;
    }
    div{
      position: absolute;
      right: .2rem;
      top: 5rem;
      display: flex;
      align-items: center;
      .yan{
        width: .4rem;
        height: .26rem;
      }
      span{
        display: flex;
        color: #fff;
        font-size: .25rem;
        margin-left: .08rem;
      }
    }
    ul{
      margin: .3rem .2rem;
      display: flex;
      flex-direction: column;
      li{
        line-height: .5rem;
        font-size: .25rem;
        color: #090909;
      }
    }
  }
  ol{
    margin: .4rem auto;
    width: 6rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    li{
      width: .92rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      div{
        width: .92rem;
        height: .92rem;
        border-radius: 50%;
        background: #b83395;
        display: flex;
        justify-content: center;
        align-items: center;
         img{
          width: .6rem;
          height: .6rem;
        }
      }
      span{
        margin-top: .2rem;
        color: #fff;
        font-size: .25rem;
      }
    }
  }
}
</style>
