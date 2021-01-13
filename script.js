const baseUrl = 'http://localhost:3000'
const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    isLogout: true,
    ishaveAccount: true,
    tasks: [],
    newUser : {
      username: '',
      email: '',
      password: ''
    },
    userLogin: {
      email: '',
      password: ''
    }
  },
  methods: {
    checkAuth() {
      if(localStorage.access_token){
        this.isLogout = false
        this.fetchAllTasks()
      } else {
        this.isLogout = true
      }
    },
    haveAccount(e) {
      this.ishaveAccount = e
    },
    register() {
      axios({
        method: 'POST',
        url: baseUrl+'/register',
        data: this.newUser
      })
      .then(response => {
        this.ishaveAccount = true
        // console.log(response)
        swal({
          title: 'Success !!!',
          text: 'Register Success',
          icon: 'success'
        })
      })
      .catch(err => {
        let valid = ''
        err.response.data.errors.forEach(el => {
          valid += `${el}
          `
        })
        swal({
          title: 'REGISTER ERROR !!!',
          text: valid,
          icon: 'error'
        })
      })
      .then(() => {
        this.newUser.username = ''
        this.newUser.email = ''
        this.newUser.password = ''
      })
    },
    login() {
      axios({
        method: 'POST',
        url: baseUrl+'/login',
        data: this.userLogin
      })
      .then(response => {
        // console.log(response.data.access_token)
        localStorage.setItem('access_token', response.data.access_token)
        this.checkAuth()
        swal({
          title: 'Hallo '+ response.data.username,
          text: 'Stay Safe, Stay at Home',
          icon: 'success'
        })
      })
      .catch(err => {
        let valid = ''
        err.response.data.errors.forEach(el => {
          valid += `${el}
          `
        })
        swal({
          title: 'LOGIN ERROR !!!',
          text: valid,
          icon: 'error'
        })
      })
    },
    logout() {
      localStorage.clear()
      this.checkAuth()
    },
    fetchAllTasks() {
      axios({
        method: 'GET',
        url: baseUrl+'/tasks',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        console.log(response.data)
        this.tasks = response.data
      })
      .catch(err => {
        console.log(err)
      })
      .then(() => {
        this.userLogin.email = ''
        this.userLogin.password = ''
      })
    } 
  },
  created() {
    console.log(this.message)
    this.checkAuth()
  },
  computed: {
    tasksBacklog() {
      return this.tasks.filter(el => el.category === 'backlog')
    },
    tasksTodo() {
      return this.tasks.filter(el => el.category === 'todo')
    },
    tasksDoing() {
      return this.tasks.filter(el => el.category === 'doing')
    },
    tasksDone() {
      return this.tasks.filter(el => el.category === 'done')
    }
  }
})