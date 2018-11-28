<template>
    <div class="tuijianDetail">
        <Re :title="title"></Re>
        <div class="rows">
            <div class="rowItem">
                <img src="/static/img/a.png" alt="">
                <div class="bomText">
                    <span>#汽车服务</span>诚信二手车出售诚信二手车出售
                </div>
            </div>
             <div class="rowItem">
                <img src="/static/img/a.png" alt="">
                <div class="bomText">
                    <span>#汽车服务</span>诚信二手车出售诚信二手车出售
                </div>
            </div>
             <div class="rowItem">
                <img src="/static/img/a.png" alt="">
                <div class="bomText">
                    <span>#汽车服务</span>诚信二手车出售诚信二手车出售
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import '@/assets/css/tuijian.css';
    import Re from '@/components/return'
    export default {
        data(){
            return{
                title:"汽车服务"
            }
        },
        components:{
            Re
        }
    }
</script>
