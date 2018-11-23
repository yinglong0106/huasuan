<template>
  <div class="my-footprint">
    <Re :title="title"></Re>
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
  name: 'my-footprint',
  components: {
    Re
  },
  data () {
    return {
      active: 0,
      title: '足迹'
    }
  }
}
</script>

<style lang="less" scoped>

.my-footprint {
  overflow-y: auto;
  // 分类
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
}
</style>
