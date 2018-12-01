import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//定义容器
let store = new Vuex.Store({
    state:{
        lng:'', //经度
        lat:'', //纬度
    },
    mutations:{
        getLocal(state,data) {
            console.log('store里面')
            state.lng = data.lng;
            state.lat = data.lat;
        }
    }
})

export default store