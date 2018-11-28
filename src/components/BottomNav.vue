<template>
  <div class="nav">
    <div id="map_container"></div>
    <!-- 内容 -->
    <span v-if="nav">
      <ul>
        <li @click="showModule(item)" v-for="(item,index) in list" :key="index">
          <label :for="componentId" v-if="files">
          <img :src="item.imageUrl" alt="">
          <i>{{item.className}}</i>
          </label>
        </li>
      </ul>
      <img src="../../static/img/close.png" alt="" class="close" @click="close">
    </span>
    <!-- 底部 -->
    <div class="footer">
        <router-link :to="{path:item.push,query:item.query}" class="h" v-for='(item,index) of items' :key="index">
          <div class="hh" :class='{on:index===idx}'>
             <img :src="item.icon" v-if="item.icon !== ''" @click="nav = true">
             <p>{{item.name}}</p>
          </div>
        </router-link>
    </div>
    <!-- 发布 -->
    <div id="vue-img-uploader" v-if="up == true">
      <!-- 头部 -->
      <div class="fabu-head">
        <img src="../../static/img/cuo.png" @click="up = false">
        <div class="fa" @click="uploadMsg">发布</div>
      </div>
      <!-- input标签 -->
      <input type="file" name="img" enctype="multipart/form-data" class="guding" :id="componentId" @change="getFile" ref="uploadImg">
      <!-- 上传图片 -->
     <div class="con">
        <template v-if="files">
        <div class="vue-thumbnail-wrapper" v-for="(img,index) in files" :key="img.name + index">
          <div class="del-button"
            @click="deleteImg(img,index)">×</div>
          <img class="vue-img-thumbnail" :data-index="index" :src="img.src" :style="tbstyle">
        </div>
      </template>
      <div class="loading" v-show="loading" :style="tbstyle">
        <div class="donut"></div>
      </div>
      <label :for="componentId">
        <slot name="addButton"></slot>
        <div class="default" v-if="!$slots.addButton">+</div>
      </label>
    </div>
    <!-- 文本输入框 -->
    <textarea name="" id="" cols="30" rows="10" v-model="descript" placeholder="请输入你想说的话"> 
    </textarea>
    <!-- 中间 3个选择 -->
    <div class="db">
      <div class="lei" @click="visible = true"> <img src="../../static/img/f.png">{{title.title}}</div>
      <div class="yin" @click="showMusic = true"> <img src="../../static/img/y.png">{{title2.title}}</div>
      
    </div>

    <div class="db" style="justify-content:flex-start;">
    <!-- 自动获取位置 -->
      <div class="map" style="margin-left:11%;"> <img src="../../static/img/m.png">{{addr}}</div>
    </div>

    <!-- 薪资 -->
    <div class="xz">
      <div><img src="../../static/img/q.png" alt=""><i>薪资</i></div>
      <input type="number" placeholder="输入金额" v-model="start_money">
      <i>~</i>
      <input type="number" placeholder="输入金额" v-model="end_money">
    </div>

    <!-- 电话 -->
    <div class="xz" style="font-size: 0.26rem;padding:0 0.2rem;width: 73%;margin:0.2rem auto 0.2rem 15%;">
        <i style="width:0.8rem;">电话</i>
        <input style="flex:1;text-align:left;" type="number" placeholder="输入手机号" v-model="phone">
    </div>
    <!-- 选择地址的弹出框 -->
    <div class="address" v-if="address == true">
      <div><h2></h2><h1>我在这里</h1><h3 @click="address = false">取消</h3></div>
      <ul>
        <li><i>不显示位置</i> <img src="../../static/img/g.png" alt=""></li>
         <li>厦门</li>
      </ul>
    </div>

    <!-- 另一种picker -->
    <!-- <picker v-model="visible" :data-items="items2" @change="onValuesChange">
      <div class="top-content" slot="top-content"></div>
   </picker> -->

    <!-- 选择类型 -->
   <mt-actionsheet :actions="list1" v-model="visible"></mt-actionsheet>

   <!-- 选择音乐 -->
   <!-- <mt-actionsheet :actions="musicArr" v-model="showMusic"></mt-actionsheet> -->
    <van-popup v-model="showMusic" position="bottom" :overlay="false" style="height:100%;">
        <selectMusic></selectMusic>
    </van-popup>

  </div>
  </div>
