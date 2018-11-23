<template>
    <div class="detail">
        <div class="return"><Re class="return" :title="title"></Re></div>
        <div class="bottomNav" @click="tapNav" style="z-index:20;">
            <div id='0'><span :class="active==0?'active':''" id='0'>修改</span></div>
            <div id='1'><span :class="active==1?'active':''" id='1'>推广</span></div>
           <div id='2'><span :class="active==2?'active':''" id='2'>置顶</span></div>
        </div>

        <!-- 作品详情 -->
        <div class="myWork" v-if="active==0">
            <div class="workImg">
                <div class="oldImg">
                    <img :src="img_url" alt="">
                </div>
                <div class="oldImg add" >
                <input style="position: absolute; opacity:0;top: 0px; left: 0px; width:98%;bottom:0;font-size:12px;" type="file" name="img" enctype="multipart/form-data" class="guding" @change="getFile"  ref="uploadImg">
                    +
                </div>
            </div>
            <div class="message">
                <div class="row phone">
                    <div>联系电话:</div>
                    <input type="number" class="input" v-model="phoneNumber">
                </div>
                <div class="row phone" v-if="msg.info.is_sticky==1">
                    <div>置顶到期时间:</div>
                    <input class="input" v-model="daoqi" readonly>
                </div>
                 <div class="row phone">
                    <div>选择音乐:</div>
                    <div style="width:75%;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;" class="yin" @click="showMusic = true">{{title2.title}}</div>
                </div>
                 <div class="row phone">
                    <div>选择模块:</div>
                    <div style="width:75%;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;" class="yin" @click="showModule = true">{{module1.className}}</div>
                </div>
                 <div class="row">
                    <div >薪资:</div>
                     <div class="range">
                         <input class="xin" type="number" v-model="startMoney">
                         <span>~</span>
                         <input  class="xin" type="number" v-model="endMoney">
                     </div>
                </div>
                <div class="miaosu">
                    <div>描述</div>
                    <textarea name="" id="" cols="47" rows="6" v-model="descript"></textarea>
                </div>

            </div>
            <div class="btnGroup">
                <div @click="edit">修改</div>
                <div @click="shangjia">{{msg.info.status==0?'上架':'下架'}}</div>
                <div @click="deleteMsg">删除</div>
            </div>
        </div>
        
        <!-- 红包推广 -->
        <div class="tuiguang" v-if="active==1">
            <div class="tuiItem">
                <div class="left">
                    <span>推</span>
                    <div>总金额</div>
                </div>
                <div class="right">
                    <input type="number" v-model="money" placeholder="0.00">
                    <div>元</div>
                </div>
            </div>
            <div class="suiji">每人抽到金额随机</div>
            
             <div class="tuiItem">
                <div class="left">
                    <div>红包个数</div>
                </div>
                <div class="right">
                    <input type="number" v-model="moneyNumer" placeholder="填写个数">
                    <div>个</div>
                </div>
            </div>
             <div class="tuiItem">
                <div class="left">
                    <div>留言</div>
                </div>
                <div class="right">
                    <input type="number" v-model="liuyan" placeholder="恭喜发财，大吉大利">
                    <div>个</div>
                </div>
            </div>
            <div class="allMoney">￥{{money}}</div>
            <div class="saiqian" :class="saveMoney==true?'saveMoney':''" @click="chongQian">塞钱进红包</div>
        </div>

        <!-- 作品置顶 -->
        <div class="tuiguang" style="padding:1.5rem 0.4rem;" v-if="active==2">
             <div class="tuiItem">
                <input type="text" disabled v-model="zhidingName" style="text-align:center;font-size:0.32rem;width:90%;" placeholder="选择置顶时长"> 
                <div class="right">
                    <img @click="showZhi" src="/static/img/single.png" alt="">
                </div>
            </div>
             <div class="allMoney" style="margin:0.6rem 0;">￥{{zhiMoney}}</div>
            <div class="saiqian" :class="payZhimoney?'bbg':''" @click="payZhi">确认支付</div>
            <div class="select" v-if="showZhiding">
                <img class="upSingle" src="/static/img/single2.png" alt="">
                <div v-for="(item,index) in msg.topInfo" :key="index" class="secItem" :class="zhidingIndex==item.id?'bbg':''" @click="secZhi(item)">{{item.name}} {{item.money}}元</div>
            </div>
        </div>

        <!-- 选择音乐 -->
        <mt-actionsheet :actions="musicArr" v-model="showMusic"></mt-actionsheet>
         <mt-actionsheet :actions="moduleArr" v-model="showModule"></mt-actionsheet>
    </div>
