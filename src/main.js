import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import App from './App.vue'
// import env from './env'

const mock = false;
if (mock) {
  require('./mock/api');
}

// axios.defaults.baseURL = '/api';
axios.defaults.baseURL = 'http://localhost:8081/api';
axios.defaults.timeout = 8000;

// axios.defaults.baseURL = env.baseURL;

axios.interceptors.response.use(function(response) {
  let res = response.data;
  let path = location.hash;
  if (res.status == 0) {
    return res.data;
  }else if (res.status == 10) {
    switch (path) {
      case '#/index':
        break;
      case '#/register':
        break;
      default :
        window.location.href = '/#/login'
    }
    // if (path != '#/index') {
    //   window.location.href = '/#/login'
    // }
    return Promise.reject(res);
  }
  else {
    // alert(res.msg);
    Message.warning(res.msg);
    return Promise.reject(res);
  }
  // return res.data
},(error)=>{
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(res);
});

Vue.use(VueAxios, axios)
Vue.use(VueCookie)
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})
Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
