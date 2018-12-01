<template>
    <div class="tuijianDetail">
        <!-- <Re :title="title"></Re> -->
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" style="color:#fff;">
            <ul class="rows">
                <li class="rowItem" v-for="(item,index) in list" :key="index" @click="toDetail(item)">
                    <img v-lazy="item.img_url" alt="">
                    <div class="bomText">
                        <span>{{item.module_name}}</span>{{item.descript}}
                    </div>
                </li>
            </ul>
        </mt-loadmore>
    </div>
</template>
<script>
    import '@/assets/css/tuijian.css';
    import { Lazyload } from 'mint-ui';
    import apiRequest from '@/library/apiRequest'
    import Re from '@/components/return'
import { setTimeout } from 'timers';
    export default {
        data(){
            return{ 
                title:"",
                module_id:'', //模块id
                page:1,  //页数
                rows:6, //每页条数
                list:[],
                allLoaded:false
            }
        },
        components:{
            // Re
        },
        mounted() {
            var that = this
            this.module_id = this.$route.query.id
            // this.title = this.$route.query.title
            this.initData()
        },
        methods:{
            //加载更多
            loadBottom(){
                var that = this
                that.page++
                that.initData()
                this.$refs.loadmore.onBottomLoaded();
            },

            //初始加载数据
            initData(){
             var that = this
                 apiRequest.post('/index.php',{c: 'Home', action: 'moduleList',uid: that.$local.uid,page:that.page,rows:that.rows,module_id:that.module_id},function(res){
                    console.log("获取分类列表")
                    console.log(res)
                        if(that.page == 1){
                            that.list = res.result.list
                        }else{
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
