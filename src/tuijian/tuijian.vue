<template>
    <div class="tuijian">
        <Re title="推荐"></Re>
        <div class="tui_select">
            <div v-for="(item,index) in list" :key="index" @click="toDetail(item)">{{item.className}}</div>
        </div>
    </div>
</template>
<script>
    import Re from '@/components/return'
    import apiRequest from '@/library/apiRequest'
    import '@/assets/css/tuijian.css';
    export default {
        data(){
           return {
               list:null
           }
        },
        mounted(){
            var that = this
            apiRequest.post('/index.php',{c: 'Home', action: 'getModule',uid: that.$local.uid},function(res){
                    console.log("获取分类信息")
                    console.log(res)
                    that.list = res.result
                })
        },
        components:{
            Re 
        },
        methods:{
            toDetail(item){
                console.log(item)
                this.$router.push({
                    name:'tuijianDetail',
                    query:{id:item.id,title:item.className}
                })
            }
        }
    }
</script>