</template>
<script type="text/javascript">
import ImageCompressor from 'image-compressor.js';
import selectMusic from '@/components/selectMusic';
import { Actionsheet } from 'mint-ui';
import Map from '@/components/map'
import { Toast } from 'mint-ui';
import apiRequest from '@/library/apiRequest'
import { setTimeout } from 'timers';

require('formdata-polyfill')
export default {

  data () {
    return {
      address: false, //显示地址弹窗
      addr:'', //获取容器的地址
      start_money:'', //起始输入金额
      end_money:'', //末端输入金额
      visible: false, //显示选择类型
      showMusic:false, //显示选择音乐类型
      descript:'',  //描述想说的
      phone:'', //手机号码
      addressComponents:null, //具体的省市区信息
      module:'', //模块id
      title: '',
      title2: '',
      title3: '选择位置',
      musicInfo:null, //可选择的音乐
      musicArr:[], //选择音乐数组
      list: [],
      list1:[],
      items2: [
        {
          values: ['旋转着','sdhsja','dasj']
        }
      ],
      nav: false,
      up: false,
      files: [], // 展示用列表
      formData: new FormData(), // 上传用列表
      loading: false,
      items: [
        {
          cls: 'home',
          name: '首页',
          push: '/',
          icon: '',
          query:''
        },
        {
          cls: 'shares',
          name: '企业',
          push: '/enterprise',
          icon: '',
          query:''
        },
        {
          cla: 'community',
          push: '',
          icon: '../static/img/c.png',
          query:''
        },
        {
          cla: 'shop',
          name: '商家',
          push: '/shop',
          icon: '',
          query:''
        },
        {
          cla: 'my',
          name: '我',
          push: '/my',
          icon: '',
          query:{
            user:'user'
          }
        }
      ]
    }
  },
  components:{
    Map,
    selectMusic
  },
  props: {
    idx: {
      type: Number,
      default: 0
    },
    componentId: {
      type: String,
      default: 'cid' + Math.floor(Math.random() * 10000),
      validator: function (value) {
        let hasNotWord = /\W/.test(value)
        return !hasNotWord
      }
    },
    initialImg: {
      type: Array,
      default: () => []
    },
    tbstyle: { type: Object },
    autoUpload: {
      type: Boolean,
      default: true
    },
    compressQuality: {
      type: Number,
      default: 0.6
    },
    maxSize: {
      type: Number,
      default: 10 * 1024 * 1024
    },
    max: {
      type: Number,
      default: 1
    },
    uploadURL: {
      type: String
    }
  },

  beforeMount () {
    var that = this,arr=[]
    this.axios
      .post('/index.php', this.qs.stringify({c: 'Message', action: 'addPage', uid: that.$local.uid}))
      .then(
        (d) => {
          console.log("进入添加页面")
          console.log(d.data)
          that.list = d.data.result.moduleInfo
          // 类型
          that.list1 = d.data.result.moduleInfo.map(item=>{
            return {
                name :item.className,
                id:item.id,
                method:that.getValue
              }
          })
          that.musicInfo = d.data.result.musicInfo
          //音乐
          that.musicArr =  d.data.result.musicInfo.map(item=>{
            return {
                name :item.title,
                id:item.id,
                method:that.getMusic,
                url:item.url
              }
          })
          that.title = {
            id:d.data.result.moduleInfo[0].id,
            title:d.data.result.moduleInfo[0].className
          }
          that.title2 = {
            title:"选择音乐"
          }
 
        }
      )
      .catch(
        (err) => {
          if (err.response) {
            console.log(err.response)
            // 控制台打印错误返回的内容
          }
        }
      )
  },
  mounted () {
    // this.handleInitialImg()
    var that = this
     //h5定位当前位置
        //    navigator.geolocation.getCurrentPosition(function(position){
        //        console.log(position)
        //     }, function(error){
        //         console.log("Error code: " + error.code);
        //         console.log("Error message: " + error.message);
        //     });
        var map = new BMap.Map("map_container");   
        var point =  new BMap.Point(116.404, 39.915)
        map.centerAndZoom(point, 11);      
            // 创建地理编码实例      
            var myGeo = new BMap.Geocoder();      
            // 根据坐标得到地址描述    
            myGeo.getLocation(point, function(result){      
                if (result){      
                    console.log(result)
                    that.$store.commit('getLocal',{
                        lng:result.point.lng,
                        lat:result.point.lng,
                        address:result.address
                    })
                    that.addr = result.address
                    that.addressComponents = result
                }else{
                    console.log("获取地址失败")
                }
            });
            console.log("容器中的地址")
            console.log(this.$store)
  },
  watch: {
    initialImg () {
      this.handleInitialImg()
    },
  },
  methods: {
    // 另一种picker的函数
    // onValuesChange (result1) {
    //   console.log(result1)
    //   this.title = result1
    // },
    showModule(item){
      this.up = true,
      this.module = item.id
    },

    //类型选择
    getValue(action){
      console.log("选择的回调函数")
      console.log(action)
      this.title = {
        id:action.id,
        title:action.name
      }
    },

    //音乐选择
    getMusic(action){
      console.log("选择的音乐类型")
      console.log(action)
      this.title2 = {
            title:action.name,
            id:action.id,
            url:action.url
        }
    },

    close () {
      this.nav = false
    },
    haha () {
      this.up = true
    },
    //创建原生兼容对象
    createXHR(){
      if(typeof XMLHttpRequest != 'undefined'){
        return new XMLHttpRequest()
      }else if(typeof ActiveXObject != 'undefined'){
        if (typeof arguments.callee.activeXString != "string"){
          var versions = [ "MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],i, len;
          for (i=0,len=versions.length; i < len; i++){
            try {
              new ActiveXObject(versions[i]);
              arguments.callee.activeXString = versions[i];
              break;
            } catch (ex){
              //跳过
            }
          }
        }
          return new ActiveXObject(arguments.callee.activeXString);
      }else {
        throw new Error("No XHR object available.");
      }
    },
    //获取上传文件
    getFile(ev){
      console.log(ev)
      console.log(this.$refs.uploadImg.files[0])
      var postUrl = this.$local.serverHost+'/index.php?c=Message&action=uploadImg'
      var that = this,data = new FormData()
      data.append('img',this.$refs.uploadImg.files[0])
      var xhr = this.createXHR();
      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.status >= 200 && xhr.status < 300){
            console.log("上传请求返回信息")
            console.log(JSON.parse(xhr.responseText))
            var resData = JSON.parse(xhr.responseText)
            if(resData.code == 200){
               that.files.push({
                src:resData.result.host + resData.result.msg,
                name:that.$refs.uploadImg.files[0].name,
                path: resData.result.msg
              })
            }else if(resData.code == 100){
                 Toast(resData.msg);
            }
            
          }else{
            console.log("请求失败")
          }
        }
      }
      xhr.open('post',postUrl,true)
      // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(data)
    },
    //发布消息
    uploadMsg(){
      var that = this,myreg=/^[1][3,4,5,7,8][0-9]{9}$/,addressComponents  = this.addressComponents 
      
      if(!that.files[0]){
         Toast('上传图片不能为空');
         return false
      }
      if(!that.title2.id){
        Toast('请选择上传音乐');
         return false
      }
      if(!that.start_money || !that.end_money){
        Toast('请输入薪资范围');
         return false
      }
      if(that.phone && !myreg.test(that.phone)){
        Toast('请输入正确的手机格式');
         return false
      }
      apiRequest.post('/index.php',{c: 'Message', action: 'add', uid: that.$local.uid, img_url:that.files[0].path,music_url:that.title2.url,
      start_salary:that.start_money,top_salary:that.end_money,descript:that.descript,module_id:that.module,telephone:that.phone,province:addressComponents.addressComponents.province,
      city:addressComponents.addressComponents.city,district:addressComponents.addressComponents.district,
      address:addressComponents.addressComponents.street+addressComponents.addressComponents.streetNumber,img_arr:JSON.stringify(that.files)
      },
      function(res){
          // that.list = res.result
          console.log("上传信息")
          console.log({c: 'Message', action: 'add', uid: that.$local.uid, img_url:that.files[0].path,music_url:that.title2.url,
      start_salary:that.start_money,top_salary:that.end_money,descript:that.descript,module_id:that.module,telephone:that.phone,province:addressComponents.addressComponents.province,
      city:addressComponents.addressComponents.city,district:addressComponents.addressComponents.district,
      address:addressComponents.addressComponents.street+addressComponents.addressComponents.streetNumber
      })
          console.log(res)   
          Toast(res.msg)
          that.files = []
          setTimeout(function(){
            that.$router.push({path: 'my',query:{user:'user'}})
          },2000)
      })
    },


    // async handleInitialImg () {
    //   if (this.initialImg.length > 0) {
    //     for (let i = 0; this.initialImg.length > i; i++) {
    //       let url = this.initialImg[i]
    //       let blob = await this.url2BlobKai(url)
    //       // 加入展示列表
    //       this.files.push({ name: `preset${i}`, src: url })
    //       if (this.autoUpload) {
    //         // 本来就上传了所以就不管了
    //       } else {
    //         // 加入上传列表
    //         this.formData.append(`preset${i}`, blob, `preset${i}`)
    //         this.$emit('update:formData', this.formData)
    //       }
    //     }
    //   }
    // },

    // url2BlobKai (url) {
    //   return new Promise((res, rej) => {
    //     console.log('改！')
    //     var canvas = document.createElement('canvas')
    //     let img = new Image()
    //     img.setAttribute('crossOrigin', 'Anonymous')
    //     img.src = url
    //     img.onload = () => {
    //       canvas.width = img.width
    //       canvas.height = img.height
    //       canvas.getContext('2d').drawImage(img, 0, 0)
    //       canvas.toBlob(blob => {
    //         res(blob)
    //       })
    //     }
    //   })
    // },
    // async getFile (evt) {
    //   this.loading = true
    //   let file = evt.target.files[0]
    //   let fileName = file.name
    //   console.log(file)
    //   // 清除value下次才能选择相同图片
    //   document.querySelector(`#${this.componentId}`).value = null
    //   let compressData = await this.imgCompress(file) // 压缩后的图片
    //   let dataURL = await this.getDataURL(compressData) // 转换为dataURL
    //   // 新增图片加入展示列表
    //   this.files.push({ name: fileName, src: dataURL })
    //   if (this.autoUpload) {
    //     // 自动上传
    //     let formData = new FormData()
    //     formData.append('img', compressData, fileName)
    //     this.uploader(formData)
    //   } else {
    //     // 新增图片加入上传列表
    //     this.formData.append(fileName, compressData, fileName)
    //     this.$emit('update:formData', this.formData)
    //   }
    //   this.loading = false
    // },
    //删除图片
    deleteImg (name, index) {
      console.log("这是删除信息")
      console.log(name)
      var that = this
      this.files.splice(index, 1)
       apiRequest.post('/index.php',{c: 'Message', action: 'delImg',uid:that.$local.uid,path:name.path,message_id:0},function(res){
                console.log(res)
                Toast(res.msg);
            })
    },
    // getDataURL (file) {
    //   return new Promise((res, rej) => {
    //     let reader = new FileReader()
    //     reader.readAsDataURL(file)
    //     reader.onload = evt => res(evt.target.result)
    //     reader.onerror = err => rej(err)
    //   })
    // },
    // imgCompress (file) {
    //   return new Promise((res, rej) => {
    //     new ImageCompressor(file, {
    //       quality: this.compressQuality,
    //       success (result) {
    //         res(result)
    //       },
    //       error (err) {
    //         rej(err)
    //       }
    //     })
    //   })
    // },
    // uploader (data) {
    //   console.log(data)
    //   let vm = this
    //   let connect = new XMLHttpRequest()
    //   connect.open('POST', this.uploadURL)
    //   console.log(this.files)
    //   /* You shouldNEVERset that header yourself.
    //    * We set the header properly with the boundary.
    //    * If you set that header, we won't and your server won't know what boundary to expect
    //    * (since it is added to the header).
    //    * Remove your custom Content-Type header and you'll be fine.
    //    * http://stackoverflow.com/questions/17415084/multipart-data-post-using-python-requests-no-multipart-boundary-was-found
    //    */
    //   // connect.setRequestHeader(
    //   //   'Content-type',
    //   //   'multipart/form-data'
    //   // )
    //   connect.onreadystatechange = function () {
    //     // Call a function when the state changes.
    //     if (
    //       connect.readyState === XMLHttpRequest.DONE &&
    //       connect.status === 200
    //     ) {
    //       // 请求结束后,在此处写处理代码
    //       console.log('this.files')
    //       vm.$emit('uploaded', connect.response)
    //     }
    //   }
    //   connect.send(data)
    //   connect.upload.addEventListener(
    //     'progress',
    //     function (event) {
    //       console.log(event.loaded, event.total)
    //     },
    //     false
    //   )
    // }
  }
}
</script>
<style  lang="less" scoped>
html {
  height: 100% !important;
}
#map_container{
      position:absolute;
      opacity:0;
      z-index:-1;
  }
