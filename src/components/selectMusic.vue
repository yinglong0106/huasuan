<template>
    <div class="selectMusic" >
        <div class="topNav">
            <i class="iconfont icon-cha" @click="close"></i>
            <div class="title">选择音乐</div>
            <div></div>
        </div>
        <div class="search">
            <i class="iconfont icon-sousuo" @click="write"></i>
            <input type="text" v-model.lazy="sousuoValue" placeholder="搜索歌曲名称" @blur="write">
        </div>
        <div class="selectType">
            <div :class="{'secactive':type==1}" @click="type=1">热门推荐</div>
            <div :class="{'secactive':type==2}" @click="type=2">我收藏的</div>
        </div>
        <!-- <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"> -->
      <van-list
            v-model="loading"
            :finished="finished"
            @load="initData"
            :offset="30">
            <ul class="content">
                <li class="li" v-for="(item,index) in list" :key="index">
                    <div class="liLeft" @click="secMusic(item,index)">
                        <img :src="item.img_url" alt="">
                        <div class="name">
                            <div>{{item.title}}</div>
                            <div>{{item.author}}</div>
                        </div>
                    </div>
                    <div class="right">
                        <i class="iconfont" :class="item.status==1?'icon-active_star':'icon-star'" @click="shoucang(item)"></i>
                        <i class="iconfont" :class="item.isPlay == true?'icon-pause':'icon-play'" @click="playMusic(index,item)"></i>
                        <audio loop :class="['musicfx'+index,'audio']"  controls="controls" style="opacity:0;position:absolute;z-index:1;">
                            <source class="source" :src="item.fullurl" type="audio/mp3" ref="musicfx"/>
                        </audio>
                    </div>
                </li>
            </ul>
        </van-list>
        <!-- </mt-loadmore> -->
    </div>
</template>
<script>
    import apiRequest from '@/library/apiRequest'
    import { Toast } from 'mint-ui';
    import BScroll from 'better-scroll'
import { setTimeout } from 'timers';
    export default {
        props:["show"],
        data(){
            return{
                type:1,  //1为推荐,2为收藏
                rows:10, //每页请求的数量
                page:1,  //页数
                list:[],
                sousuoValue:'', //搜索框的值
                selectItem:null,  //已选音乐
                allLoaded:false,
                 loading: false,
                finished: false,
                flag:true
            }
        },
        computed:{
            initShow(){
                return this.show
            }
        },
        mounted(){
            var that = this
            this.list = []
            // this.initData()
            $('.li').each(item=>{
                    console.log(item) 
                    $('.li').eq(item).removeClass("li_active")
            })

            // this.scroll = new BScroll(that.$refs.wrapper1, {
            //     // 上拉加载
            //     pullUpLoad: {
            //         // 当上拉距离超过30px时触发 pullingUp 事件
            //         threshold: -30
            //         },
            //          probeType:2,
            //         mouseWheel: true, click: true, tap: true
            //     })
            //     that.scroll.on('pullingUp', () => {
            //         console.log('处理上拉加载操作')
            //         that.page=that.page+1
            //         that.initData()  
            //         setTimeout(() => {
            //             // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
            //             that.scroll.finishPullUp()
            //         }, 2000)
            // })

        },
        watch:{
            type(){
                this.page = 1
                this.initData()
            }
        },
        methods:{
        //加载更多
            // loadBottom(){
            //     var that = this
            //     that.page++
            //     that.initData()
            //     this.$refs.loadmore.onBottomLoaded();
            // },
            //关闭音乐弹窗
            close(){
                var that = this
                this.$emit("update:show",!this.initShow)
                $('.audio').each(item=>{
                    console.log(item) 
                    $('.audio')[item].pause()
                })
                this.page = 1
                that.initData()
            },

            //初始化数据
            initData(){
                var that = this
                apiRequest.post('/index.php',{c: 'Message', action: 'musicList',uid: that.$local.uid,type:that.type,rows:that.rows,page:that.page,keyword:that.sousuoValue},function(res){
                    console.log("获取音乐类信息")
                    console.log(res)
                    that.sousuoValue = ''
                    if(that.flag){
                        that.flag = false
                        that.list = that.list.concat(res.result)
                        that.page++
                    }
                    that.loading = false;
                    setTimeout(function(){
                        that.flag = true
                    },1000)
                   
                },false,function(){
                     // 数据全部加载完成
                     that.flag = false
                    that.loading = false;
                    that.finished = true;
                    console.log(that.page)
                })
            },
            
            //失去焦点
            write(){
                console.log("失去焦点")
                console.log(this.sousuoValue)
                var that = this
                if(that.sousuoValue){
                    this.page = 1;
                    that.initData()
                }
                    
            },

            //收藏
            shoucang(item){
                var that = this
                console.log(item)
                item.status = item.status==1?0:1
                 apiRequest.post('/index.php',{c: 'Message', action: 'collectMusic',uid: that.$local.uid,collect_type:item.status==1?1:2,music_id:item.id},function(res){
                    console.log("收藏音乐")
                    console.log(res)
                     Toast(res.msg);
                })
            },

            // 播放或暂停音乐
            playMusic(index,item){
                    console.log("点击播放音乐")
                    console.log($(`.musicfx${index}`)[0].paused)
                    if($(`.musicfx${index}`)[0].paused){
                         $(`.musicfx${index}`)[0].play()
                         item.isPlay = true
                    }else{
                        $(`.musicfx${index}`)[0].pause()
                        item.isPlay = false
                    }
                       
            },

            //选中某项音乐
            secMusic(item,index){
                var that = this
                $('.li').each(item=>{
                    console.log(item) 
                    $('.li').eq(item).removeClass("li_active")
                })
                $('.li').eq(index).addClass("li_active")
                this.selectItem = item
                this.$emit("music",item)
                this.close()
            }
        }

    }
