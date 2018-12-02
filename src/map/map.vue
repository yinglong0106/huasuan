<template>
    <div class="map"></div>
</template>
<script>
    import wx from 'weixin-js-sdk';
    import apiRequest from '@/library/apiRequest'
    export default {
        data(){
            return {
                config:null
            }
        },
        mounted(){
            var that = this
            console.log(that.$store.state)
            // alert(that.$store.state.lat)
            // alert(that.$store.state.lng)
             apiRequest.post('/index.php',{c: 'Home', action: 'shareConfig',link_url:location.href,id: '',type:1},function(res){
                    console.log("获取信息")
                    console.log(res)
                    that.config = res.result.config
                    wx.config({  
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。  
                        appId: that.config.appId, // 必填，公众号的唯一标识  
                        timestamp:that.config.timestamp, // 必填，生成签名的时间戳  
                        nonceStr: that.config.nonceStr, // 必填，生成签名的随机串  
                        signature:that.config.signature,// 必填，签名  
                        jsApiList: [   
                            'openLocation',  
                            'getLocation'  
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见官方文档附录2  
                    }); 
                    wx.ready(function(){  
                        that.getLocation();  
                    });  
                    wx.error(function(res){  
                        //alert("error");  
                    }); 
                })
              
        },
        methods:{
            getLocation(){
                var that = this
                wx.openLocation({  
                    latitude: that.$store.state.lat, // 纬度，浮点数，范围为90 ~ -90  
                    longitude: that.$store.state.lng, // 经度，浮点数，范围为180 ~ -180。  
                    name: '我现在在这里', // 位置名  
                    address: $("#nowAdd").text(), // 地址详情说明  
                    scale: 20, // 地图缩放级别,整形值,范围从1~28。默认为最大  
                    infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转  
                }); 
            }
        }
    }
    
</script>
