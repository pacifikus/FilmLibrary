// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Uimini from 'uimini/dist/css/uimini.css'

import App from './App'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'

Vue.use(
  Vuelidate,
  Uimini
)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    var firebaseConfig = {
      apiKey: 'AIzaSyAxxk_2wIhz_u2Mp39HJYp7hEh4ycSSFcM',
      authDomain: 'filmlibrary-b0f09.firebaseapp.com',
      databaseURL: 'https://filmlibrary-b0f09.firebaseio.com',
      projectId: 'filmlibrary-b0f09',
      storageBucket: 'filmlibrary-b0f09.appspot.com',
      messagingSenderId: '529403195468',
      appId: '1:529403195468:web:d873ada1a9c46ef57884e9',
      measurementId: 'G-54VX6WM1V2'
    }
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('loggedUser', user)
      }
      this.$store.dispatch('loadTasks')
    })
  }
})
