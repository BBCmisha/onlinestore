import Vue from 'vue'
import App from './App.vue'
import BuyDialogComponent from './components/Common/BuyDialog.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import fb from 'firebase'

Vue.config.productionTip = false
Vue.component('app-buy-dialog', BuyDialogComponent)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  created () {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
      apiKey: 'AIzaSyByp7Bziic8Cx4jQYoHfQuBkeGK2XOkY3o',
      authDomain: 'onlinestore-c044e.firebaseapp.com',
      projectId: 'onlinestore-c044e',
      storageBucket: 'onlinestore-c044e.appspot.com',
      messagingSenderId: '336375829310',
      appId: '1:336375829310:web:562eca7fb1eb07e564126f',
      measurementId: 'G-JYEBKB9BTT'
    }
    // Initialize Firebase
    fb.initializeApp(firebaseConfig)

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchProducts')
  }
}).$mount('#app')
