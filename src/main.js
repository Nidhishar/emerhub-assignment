import Vue from 'vue'
import App from './App.vue'
import VueTailwind from 'vue-tailwind'
import "./assets/css/tailwind.css"
import "firebase/firestore";
import Firebase from 'firebase/app'
import credentials from './firebase/credentials'
// import VueFire from 'vuefire'

Vue.use(VueTailwind)
Firebase.initializeApp(credentials.config)
// Vue.use(VueFire)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
