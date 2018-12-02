import apiRequest from '@/library/apiRequest'
let local = {
    // uid:17785,
    uid:0,
    serverHost:'https://m.xmctime.com/hsapi', //站点域名
  save (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  fetch (key) {
    return JSON.parse(localStorage.getItem(key)) || false
  },
  getCode(url,data,that){
      apiRequest.post(url,data,function(data){
                        that.$vux.toast.text('发送成功', 'middle')
                        that.showVer = false
                        var time = setInterval(function(){
                            that.count--
                            if(that.count<=0){
                                clearInterval(time)
                                that.showVer = true
                                that.count = 60;
                            }
                        },1000)
                    },function(err){
                            that.$vux.toast.text(err, 'middle')
                    });
    },
    //浏览器宽高
    getViewportSize(){
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
          };
    },
    //判断浏览器环境
    checkBrowser () {
        var ua = window.navigator.userAgent.toLowerCase()
        if (/MicroMessenger/.test(window.navigator.userAgent)) { //微信浏览器返回0
            return 0;
        }
           //其他情况是普通浏览器
          return 99;
    },
    
}

export default {
  install: function (vm) {
    vm.prototype.$local = local
  }
}
