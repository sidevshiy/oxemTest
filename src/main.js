import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from "bootstrap-vue"

import store from './store';

Vue.config.productionTip = false

Vue.use(BootstrapVue)

// store.dispatch('usersTable/getUsers').then(() => {
//   new Vue({
//     render: h => h(App),
//     store
//   }).$mount('#app')
// }).catch(err => {
// 	console.log(err.response)
// 	document.body.innerHTML = 'Critical error';
// });

store.dispatch('usersTable/getUsers');
new Vue({
  render: h => h(App),
  store
}).$mount('#app')


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

