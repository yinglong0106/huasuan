import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//定义容器
let store = new Vuex.Store({
    state:{
        lng:'', //经度
        lat:'', //纬度
        address:'' //详细地址
    },
    mutations:{
        getLocal(state,data) {
            state.lng = data.lng;
            state.lat = data.lat;
            state.address = data.address
        }
    }
})

export default store