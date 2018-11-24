<template>
  <div class="home">
    <div class="shareImg" v-if="showShareImg" @click="showShareImg=false"><img src="/static/img/share1.png" alt=""></div>
    <swiper>
      <swiper-slide  class="slide">
        <img :src="list.img_url" alt="" class="bg"/>
        <ul class="left">
          <li @click="focus(list)">
            <div>
              <img :src="list.user_img" alt="" class="top">
              <img src="../../static/img/g.png" alt="" v-if="list.is_focus" class="jia" style="width:0.5rem;height:0.5rem;">
              <img src="../../static/img/jia.png"  v-else class="jia">
              
            </div>
          </li>
          <!-- 点赞 -->
          <li @click="zan(list)">
            <img src="../../static/img/home11.png" alt="" class="xin" v-if="list.is_like">
            <img src="../../static/img/home1.png" alt="" class="xin" v-else>
            <span class="xin_font">{{list.focus_number}}</span>
          </li>
          <li  @click="callPhone(list.telephone)">
            <img src="../../static/img/home22.png" alt="" class="iphone">
            <span class="xin_font">电话</span>
          </li>
          <li @click="fen(list)">
            <img src="../../static/img/home3.png" alt="" class="fen">
            <span class="xin_font">{{list.share_number}}</span>
          </li>
        </ul>
        <!-- 音乐 -->
        <li class="mm">
          <img src="../../static/img/mm.gif" alt="">
          <audio loop class="musicfx"  controls="controls" style="opacity:0;">
              <source class="source" autoplay :src="music_url" type="audio/mp3" ref="musicfx"/>
          </audio>
        </li>
        <ul class="right">
          <li class="right1">#{{list.module_name}}#</li>
          <li class="right2">{{list.username}}</li>
          <li class="right3" v-if="list.address != null"> <img src="../../static/img/map.png" alt="" class="map"><span>{{list.address}}</span></li>
          <li class="right4"> <img src="../../static/img/money.png" alt="" class="money"><span>{{list.start_salary}}~{{list.top_salary}}元</span></li>
          <li class="right5">{{list.descript}}</li>
        </ul>
      </swiper-slide>
    </swiper>
    <!-- 分享 -->
    <div class="fenx" v-if="fenx">
      <h1>分享到</h1>
      <ul>
        <li>
          <img src="../../static/img/home_p.png" alt="">
          <span>微信好友</span>
        </li>
        <li>
          <img src="../../static/img/home_q.png" alt="">
          <span>朋友圈</span>
        </li>
      </ul>
      <h2></h2>
      <ul>
        <li>
          <img src="../../static/img/home_p.png" alt="">
          <span>对比</span>
        </li>
      </ul>
      <h3 @click="fenx = false">
        取消
      </h3>
    </div>

    <!-- 红包 -->
    <div class="mask" v-if="showEllop">
        <div class="ellenvent">
          <div class="el_top">
              <img :src="redInfo.user_img" alt="">
              <div class="el_user">{{redInfo.username}}</div>
              <div class="el_detail">给您发了一个红包</div>
              <div class="zhaopin" v-if="redInfo.redInfo.title">{{redInfo.redInfo.title}}</div>
              <div class="kai" :class="rotate?'rotating':''" @click="kaiEvenlop"><div>開</div></div>
          </div>

          <div class="el_bottom">
              看看大家的手气>
          </div>
        </div>
    </div>
    <!-- <BNai :idx="0"></BNai> -->
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css' // 在全局没引入，这里记得要！
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import BNai from '@/components/BottomNav'
import apiRequest from '@/library/apiRequest'
import { Toast } from 'mint-ui';
import { setTimeout } from 'timers';  
import '@/assets/css/home.css'
import Canvas2Image from '@/library/canvas2image.js'
import { wxShare } from '@/library/share'  //分享文件
import wx from 'weixin-js-sdk';

