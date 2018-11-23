
import axios from 'axios'
import qs from 'qs';
import Vue from 'vue'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';

let apiRequest  = {
    
    /**
     * @param showLoading  是否显示loading true是。false否
     * @return axios 对象类型
     */
    buildHttpObj:function(showLoading){
        return axios.create({
            baseURL:"https://m.xmctime.com/hsapi",
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            transformRequest: [function (data) {
                data = qs.stringify(data);
                if(showLoading){
                    Indicator.open('加载中...');
                }
                return data;
            }],
             transformResponse:[function(data){          
                // Vue.$vux.loading.hide()
                return data;
            }],
            responseType:'json'
        });
    },

    /**
     * @param url 接口地址。例如 /index/index/login.html
     * @param data  对象类型值。需要post到第接口的参数值
     * @param okCallback 接口处理成功时[code=200]，调用该方法。 参数值 function(data)
     * @param failCallback 接口处理成功时[code=100]，调用该方法。 参数值 function(data)
     * @param showLoading  是否显示loading true是。false否
     */
    post:function(url,data,okCallback,showLoading,errBack){
        showLoading = typeof(showLoading) == "undefined"?true:showLoading;
        let HTTP = this.buildHttpObj(showLoading); 
        HTTP.post(url, data,{timeout: 1000 * 60 * 2})
        .then(function (response) {
            //关闭加载动画
            Indicator.close();
            
            if(response.data.code == '200'){//接口处理成功
                if(okCallback){
                    okCallback(response.data);
                }
            }else if(response.data.code == '100'){ //接口报错
                Toast(response.data.msg);
                console.log(response)
                errBack && errBack()
            }else if(response.data.code == '301'){  //登录过期，重新登录
                location.href=response.data.result.url
            } 
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export default apiRequest;