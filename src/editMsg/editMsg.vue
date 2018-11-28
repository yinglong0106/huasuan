<template>
    <div class="editMsg">
        <Re title="编辑资料"></Re>
        <div class="save">保存</div>
        <div class="edit">
            <div class="userImg"><img src="/static/img/a.png" alt=""></div>
            <div class="row">
                <div>昵称</div>
                <div><input type="text" v-model="userName"></div>
            </div>
            <div class="row">
                <div>划算号</div>
                 <div><input type="number" v-model="number"></div>
            </div>
            <div class="row">
                <div>性别</div>
                 <div><input type="text" v-model="sex"></div>
            </div>
            <div class="row">
                <div>性别</div>
                 <div><input type="text" v-model="address"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Re from '@/components/return'
    export default {
        data(){
            return{
                userName:'寡人已阅',
                number:'123456',
                sex:'男',
                address:'中国-福建-厦门'
            }
        },
        components:{
            Re
        }
    }
</script>
<style scoped>
    .save{
        position:absolute;
        top:0rem;
        right:0rem;
        color:#ff0030;
        font-size:13px;
        z-index:1;
        padding:3.5%;
    }
    .edit{
        border-top:1px solid #fff;
        width:100%;

    }
    .userImg{
        margin:0.65rem auto;
        text-align:center;
    }
    .userImg img{
        width:2rem;
        height:2rem;
        border-radius:50%;
        border:2px solid #f7eeef;
    }
    .row{
        color:#fff;
        font-size:13px;
        display: flex;
        align-items: center;
        padding:0rem 0.35rem;
        margin-bottom:0.2rem;
        
    }
    .row div:nth-child(1){
        width:1.2rem;
    }
    input{
        background:#32004B;
        border:none;
        outline:none;
        margin-bottom:0;
        width:4.8rem;
    }
</style>

