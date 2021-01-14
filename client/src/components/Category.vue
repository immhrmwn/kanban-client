<template>
  <div class="col-sm d-flex justify-content-start flex-column bg-warning mx-1 box p-2 align-items-center rounded">
    <h6 class="text-center">{{ category.title }} :</h6>
    <!-- BOX -->
    <div class="box1 rounded">
      <!-- Task -->
      <Task
        v-for="task in filteredTask"
        :key="task.id"
        :task="task"
        @deleteTask="deleteTask"
        @updateTask="updateTask"
      ></Task>
      <!-- ADD FORM -->
      <AddForm
        v-if="addForm"
        :category="category"
        @letsAdd="letsAdd"
        @createTask="createTask"
      ></AddForm>
    </div>
    <!-- ADD BUTTON -->
    <div class="card mb-2" style="width: 16rem;">
      <a href="#" class="btn btn-light" @click.prevent="letsAdd(true)"><i class="fas fa-plus"></i></a>
    </div>
  </div>
</template>

<script>
import Task from './Task'
import AddForm from './AddForm'

export default {
  components: {
    Task,
    AddForm
  },
  props: ['category', 'tasks'],
  name: 'Category',
  data() {
    return {
      message: 'masuk category',
      addForm: false,
      // editForm: false,
    }
  },
  methods: {
    letsAdd(e) {
      this.addForm = e
    },
    createTask(payload) {
      console.log(payload, '<<<category')
      this.$emit('createTask', payload)
    },
    deleteTask(id) {
      this.$emit('deleteTask', id)
    },
    updateTask(payload){
      this.$emit('updateTask', payload)
    },
  },
  computed:{
    filteredTask(){
      return this.tasks.filter(el => el.category === this.category.title)
    },
  }
}
</script>

<style>

</style>