<template>
  <div class="enterprise">
    <swiper :options="swiperOption">
      <swiper-slide>
        <div class="br">
          <img src="../../static/img/a.png" alt="" class="tu">
          <div>
            <img src="../../static/img/yan.png" alt="" class="yan">
            <span>3</span>
          </div>
          <ul>
            <li>旺铺名称：哈哈一发</li>
            <li>店铺分类：电子技术</li>
            <li>商品产地：中国-汉州</li>
            <li>在售商品：60款</li>
          </ul>
        </div>
        <ol>
          <li>
            <div>
             <img src="../../static/img/qy3.png" alt="">
            </div>
            <span>忽略</span>
          </li>
          <li @click="details">
            <div>
              <img src="../../static/img/qy2.png" alt="">
            </div>
            <span>详情</span>
          </li>
          <li>
            <div>
              <img src="../../static/img/qy1.png" alt="">
            </div>
            <span>关注</span>
          </li>
        </ol>
      </swiper-slide>
      <swiper-slide>I'm Slide 2</swiper-slide>
      <swiper-slide>I'm Slide 3</swiper-slide>
    </swiper>
    <BNai :idx="3"></BNai>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css' // 在全局没引入，这里记得要！
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import BNai from '@/components/BottomNav'
export default {
  name: 'home',
  components: {
    BNai,
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
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
            console.log(this.activeIndex) // 切换结束时，告诉我现在是第几个slide
          }
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
    }
  },
  methods: {
    details () {
      this.$router.push({path: '/shopDetails'})
    }
  }
}
</script>

<style lang="less" scoped>
.enterprise {
  .br {
    position: relative;
    margin: 1.3rem auto 0;
    width: 6.4rem;
    height: 8.4rem;
    border-radius: .15rem;
    background: #fff;
    -moz-box-shadow:-2px 2px 5px #e6f2ff, 2px -2px 5px #E6F2FF;
    -webkit-box-shadow:-2px 2px 5px #e6f2ff, 2px -2px 5px #E6F2FF;
    box-shadow:-2px 2px 5px #e6f2ff, 2px -2px 5px #E6F2FF;
    .tu{
      width: 6.4rem;
      height: 5.5rem;
      border-radius: .15rem .15rem 0 0;
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
        line-height: .6rem;
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
    justify-content: space-between;
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
        background: #ff0042;
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