body {
  height: 100% !important;
}
.nav {
  // height: 100% !important;
}
// 底部
 .guding {
    position: absolute;
    top: -100px;
    left: 0;
  }
.footer {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 51;
  box-sizing: border-box;
  height:.9rem;
  background: #32004b;
  width: 100%;
  border-top: 1px solid #e6e6e6;
}
.h {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
  font-size: .3rem;
}
.footer img {
  margin-top: .15rem;
  width:.8rem;
  height: .53rem;
}
.footer p {
  color: #fff;
 // text-shadow:2px 1px 2px #fff;
}
.footer .hh{
  height: 100%;
   display: flex;
  justify-content: center;
  align-items: center;
}
.footer .on {
  border-bottom: 2px solid #fff;
  border-width: 2px;
}
// 发布
#vue-img-uploader {
  position: fixed;
  top:0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  z-index: 100;
  height: 100%;
  width: 100%;
  background: #32004b;
  textarea{
    width: 6.5rem;
    height: 1rem;
    background: transparent;
    margin: 0.2rem .3rem;
    color: #fff;
    border: none;
    font-size: .24rem;
  }
  // 3个选择

 .db{
    width: 6.9rem;
    margin: 0.2rem .3rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width:100%;
    .lei{
    display: flex;
    max-width:2.5rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 2rem;
    align-items: center;
    font-size: .26rem;
    color: #32004b;
    background: #fff;
    border-radius: .5rem;
    padding: .1rem;
    margin: 0 .1rem;
   
    img{
      width: .3rem;
      height: .3rem;
      margin: 0 .1rem;
    }
  }
  .yin{
    display: flex;
    min-width: 2rem;
    max-width:2.5rem;
    align-items: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: .26rem;
    color: #32004b;
    background: #fff;
    border-radius: .5rem;
    padding: .1rem;
    margin: 0 .1rem;
    img{
      width: .3rem;
      height: .36rem;
      margin: 0 .1rem;
    }
  }
  .map{
    display: flex;
    width:75%;
    align-items: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: .26rem;
    color: #32004b;
    background: #fff;
    border-radius: .5rem;
    padding: .1rem;
    margin: 0 .1rem;
    img{
      width: .26rem;
      height: .33rem;
      margin: 0 .1rem;
    }
  }
 }
