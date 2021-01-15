<template>
  <div>
    <LoginForm v-if="isLogout"
      @login="login"
      @register="register"
      @onSignIn="onSignIn"
    ></LoginForm>
    <Home v-else-if="!isLogout"
      :categories="categories"
      :tasks="tasks"
      @logout="logout"
      @createTask="createTask"
      @deleteTask="deleteTask"
      @updateTask="updateTask"
      @changeCategory="changeCategory"
    ></Home>
  </div>

</template>

<script>
import axios from '../src/config/axiosInstance';
import Home from './components/Home';
import LoginForm from './components/LoginForm';

export default {
  name: 'App',
  data() {
    return {
      message:'Hello Welcome from Kanban ^_^',
      isLogout: true,
      tasks: [],
      categories: [
        { id: 1, title: 'backlog' },
        { id: 2, title: 'todo' },
        { id: 3, title: 'doing' },
        { id: 4, title: 'done' }
      ]
    }
  },
  components: {
    LoginForm,
    Home
  },
  methods: {
    checkAuth() {
      if(localStorage.access_token) {
        this.isLogout = false
        this.fetchAllTasks()
      } else {
        this.isLogout = true
      }
    },
    createTask(payload) {
      axios({
        method: 'POST',
        url: '/tasks',
        data: payload,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        this.fetchAllTasks()
        swal({
          title: 'Success !!!',
          text: 'Add Task Success',
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
          title: 'ADD TASK ERROR !!!',
          text: valid,
          icon: 'error'
        })
      })
    },
    deleteTask(id) {
      swal({
        title: 'Are you sure ?',
        text: 'Once deleted, you will not be able to recover this task !',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
      .then(deleted => {
        if(deleted) {
          axios({
            method: 'DELETE',
            url: '/tasks/'+id,
            headers: {
              access_token: localStorage.access_token
            }
          })
          .then(response => {
            this.fetchAllTasks()
            swal({
              title: 'Deleted',
              text: 'Successfully deleted your Task',
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
              title: 'DELETE ERROR !!!',
              text: valid,
              icon: 'error'
            })
          })
        } else {
          swal("Your imaginary file is safe :)")
        }
      })
    },
    updateTask(payload) {
      const id = payload.id
      const newTask = {
        title: payload.title,
        category: payload.category,
      }
      axios({
        method: 'PUT',
        url: '/tasks/'+id,
        data: newTask,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        this.fetchAllTasks()
        swal({
          title: 'Updated',
          text: 'Successfully Update your Task',
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
          title: 'UPDATE ERROR !!!',
          text: valid,
          icon: 'error'
        })
      })
    },
    changeCategory(payload) {
      const id = payload.id
      const newCategory = {
        category: payload.category,
      }
      axios({
        method: 'PATCH',
        url: '/tasks/'+id,
        data: newCategory,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        this.fetchAllTasks()
      })
      .catch(err => {
        let valid = ''
        err.response.data.errors.forEach(el => {
          valid += `${el}
          `
        })
        swal({
          title: 'UPDATE ERROR !!!',
          text: valid,
          icon: 'error'
        })
      })
    },
    register(payload) {
      axios({
        method: 'POST',
        url: '/register',
        data: payload
      })
      .then(response => {
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
    },
    onSignIn(id_token) {
      axios({
        method: 'POST',
        url: '/googleLogin',
        data: { id_token }
      })
      .then(response => {
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
    login(payload) {
      axios({
        method: 'POST',
        url: '/login',
        data: payload
      })
      .then(response => {
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
    googleLogout() {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.')
      })
    },
    logout() {
      localStorage.clear()
      this.googleLogout()
      this.checkAuth()
    },
    fetchAllTasks() {
      axios({
        method: 'GET',
        url: '/tasks',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        this.tasks = response.data
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    console.log(this.message)
    this.checkAuth()
  },
}

</script>

<style scoped>

</style>