</script>
<style scoped>
    .selectMusic{
        background:#fff;
        border-radius:10px;
        height: 100%;
    }
    .topNav{
        display: flex;
        justify-content: space-between;
        padding:0.15rem 0.2rem;
        align-items: center;
    }
    .icon-cha{
        font-size:22px;
    }
    .title{
        font-size:16px;
        font-weight:bold;
    }
    .search{
        width:90%;
        background:#f1f1f1;
        display:flex;
        align-items: center;
        height:0.7rem;
        line-height: 0.7rem;
        margin:0 auto;
        border-radius:0.1rem;
    }
    .icon-sousuo{
        font-size:20px;
        color:gray;
        width:28px;
        line-height: 0.7rem;
        text-align:right;
    }
    
    .search input{
        height:100%;
        flex:1;
        margin-bottom:0;
        border:0;
        background:#f1f1f1;
        outline: none;
    }
    .selectType{
        width:100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size:16px;
        font-weight: bold;
        margin:0.25rem 0;
        padding:0.1rem
    }
    .selectType .secactive{
        border-bottom:2px solid #ff0030;
    }
    .selectType div{
        text-align:center;
    }
    .li_active{
        /* border:2px solid #ff0030; */
        box-shadow: 0 0 10px #ff0030;
    }
    .li{
        /* width:100%; */
        margin:0 0.2rem;
        box-sizing:border-box;
        border-radius:8px;
        padding:0.15rem 0.2rem;
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
    .li .liLeft{
        display:flex;
        align-items: center;
    }
   .li .liLeft .name{
       width:4rem;
       white-space: nowrap;
       overflow: hidden;
       text-overflow: ellipsis;
       margin-left:0.2rem;
   }
   .li .liLeft .name div:nth-child(1){
       font-size:14px;
       font-weight:bold;
   }
   .li .liLeft .name div:nth-child(2){
       font-size:12px;
       margin-top:0.08rem;
   }
   .li .liLeft img{
       width:1.2rem;
       height:1.2rem;
       border-radius:0.1rem;
   }
   .li .right{
       position:relative;
   }
   .li .right .iconfont:nth-child(1){
       color:#333;
       font-size:25px;
   }
   .li .right .icon-active_star{
       color:#edce01 !important;
   }
   .li .right .iconfont:nth-child(2){
        color:#222;
       font-size:25px;
       color:#777;
       margin-left:0.1rem;
   }
</style>

