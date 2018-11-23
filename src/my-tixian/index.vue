<template>
    <div class="moneyDetail">
         <Re :title="title"></Re>
         <div class="litItem" v-for="(item,index) in list" :key="index">
             <div class="left">
                 <div class="title_name">{{item.status_name}}</div>
                  <div class="dataTime">{{item.addtime}}</div>
             </div>
             <div class="right">
                 <div>{{item.real_money}}</div>
             </div>
         </div>
    </div>
</template>
<script>
import Re from '@/components/return'
import apiRequest from '@/library/apiRequest'
import { Toast } from 'mint-ui';

    export default {
        name: 'moneyDetail',
        components: {
            Re
        },
        data () {
            return {
                title: '提现记录',
                rows:10, //每页显示行数
                page:1, //当前页数
                list:null //数据信息
            }
        },
        mounted(){
            this.initData()
        },
        methods:{
            //初始化数据
            initData(){
                var that = this
                apiRequest.post('/index.php',{c: 'User', action: 'withdrawRecord', uid: that.$local.uid,link_url:location.href,rows:that.rows,page:that.page},function(res){
                    console.log("零钱明细")
                    console.log(res)
                    that.list = res.result
                })
            }
        }
    }
</script>
<style scoped>
    .moneyDetail .litItem{
        /* width:100%; */
        padding:15px 20px;
        display:flex;
        justify-content: space-between;
        align-items: center;
        border-bottom:1px solid #ff0042;
        border-top:1px solid #ff0042;
        color:#fff;
    }
    .moneyDetail .litItem .left .title_name{
        font-size:14px;
    }
    .moneyDetail .litItem .left .dataTime{
        font-size:12px;
        margin-top:2px
    }
    .moneyDetail .litItem .right{
        font-size:16px;
        font-weight:bold;
    }
</style>