</template>
<script>
import Re from '@/components/return'
import apiRequest from '@/library/apiRequest'
import { Toast } from 'mint-ui';
import { Actionsheet } from 'mint-ui';
import { setTimeout } from 'timers';

export default {
     name: 'detail',
    components: {
        Re,
    },
    
    data(){
        return {
            title:'作品详情',
            active:0 , //0为修改，1为推广 2为置顶
            img_url:'', //作品图片
            phoneNumber:'', //电话
            startMoney:'',  //起始薪资
            endMoney:'',  //末端薪资
            descript:'', //描述
            money:0.00, //推广红包金额
            moneyNumer:'', //红包个数
            liuyan:'',  //红包留言
            daoqi:'' , //置顶到期时间
            msg:null, //初始信息对象
            title2:{title:''},
            module1:{}, //模块
            showMusic:false, //显示选择音乐
            musicArr:[], //选择音乐数组
            module:null, //选择的模块
            moduleArr:[] ,//模块数组
            showModule:false, //显示模块
            files:[], //上传文件
            id:'',//模块id,
            saveMoney:false, //是否可以塞钱进红包
            paydata:'' , //支付参数
            payFlag:true, //避免多次支付
            zhidingIndex:'', //选择的置顶选择
            zhidingName:'', //置顶名称
            showZhiding:false, //显示置顶选择
            zhiMoney:0.00 , //支付的置顶金额
            payZhimoney:false,
            // status:'' //为0是下架状态，按钮就是为上架
        }
    },
    watch:{
        money(){
            if(this.money&&this.moneyNumer){
                this.saveMoney = true
            }else{
                this.saveMoney = false
            }
        },
         moneyNumer(){
            if(this.money&&this.moneyNumer){
                this.saveMoney = true
            }else{
                this.saveMoney = false
            }
        }
    },
    mounted(){
        console.log("params:")
        console.log(this.$route.params.id)
        this.id = this.$route.params.id
        this.initData()
    },
    methods:{
        //初始化信息
            initData(){
                var that = this
                apiRequest.post('/index.php',{c: 'Message', action: 'editPage', message_id: this.id, uid: that.$local.uid},function(res){
                    console.log("详情初始数据")
                    console.log(res)
                    that.msg = res.result
                    that.phoneNumber = res.result.info.telephone
                    that.descript = res.result.info.descript
                    that.startMoney =  res.result.info.start_salary
                    that.endMoney = res.result.info.top_salary
                    that.img_url = res.result.info.img_url
                    that.title2.url = res.result.info.music_url
                    that.title2.title = res.result.info.music_title
                    that.daoqi =  res.result.info.sticky_time
                    that.is_sticky = res.result.info.is_sticky
                    //音乐
                    that.musicArr =  res.result.music.map(item=>{
                        return {
                            name :item.title,
                            id:item.id,
                            method:that.getMusic,
                            url:item.url
                        }
                    })
                    that.module1 = res.result.module.filter(item=>{
                            return item.checked
                    })[0]
                    console.log(that.module1)
                    //模块
                    that.moduleArr = that.msg.module.map(item=>{
                        return {
                            name :item.className,
                            id:item.id,
                            method:that.getModule,
                            url:item.imageUrl
                        }
                    })
                    
                })
            },

            //塞钱进红包
            chongQian(){
                var that = this
                if(!this.saveMoney){
                    return false
                }
                if(that.payFlag){
                    that.payFlag = false
                    apiRequest.post('/index.php',{c: 'Message', action: 'redpacketPay',uid:that.$local.uid,title:that.liuyan,money:that.money,number:that.moneyNumer,message_id:that.id},function(res){
                            console.log(res)
                            that.paydata = JSON.stringify(res.result.msg)
                            that.callpay()
                        })
                }
                
            },

            //支付置顶金额
            payZhi(){  
                var that = this
                if(!this.payZhimoney){
                    return false
                }
                if(that.payFlag){
                    that.payFlag = false
                    apiRequest.post('/index.php',{c: 'Message', action: 'stickPay',uid:that.$local.uid,message_id:that.id,top_id:that.zhidingIndex},function(res){
                            console.log(res)
                            that.paydata = JSON.stringify(res.result.msg)
                            that.callpay()
                        })
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

        //切换底部导航栏
        tapNav(e){
            console.log(e.target.id)
            this.active = e.target.id
            if(e.target.id==0){
                this.title = '作品详情'
            }else if(e.target.id==1){
                this.title = '红包推广'
            }else{
                this.title = '作品置顶'
            }
        },
        //选择模块
        getModule(action){
            this.module1 = {
                    className:action.name,
                    id:action.id,
                    url:action.imageUrl
                }
            },
        //信息保存
        edit(){
            var that = this
            apiRequest.post('/index.php',{c: 'Message', action: 'editSave', id: that.id,descript:that.descript,telephone: that.phoneNumber,
            module_id:that.module1.id,start_salary:that.startMoney,top_salary:that.endMoney,img_url:that.img_url,music_url:that.title2.url},function(res){
                console.log(res)
                Toast(res.msg);
                setTimeout(function(){
                        console.log("跳转")
                        that.$router.push({path: 'my',query:{user:'user'}})
                    },2000)
                console.log({c: 'Message', action: 'editSave', id: that.id,descript:that.descript,telephone: that.phoneNumber,
            module_id:that.module1.id,start_salary:that.startMoney,top_salary:that.endMoney,img_url:that.img_url,music_url:that.title2.url})
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
                        that.img_url = resData.result.host + resData.result.msg
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

        //删除作品
        deleteMsg(){
            var that = this
            apiRequest.post('/index.php',{c: 'Message', action: 'delete',uid:that.$local.uid,message_id:that.id},function(res){
                console.log(res)
                Toast(res.msg);
                setTimeout(function(){
                    that.$router.push({path: '/my',query:{user:'user'}})
                },2000)
            })
        },

        //调用微信JS api 支付
        //将接口返回的data.msg赋值给paydata
        jsApiCall() {
            var that = this
            var data = JSON.parse(this.paydata);
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
                data,
                function (res) {
                    that.payFlag = true
                    WeixinJSBridge.log(res.err_msg);
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                       that.$router.push({path: '/my',query:{user:'user'}})
                    } else {
                        //微信错误信息调试
                        //alert(res.err_desc);
                        that.$vux.toast.text('支付失败！', 'middle')
                    }
                }
            );
        },
                
        callpay() {
            var that = this
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', that.jsApiCall, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', that.jsApiCall);
                        document.attachEvent('onWeixinJSBridgeReady', that.jsApiCall);
                    }
                } else {
                    that.jsApiCall();
                }
            },

        //点击置顶选项
        secZhi(item){
            var that = this
            that.zhidingIndex = item.id //置顶id
            that.zhidingName = item.name //置顶时长
            that.showZhiding = false //隐藏置顶
            that.zhiMoney = item.money //置顶支付金额
            that.payZhimoney = true
        },
        
        //是否显示置顶选项
        showZhi(){
            this.showZhiding = true
        },

        //上架或下架
        shangjia(){
            var that = this
             apiRequest.post('/index.php',{c: 'Message', action: 'setStatus',uid:that.$local.uid,message_id:that.id},function(res){
                console.log(res)
                Toast(res.msg);
                setTimeout(function(){
                    that.$router.push({path: '/my',query:{user:'user'}})
                },2000)
            })
        }
                
    },

    
}
</script>
<style scoped>
    .return{
        border-bottom:1px solid #e1e1e1;
        
    }
    .bottomNav{
        position: fixed;
        z-index:1;
        border-top:1px solid #e1e1e1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        bottom:0;
        left:0;
        right:0;
        background:#32004b;
    }
    .acc{
        border:1px solid #ff0042;

    }
    .bbg{
        background:#ff0042 !important;
        color:#fff!important;
    }
    .bottomNav div{
        flex:1;
         text-align: center;
    }
    .bottomNav span{
        color: #fff;
        padding: 0.2rem 0;
        font-size: 0.29rem;
        text-align: center;
        display: inline-block;
    }
    .bottomNav .active{
        border-bottom:3px solid #e1e1e1;
    }
    .myWork{
        padding-bottom:60px;
    }
    .myWork .workImg{
        padding:0.5rem 0.7rem;
        display: flex;
        align-items: center;
        color:#fff;
    }
    .myWork .workImg .oldImg{
        margin-right:0.4rem;
        width:2.2rem;
        height:3rem;
    }
    .myWork .workImg .oldImg img{
        width:100%;
        height:100%;
    }
    .myWork .workImg  .add{
        background:#fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size:1.2rem;
        color:#ff0042;
        position:relative;
    }
    .myWork .message{
        padding:0rem 0.45rem;
        color:#fff;
    }
    .myWork .message .row{
        display: flex;
        align-items: center;
        font-size:0.29rem;
        border-bottom:1px solid #e1e1e1;
        padding:0.2rem 0;
        margin-top:0.2rem;
    }
    .myWork .message .row div:nth-child(1){
          margin-right:0.2rem;
    }
    .myWork .message input,.tuiguang input{
         outline: none;
        background:none;
        border:0;
        font-size:0.29rem;
    }   
    .myWork .message .phone .input{
        color:#fff;
    }
    .myWork .message .range{
        background:#fff;
        border-radius:1rem;
        padding:0 0.1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
       width:60%;
       padding:2px 0;
    }
    .myWork .message .range .xin{
        color:#222;
        flex:2;
        width:25%;
        text-align: center;
    }
    .myWork .message .range span{
        flex:1;
        color:#222;
        width:10%;
        text-align: center;
    }
    .myWork .message .miaosu{
        color:#fff;
        font-size: 0.29rem;
        margin-top:0.2rem;
        padding:0.2rem 0;
    }
    .myWork .message .miaosu textarea{
        margin-top: 0.2rem;
    }
    .myWork .module .message  .mudule_add{
        display:flex;
        justify-content: center;
        align-items: center;
        flex-wrap:wrap;
    }
    .myWork .module .message  .mudule_add .module-item{
        text-align: center;
        width:30%;
    }
    .myWork .btnGroup{
        padding:0rem 0.5rem;
        margin:0.8rem 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .myWork .btnGroup div{
        text-align: center;
        color:#fff;
        border-radius:10px;
        width:1.5rem;
        padding:0.1rem 0;
    }
    .myWork .btnGroup div:nth-child(1){
        background:#ff0042;
    }
      .myWork .btnGroup div:nth-child(2){
        background:#ffb900;
    }
    .myWork .btnGroup div:nth-child(3){
        border:1px solid #fff;
    }
    
    .tuiguang{
        padding:0.8rem 0.5rem;
        position: relative;
    }
    .tuiItem{
        background:#fff;
        border-radius:5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0.25rem 0.35rem;
        font-size:0.27rem;
        color:#111;
        margin-top:0.4rem;
    }
    .tuiItem:nth-child(2){
        margin-top:0.2rem !important;
    }
    .tuiguang .tuiItem .left,.tuiguang .tuiItem .right{
        display: flex;
        align-items: center;
    }
    .tuiguang .tuiItem .left span{
        background:#ffb900;
        color:#fff;
        font-size:0.2rem;
        padding:0 2px;
        margin-right:0.1rem;
    }
    .tuiguang .tuiItem .right input{
        outline: none;
        background:none;
        border:0;
        text-align: right;
        margin-right:0.2rem;
    }
    .tuiguang .suiji{
        color:#fff;
        font-size:0.2rem;
        padding:0 0.4rem;
        margin-top:0rem;
    }
    .tuiguang .allMoney{
        padding:0 0.35rem;
        margin:0.8rem 0;
        font-size:0.75rem;
        text-align: center;
        color:#fff;
    }
    .tuiguang .saiqian{
        background:#fb624e;
        border-radius:5px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding:0.25rem 0.35rem;
        font-size:0.32rem;
        color:#fff;
        margin-top:0.4rem;
    }
    .saveMoney{
        background:#ff0000!important;
    }
    .tuiItem .right img{
        width:0.5rem;
    }
    .select{
        position: absolute;
        top:3.2rem;
        background:#fff;
        width:89%;
        border-radius:5px;
        height:20px;
        z-index:10;
    }
    .secItem{
        border-bottom: 1px solid #ff0042;
        text-align: center;
        padding:0.25rem 0;
        background:#fff;
        color:#32004b;
    }
    .secItem:first-child{
           border-top-left-radius: 5px;
           border-top-right-radius: 5px;
    }
    .secItem:last-child{
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .upSingle{
        width:0.5rem;
        position:absolute;
        top:-0.35rem;
        right:0.3rem;
    }
</style>