export default {
  name: 'home',
  components: {
    BNai,
    swiper,
    swiperSlide
  },
  data () {
    return {
      currentIndex : 0, //当前的索引值
      fenx: false,
      page:1,  //当前请求的页数
      rows:20, //每次加载多少条
      phoneNumber: 0, //拨打电话号码
      is_focus:false, //是否点过赞
      list: [],
      swiperOption: null,
      music_url:'', //切换时播放的背景音乐
      prv:'',  //当前索引的上一个索引
      showEllop:false, //是否显示红包
      redInfo:null, //红包信息
      rotate:false,
      showShareImg:false, //展示分享图片信息
      shareUrl:'',
      type:1, //类型:1为首页和企业列表页,2为信息详情,3为企业详情
      shareId:''  //当前企业类型
    }
  },
 
  created () {
  },
  mounted(){
    //播放器控制
        var that = this
        console.log('信息页面')
        console.log(this.$route.query.id)
        that.initData()
         
  },
  methods: {
    //微信分享
    wxShare(){
          var globalConfig = {},that = this;
          globalConfig.jssdkUrl = "/index.php";
          var pars = {};
          pars.c = 'Home';
          pars.action = 'shareConfig'; 
          pars.link_url = location.href;
          pars.type = 2;
          pars.id = that.$route.query.id;
          $.ajax({
            type : "POST",
            url: that.$local.serverHost+globalConfig.jssdkUrl,
            dataType : "json",
            data:pars,
            success : function(data){
            console.log(data);
            if(data.code == 200){
              wx.config(data.result.config);
                    wx.ready(function(){
                      wx.hideMenuItems({
                        menuList: [
                          'menuItem:readMode', // 阅读模式
                          // 'menuItem:share:timeline', // 分享到朋友圈
                          'menuItem:copyUrl', // 复制链接
                          "menuItem:share:qq",//qq
                          "menuItem:favorite",//收藏
                          'menuItem:share:QZone',//qq空间
                          'menuItem:exposeArticle',//举报
                          'menuItem:openWithQQBrowser',//浏览器打开
                          "menuItem:share:email",//邮箱
                        ],
                        success: function (res) {
                          //alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
                        },
                        fail: function (res) {
                          //alert(JSON.stringify(res));
                        }
                      });
                      wx.onMenuShareAppMessage({
                        title: data.result.shareInfo.title,
                        desc: data.result.shareInfo.desc,
                        link: data.result.shareInfo.link,
                        imgUrl: data.result.shareInfo.imgUrl,
                        success: function() {
                          that.successShare()
                        }
                      });
                      wx.onMenuShareTimeline({
                        title: data.result.shareInfo.title,
                        link: data.result.shareInfo.link,
                        imgUrl: data.result.shareInfo.imgUrl,
                        success: function() {
                           that.successShare()
                        }
                      });	
                  })
                }
            },
            error:function(obj){
                  //alert("网络出错");
                  // alert(JSON.stringify(obj));
                }
              });
    },

    //请求微信成功分享
    successShare(){
      var that = this
      apiRequest.post('/index.php',{c: 'User', action: 'share', link_type: 1,link_id:that.$route.query.id,uid:that.$local.uid },function(res){
           Toast(res.msg);
           that.showShareImg = false
         that.list.share_number =  that.list.share_number +1
      })
    },

    //初始化请求数据
    initData(){
      var url = location.href,that = this
      that.shareId = this.$route.query.id
  
      apiRequest.post('/index.php',{c: 'Message', action: 'detail', link_url: url, message_id: that.shareId, uid: that.$local.uid},function(res){
          that.list = res.result
          that.wxShare()
           console.log('信息页面')
           console.log(that.$route.query.id)
          console.log(res)
      })
    },
    //拨打电话
    callPhone (phoneNumber) {
      console.log('2')
      window.location.href = 'tel://' + phoneNumber
    },

    //分享
    fen (item) {
      // this.fenx = true
      console.log(location.href)
      this.showShareImg=true
      this.type = 2
      this.shareId = item.id
    },
    //点击关注
    focus(item){
      console.log(item)
      var that = this
      apiRequest.post('/index.php',{c: 'User', action: 'follow', focus_id: item.user_id, uid: that.$local.uid,focus_type:1},function(res){
            console.log("关注信息")
            console.log(res)
            if(res.code == 200){
              item.is_focus = !item.is_focus
               Toast(res.msg);
            }
        })
    },
    //点赞
    zan (item) {
      console.log("点赞")
      console.log(item)
      var that = this
        // 点击点赞后
        apiRequest.post('/index.php',{c: 'User', action: 'focus', link_type: 1, link_id: item.id, uid: that.$local.uid},function(res){
            console.log("点赞信息")
            console.log(item.user_id)
            console.log(res)
            if(res.code == 200){
              Toast(res.msg);
              item.is_like = !item.is_like
              item.focus_number = item.focus_number + res.result.number
            }
        })
     
    },

    //开红包
    kaiEvenlop(){
      var that = this;
      that.rotate = true
      apiRequest.post('/index.php',{c: 'User', action: 'receiveRedpacket', uid: that.$local.uid,message_id:that.list[that.currentIndex].id},function(res){
            console.log("领取成功")
            console.log(res)
            that.rotate = false
            that.showEllop = false
            $('.kai').addClass('optio')
            Toast(res.msg);
        },false,function(err){
          that.rotate = false
           that.showEllop = false
           $('.kai').addClass('optio')
        })
    },

  //网页截图
    convert2canvas(callback) {
        var that = this
        var cntElem = $("body")[0];

        var shareContent = cntElem;//需要截图的包裹的（原生的）DOM 对象
        var width = shareContent.offsetWidth; //获取dom 宽度
        var height = shareContent.offsetHeight; //获取dom 高度
        var canvas = document.createElement("canvas"); //创建一个canvas节点
        var scale = 2; //定义任意放大倍数 支持小数
        canvas.width = width * scale; //定义canvas 宽度 * 缩放
        canvas.height = height * scale; //定义canvas高度 *缩放
        canvas.getContext("2d").scale(scale, scale); //获取context,设置scale 
        var opts = {
            scale: scale, // 添加的scale 参数
            canvas: canvas, //自定义 canvas
            // logging: true, //日志开关，便于查看html2canvas的内部执行流程
            width: width, //dom 原始宽度
            height: height,
            useCORS: true // 【重要】开启跨域配置
        };

        html2canvas(shareContent, opts).then(function (canvas) {

            var context = canvas.getContext('2d');
            // 【重要】关闭抗锯齿
            context.mozImageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.msImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;
            
            // 【重要】默认转化的格式为png,也可设置为其他格式
            // var img = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height);
            var dataURL =canvas.toDataURL("image/png");
            that.shareUrl = dataURL
            console.log("调用截图")
            console.log(dataURL)

            //回调
            callback && callback()
        });
    }
  }
  
}
</script>