//   薪资
.xz{
    width: 78%;
  height: .6rem;
  margin: 0.2rem auto 0.2rem 15%;
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: .5rem;
  color: #32004b;
  overflow:hidden;
  div{
    font-size: .26rem;
    margin: 0 .2rem ;
    display: flex;
    align-items: center;
    img{
      width: .42rem;
      height: .42rem;
    }
  }
  input{
    width: 2rem;
    border: none;
    text-align: center;
    font-size: .26rem;
    margin-bottom:0;
  }
}
//  选择地址的弹出框
.address{
  width: 100%;
  height: 100%;
  background: #32004b;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  overflow: scroll;
  div{
    position: fixed;
    background: #32004b;
    top: 0;
    left: 0;
    width: 100%;
    height: .8rem;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:.01rem solid #fff;
    h1{
      font-size: .3rem;
    }
    h3{
      margin-right: .3rem;
      font-size: .24rem;
      width: 2em;
    }
     h2{
      margin-left: .3rem;
      font-size: .24rem;
      width: 2em;
    }
  }
  ul{
    margin-top: .8rem;
    width: 100%;
    display: flex;
    flex-direction: column;

    li{
      width: 6.9rem;
      margin: 0 .3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      border-bottom: .01rem solid #fff;
      font-size: .24rem;
      padding: .4rem 0;
      img{
        width: .4rem;
        height: .23rem;
      }
    }
  }
}
// 发布头部
  .fabu-head{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 6.9rem;
    height: 1rem;
    margin: 0 .3rem;
    img{
      display: flex;
      width: .26rem;
      height: .26rem;
    }
    .fa{
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: .1rem;
      color: #fff;
      font-size: .3rem;
      background: #ff0042;
      width: 1.5rem;
      height: .6rem;
    }
  }
  // 发布内容
  .con{
    display: flex;
    flex-wrap: wrap;
    margin:  0 .1rem;
  }
 .vue-thumbnail-wrapper {
    position: relative;
    margin: .15rem;
    display: flex;
    height: 1.5rem;
    width:1.5rem;
  }
  .del-button {
    position: absolute;
    margin: 5px;
    top: 0;
    right: 0;
    border-radius: 50%;
    background: #fff;
    height: 15px;
    width: 15px;
    line-height: 15px;
    text-align: center;
  }

  img {
    display: block;
    height: 1.5rem;
    width:1.5rem;
    object-fit: cover;
  }

  .loading {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    height: 100px;
    width: 100px;
    margin-right: 10px;
  }

  @keyframes donut-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .donut {
    display: inline-block;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #888;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: donut-spin 1.2s linear infinite;
  }

  label>.default {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    height: 1.5rem;
    width: 1.5rem;
    margin: .2rem;
    border: 1px solid #fff;
    color: #fff;
  }
}
// 内容
.nav span{
  display: flex;
  position: fixed;
  flex-direction: column;
  align-items: center;
  z-index: 99;
  height: 100%;
  width: 100%;
  top: 0;
  background: url('../../static/img/xx.png');
  background-size: cover;
  ul {
    margin-top: 60%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    li{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 33.33%;
      height: 1.7rem;
      margin-bottom: .3rem;
      img{
        width: 1.16rem;
        height: 1.16rem;
      }
      i{
        margin-top: .1rem;
        display: flex;
        color: #fff;
        font-size: .23rem;
      }
    }
  }
  .close{
    margin-top: .4rem;
    width: .8rem;
    height: .8rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
