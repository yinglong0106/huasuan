<template>
    <div class="editMsg">
        <Re title="编辑资料"></Re>
        <div class="save" @click="save">保存</div>
        <div class="edit">
            <div class="userImg">
                <img :src="userInfo.imageUrl" alt="">
               <input type="file" name="img" enctype="multipart/form-data" class="uploadImg" @change="getFile" ref="uploadImg">
            </div>
            <div class="row">
                <div>昵称</div>
                <div><input type="text" v-model="userInfo.nikeName"></div>
            </div>
            <div class="row">
                <div>真实姓名</div>
                <div><input type="text" v-model="userInfo.realName"></div>
            </div>
            <div class="row">
                <div>划算号</div>
                 <div><input type="number" v-model="userInfo.id" disabled></div>
            </div>
             <div class="row">
                <div>生日</div>
                 <div><input type="birthday" v-model="userInfo.birthday"></div>
            </div>
            <div class="row">
                <div>性别</div>
                 <div><input type="text" v-model="userInfo.sex"></div>
            </div>
            <div class="row">
                <div>地区</div>
                 <div class="threeInput">
                     <input type="text" v-model="userInfo.Province">
                     <input type="text" v-model="userInfo.City">
                     <input type="text" v-model="userInfo.QuId">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Re from '@/components/return'
import apiRequest from '@/library/apiRequest'
import { Toast } from 'mint-ui';
import { setTimeout } from 'timers';
    export default {
        data(){
            return{
                userInfo:null,
                files:null,
            }
        },
        computed:{
            
        },
        created(){
            var that = this
             apiRequest.post('/index.php',{c: 'User', action: 'editPage',uid: that.$local.uid},function(res){
                // that.list = res.result
                console.log("编辑页面")
                console.log(res)
                that.userInfo = res.result
                // that.Province = res.result.Province
                // that.City = res.result.City
                // that.QuId = res.result.QuId
            })
        },
        components:{
            Re
        },
        methods:{
            //保存编辑信息
            save(){
                var that = this
                for(var key in that.userInfo){
                    if(!that.userInfo[key]){
                        Toast('字段不能为空')
                        return false
                    }
                }
                 apiRequest.post('/index.php',{c: 'User', action: 'editSave',uid: that.$local.uid,imageUrl:that.files?that.files[0].path:that.userInfo.imageUrl,nikeName:that.userInfo.nikeName,
                 sex:that.userInfo.sex,birthday:that.userInfo.birthday,realName:that.userInfo.realName,Province:that.userInfo.Province,City:that.userInfo.City,QuId:that.userInfo.QuId},function(res){
                    console.log("保存")
                    console.log(res)
                    Toast(res.msg)
                    setTimeout(function(){
                        that.$router.push({path: 'my',query:{user:'user'}})
                    },1500)
                    
                })
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
                            that.files = []
                            that.files.push({
                                src:resData.result.host + resData.result.msg,
                                name:that.$refs.uploadImg.files[0].name,
                                path: resData.result.msg
                            })
                            that.userInfo.imageUrl =  that.files[0].src
                        
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
        position:relative;
    }
    .userImg img{
        width:2rem;
        height:2rem;
        border-radius:50%;
        border:2px solid #f7eeef;
    }
    .uploadImg{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        opacity: 0;;
        z-index:1;
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
    .threeInput{
        display:flex;
        align-items:center;
        width:100%;
        box-sizing: border-box;
    }
    .threeInput input{
        width:30% !important;
    }
</style>