<style lang="less">
html {
  height: 100% !important;
  background: #32004b;
}
body {
  height: 100% !important;
  background: #32004b;
}
.home {
  height: 100% !important;
      .shareImg{
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        z-index:55;
        width:100%;
        background:rgba(0,0,0,0.6);
        background-size:100% 100%;
         img{
          width:100%;
          height:45%;
        }
      }
     
    // 分享到弹出层
    .fenx{
      width: 100%;
      height: 4.9rem;
      background: #32004b;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 50;
      border-radius: .15rem .15rem 0 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      h1{
        margin: .28rem 0 .2rem;
        font-size: .26rem;
        color: #fff;
      }
      ul{
        display: flex;
        width: 6.7rem;
        li{
          margin-right: .6rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          img{
            width: .94rem;
            height: .94rem;
          }
          span{
            padding-top: .05rem;
            font-size: .18rem;
            color: #fff;
          }
        }
      }
      h2{
        background: #fff;
        width: 6.9rem;
        height: .02rem;
        margin: .2rem 0;
      }
      h3{
        background: #ff0042;
        width: 100%;
        height: .8rem;
        color: #fff;
        font-size: .27rem;
        display: flex;
        position: absolute;
        left: 0;
        bottom: 0;
        justify-content: center;
        align-items: center;
      }
    }

    .swiper-wrapper {
      height: 100% !important;
      .swiper-slide {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        .bg{
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
        }
        // 头像点赞等等
        .left{
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 22;
          right: .1rem;
          bottom: 2rem;
          li{
            margin-bottom: .5rem;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            // 头像
            div {
              width: .9rem;
              height: .9rem;
              border-radius: 50%;
              border: .03rem solid #acccfb;
              position: relative;
              .top{
                border-radius: 50%;
                width: 100%;
                height: 100%;
              }
              .jia{
                position: absolute;
                bottom: -.15rem;
                left: 50%;
                margin-left: -.18rem;
                width: .36rem;
                height: .36rem;
              }
            }
            // 关注
            .xin{
              width: .63rem;
              height: .58rem;
            }
            .xin_font {
              text-align: center;
              padding-top: .08rem;
              color: #fff;
              font-size: .25rem;
            }
            // 电话
            .iphone{
              width: .4rem;
              height: .52rem;
            }
            // 分享
            .fen{
              width: .62rem;
              height: .59rem;
            }
            // 详情
          }
        }
        // 音乐
        .mm{
          position: absolute;
          right: .15rem;
          bottom: .8rem;
          width: 1.2rem;
          height: 1.2rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
        // 本页的主要内容
        .right{
          position: absolute;
          left: .2rem;
          bottom: 1rem;
          display: flex;
          flex-direction: column;
          .right1{
            color: #f4cf19;
            font-size: .25rem;
            line-height: .25rem;
            margin-bottom: .2rem;
          }
          .right2{
            color: #fff;
            font-size: .25rem;
            margin-bottom: .2rem;
          }
          .right3{
            display: flex;
            align-items: center;
            height: .38rem;
            width: 2rem;
            background: rgba(255, 255, 255, .5);
            border-radius: .05rem;
            margin-bottom: .1rem;
            img{
              width: .38rem;
              height: .38rem;
              margin-right: .1rem;
            }
            span{
              width: 6em;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #fff;
              font-size: .25rem;
            }
          }
          .right4{
            display: flex;
            align-items: center;
            height: .38rem;
            margin-bottom: .14rem;
            img{
              width: .33rem;
              height: .36rem;
              margin-right: .1rem;
            }
            span{
              color: #f4cf19;
              font-size: .3rem;
            }
          }
          .right5{
              width: 5.3rem;
              overflow: hidden;
              word-break:break-all;
              display:-webkit-box;
              -webkit-line-clamp:2;
              -webkit-box-orient:vertical;
              color: #fff;
              font-size: .25rem;
          }
        }
      }
    }
  .musicfx{
    position:absolute;
    top:0;
    left:0;
    right: 0;
    bottom:0;

  }
  .mask{
      .rotating {
          animation:rotating  2s linear infinite;

          -webkit-animation:rotating  2s linear infinite;
      }
       .optio {
          transform:translateY(0,600px);
      }
    }
}

</style>

