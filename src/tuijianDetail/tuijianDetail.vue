<template>
    <div class="tuijianDetail">
        <Re :title="title"></Re>
        <!-- <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" style="color:#fff;"> -->
            <div class="wrapper" ref="wrapper" :style="{height:windowHeight+'px'}">
                    <ul class="rows content">
                        <li class="rowItem" v-for="(item,index) in list" :key="index" @click="toDetail(item)">
                            <img v-lazy="item.img_url" alt="">
                            <div class="bomText">
                                <span>{{item.module_name}}</span>{{item.descript}}
                            </div>
                        </li>
                    </ul>
            </div>
        <!-- </mt-loadmore> -->
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import '@/assets/css/tuijian.css';
    import { Lazyload } from 'mint-ui';
    import apiRequest from '@/library/apiRequest'
    import Re from '@/components/return'
    import { List } from 'vant';
    import { setTimeout } from 'timers';
    export default {
        data(){
            return{ 
                title:"",
                module_id:'', //模块id
                page:1,  //页数
                rows:10, //每页条数
                list:[],
                allLoaded:false,
                windowHeight:''
            }
        },
        components:{
            Re
        },
        mounted() {
            var that = this
            this.module_id = this.$route.query.id
            this.title = this.$route.query.title
            // if(this.$local.checkBrowser()==99){
                that.windowHeight = this.$local.getViewportSize().height-45
            // }else{
            //     that.windowHeight = this.$local.getViewportSize().height
            // }
            
             that.initData()  
            this.scroll = new BScroll(that.$refs.wrapper, {
                // 上拉加载
                pullUpLoad: {
                    // 当上拉距离超过30px时触发 pullingUp 事件
                    threshold: -20
                    },
                    probeType:2,
                    mouseWheel: true, click: true, tap: true
                })
                that.scroll.on('pullingUp', () => {
                    console.log('处理上拉加载操作')
                    that.page=that.page+1
                    that.initData()  
                    setTimeout(() => {
                        // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
                        that.scroll.finishPullUp()
                    }, 2000)
                })
            
        },
        methods:{
            //加载更多
            // loadBottom(){
            //     var that = this
            //     that.page++
            //     that.initData()
            //     this.$refs.loadmore.onBottomLoaded();
            // },

            //初始加载数据
            initData(){
             var that = this
                apiRequest.post('/index.php',{c: 'Home', action: 'moduleList',uid: that.$local.uid,page:that.page,rows:that.rows,
                 module_id:that.module_id},function(res){
                    console.log("获取分类列表")
                    console.log(res)
                        if(that.page == 1){
                            that.list = res.result.list
                        }else{
                            console.log("第二页")
                            that.list = that.list.concat(res.result.list)
                        }   
                                     
                })         
                
            },
            toDetail(item){
                this.$router.push({name:'singleDetail',query:{id:item.id}})
            }
        }
    }
</script>
<style scoped>
body{
    height:100%;
}
    .wrapper {
        display: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        overflow:hidden;
    }
.content {
    width:100%;
    height:auto;
    }
</style>

