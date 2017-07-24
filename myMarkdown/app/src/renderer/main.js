import Vue from 'vue'

import router from './routes'
import Electron from 'vue-electron'

import axios from 'axios';

import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(Electron);
Vue.use(iView);
Vue.config.debug = false;

import store from './store'

// const router = new Router({
//     scrollBehavior: () => ({y: 0}),
//     routes
// });

// //拦截器

// axios.interceptors.response.use((response) => {
//     return response;
// }, (error) => {
//     if (error.response.status == 401) {
//         router.push({path: '/login'});
//     }
// });

// window.ondragover = function (e) {
//     e.preventDefault();
//     return false
// };

import App from './App'; 
var vuem = new Vue({
    router,
    store,
    ...App
}).$mount('#app');

export default vuem;

