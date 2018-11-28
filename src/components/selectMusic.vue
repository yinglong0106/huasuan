<template>
    <div class="selectMusic">
        <div class="topNav">
            <i class="iconfont icon-cha"></i>
            <div class="title">选择音乐</div>
            <div></div>
        </div>
        <div class="search">
            <i class="iconfont icon-sousuo"></i>
            <input type="text" placeholder="搜索歌曲名称">
        </div>
        <div class="selectType">
            <div>热门推荐</div>
            <div class="secactive">我收藏的</div>
        </div>
        <ul>
            <li class="li">
                <div class="liLeft">
                    <img src="/static/img/a.png" alt="">
                    <div class="name">
                        <div>沙漠骆驼</div>
                        <div>展展与罗罗</div>
                    </div>
                </div>
                <div class="right">
                    <i class="iconfont icon-star"></i>
                    <i class="iconfont icon-play"></i>
                </div>
            </li>
            <li class="li">
                <div class="liLeft">
                    <img src="/static/img/a.png" alt="">
                    <div class="name">
                        <div>沙漠骆驼</div>
                        <div>展展与罗罗</div>
                    </div>
                </div>
                <div class="right">
                    <i class="iconfont icon-star"></i>
                    <i class="iconfont icon-play"></i>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return{

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
    .li{
        width:100%;
        box-sizing:border-box;
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
   .li .right .iconfont:nth-child(1){
       color:#222;
       font-size:25px;
   }
   .li .right .iconfont:nth-child(2){
        color:#222;
       font-size:25px;
       color:#777;
       margin-left:0.1rem;
   }
</style>

