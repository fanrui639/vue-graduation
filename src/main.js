import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


// Vue.config.productionTip = false
// const axiosInstance = new axios({
//   baseURL: 
//   'http://localhost:8889/api/'
// })
Vue.prototype.$axios = axios

Vue.use(ElementUI);
Vue.use(require('vue-wechat-title'))    //动态修改title

router.beforeEach((to, from, next) => {
  axios.get('/api/user/init').then(response =>{
    // this.user = response.data.data
    store.commit('login',response.data.data)
    // if(store.state.userInfo.id != -1 || to.path === "/login" || to.path == "/register" ){
    //   // alert(store.state.userInfo.id)
    //   next()
    // }else{
    //       next({
    //     path:'/login'
    //   })
    // }
    if((store.state.userInfo.id != -1 && to.path == '/') || (store.state.userInfo.id != -1 && to.path == '/VIP') ){
      next()
    }else{
      next()
    }

  }).catch(function (error) {
      console.log(error);
  });
  
  next()
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
