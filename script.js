const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    logout: true
  },
  methods: {
    login(e){
      this.logout = !e
    }
  }

})