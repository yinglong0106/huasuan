import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//定义容器
let store = new Vuex.Store({
    state:{
        lng:'', //经度
        lat:'', //纬度
        module_id:'', //推荐列表的id
        title:''  //推荐列表的标题
    },
    mutations:{
        getLocal(state,data) {
            console.log('store里面')
            state.lng = data.lng;
            state.lat = data.lat;
        },
        tuijian(state,data){
            state.module_id = data.id
            state.title = data.title
        }
    }
})

export default store