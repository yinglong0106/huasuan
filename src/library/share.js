import Vue from 'vue'
// import { WechatPlugin } from 'vux'
import apiRequestModule from '@/library/apiRequest'
import wx from 'weixin-js-sdk';
// Vue.use(WechatPlugin) //使用微信插件

const wxShare = (obj,callback,errback)=>{
    // console.log(obj,callback);
  
    if(obj){
        var title = obj.title==undefined||obj.title==null?'划算':obj.title;
        var link = obj.link==undefined||obj.link==null?window.location.href:obj.link;
        var desc = obj.desc==undefined||obj.desc==null?'划算':obj.desc;
        // var imgUrl = obj.imgUrl==undefined||obj.imgUrl==null?'http://api.91zhangtu.com/images/member_portrait_logo.jpg':obj.imgUrl;
        // var debug = obj.debug==true?true:false;
        var imgUrl = obj.imgUrl;
        var debug = true
    }else{
        alert('请传分享参数');
    }
   
    // link = encodeURIComponent(link);
    //微信分享
    apiRequestModule.post('index/weixin/weixin-jssdk-params.html',{url:link},
    function(res){
        Vue.wechat.config(res);

        Vue.wechat.ready(function () {
            //分享到朋友圈
            Vue.wechat.onMenuShareTimeline({
                title:title, // 分享标题
                link: link, // 分享链接
                desc: desc, // 分享描述
                imgUrl:imgUrl, // 分享图标
                success: function () {
                    callback && callback();
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    errback&&errback()
                    // 用户取消分享后执行的回调函数
                }
            });
            //分享到朋友
            Vue.wechat.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                    callback && callback();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    errback&&errback()
                }
            });
            //分享到QQ
            Vue.wechat.onMenuShareQQ({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    callback && callback();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    errback&&errback()
                }
            });

            //分享到QQ空间
            Vue.wechat.onMenuShareQZone({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function () {
                   // 用户确认分享后执行的回调函数
                   callback && callback();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    errback&&errback()
                }
            });

            //分享到腾讯微博
            Vue.wechat.onMenuShareWeibo({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    callback && callback();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    errback&&errback()
                }
            });
        })
        console.log('分享啦啦');
    },
    function(err){
        console.log(err)
    },
    false);

    //ios机需要刷新一次才能正常分享
    let isIOS = function() {//如果是苹果机，分享完成后刷新页面
                var isIphone = navigator.userAgent.includes('iPhone');
                var isIpad = navigator.userAgent.includes('iPad');
                return isIphone || isIpad;
            };
            if (isIOS()) {
            
            	if(this.stroe.get('isrefresh') == 1){
            		 this.$router.go(0)
            	}
        }

}


export {wxShare}

