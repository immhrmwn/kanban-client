<template>
  <section id="login-page">
    <div class="center">
      <h1 style="margin-bottom: 3rem;" class="welcome"><i class="fas fa-dice-d6"></i> KABAN</h1>
      <div class="container-fluid d-flex flex-row">
        <!-- LOGIN FORM -->
        <div id="login-form-page" v-if="ishaveAccount">
          <div class="container d-flex justify-content-center">
            <form style="width: 20rem;" @submit.prevent="login" >
              <div class="mb-3">
                <h2>Sign In</h2>
              </div>
              <div class="mb-3"> 
                <label for="email" class="form-label">Email address</label>
                <input v-model="userLogin.email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input v-model="userLogin.password" type="password" class="form-control" id="password" placeholder="Password">
              </div>
              <button type="submit" class="btn btn-primary" id="login-btn">Sign in</button>
              <button @click.prevent="haveAccount(false)" type="button" class="btn btn-success" id="gotoregister-btn">Don't have Account</button>
              <div>
                <h6 class="mt-3">Or Sign In With:</h6>
                <!-- GOOGLE LOGIN -->
                <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" class="center"></GoogleLogin>
              </div>
            </form>
          </div>
        </div>
        <!-- REGISTER FORM -->
        <div id="register-form-page" v-if="!ishaveAccount">
          <div class="container d-flex justify-content-center">
            <form style="width: 20rem" @submit.prevent="register">
              <div class="mb-3">
                <h2>Sign Up</h2>
              </div>
              <div class="mb-3">
                <label for="usernameregis" class="form-label">Username</label>
                <input v-model="newUser.username" type="text" class="form-control" id="usernameregis" aria-describedby="usernameHelp" placeholder="Enter username">
              </div>
              <div class="mb-3">
                <label for="emailregis" class="form-label">Email address</label>
                <input v-model="newUser.email" type="email" class="form-control" id="emailregis" aria-describedby="emailHelp" placeholder="Enter email">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div class="mb-3">
                <label for="passwordregis" class="form-label">Password</label>
                <input v-model="newUser.password" type="password" class="form-control" id="passwordregis" placeholder="Password">
              </div>
              <button type="submit" class="btn btn-primary" id="register-btn">Sign up</button>
              <button @click.prevent="haveAccount(true)" type="button" class="btn btn-success" id="gotologin-btn">I have an Account</button>
              <div>
                <h6 class="mt-3">Or Sign In With:</h6>
                <!-- GOOGLE LOGIN -->
                <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" class="center"></GoogleLogin>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GoogleLogin from 'vue-google-login';

export default {
  components: {
    GoogleLogin
  },
  name: 'LoginForm',
  data() {
    return {
      params: {
        client_id: "130326529052-2ejn62jhtikirbde0s5cq3e1kpk0q42u.apps.googleusercontent.com"
      },
      renderParams: {
        width: 120,
        height: 36,
        longtitle: false
      },
      message:'masuk login!',
      ishaveAccount: true,
      newUser : {
        username: '',
        email: '',
        password: ''
      },
      userLogin: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    haveAccount(e) {
      this.ishaveAccount = e
    },
    register() {
      this.$emit('register', this.newUser)
      this.ishaveAccount = true
      this.newUser.username = ''
      this.newUser.email = ''
      this.newUser.password = ''
    },
    login() {
      this.$emit('login', this.userLogin)
    },
    onSuccess(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token
      this.$emit('onSignIn', id_token)
    }
  }
}
</script>

<style>

</style>