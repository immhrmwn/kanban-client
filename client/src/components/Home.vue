<template>
  <section id="main-page">
    <!-- NAV -->
    <nav class="navbar navbar-light bg-light mb-3">
      <div class="container">
        <span class="navbar-brand mb-0 h1"><i class="fas fa-dice-d6"></i> KABAN</span>
        <button @click="logout()" class="btn btn-outline-success" type="button">Logout</button>
      </div>
    </nav>
    <!-- CONTENT -->
    <div class="container p-2">
      <div class="row">
        <Category v-for="category in categories"
          :key="category.id"
          :tasks="tasks"
          :category="category"
          @createTask="createTask"
          @deleteTask="deleteTask"
          @updateTask="updateTask"
        ></Category>
      </div>
    </div>
  </section>
</template>

<script>
import Category from './Category'

export default {
  components: {
    Category
  },
  props: ['categories', 'tasks'],
  name: 'Home',
  data() {
    return {
      message:'masuk home!'
    }
  },
  methods: {
    logout() {
      this.$emit('logout')
    },
    createTask(payload) {
      this.$emit('createTask', payload)
    },
    deleteTask(id) {
      this.$emit('deleteTask', id)
    },
    updateTask(payload){
      console.log(payload, 'from home')
      this.$emit('updateTask', payload)
    },
  }
}
</script>

<style>

</style>