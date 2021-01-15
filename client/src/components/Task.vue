<template>
  <div class="card mb-2" style="width: 16rem;">
    <div class="card-body">
      <p class="card-text" v-if="!editForm">{{ task.title }}</p>
      <!-- EDIT FORM -->
      <div class="mb-2" v-else-if="editForm">
        <form @submit.prevent="updateTask">
          <div class="form-floating" >
            <textarea v-model="newTask.title" 
              class="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea"
              style="height: 50px;"
            ></textarea>
            <label for="floatingTextarea">Title</label>
          </div>
          <div class="card-board-add-task mt-2">
            <button class="btn btn-success btn-sm"><i class="fa fa-check"></i>&nbsp;Edit Task</button>
            <button class="btn btn-secondary btn-sm" @click.prevent="closeEditForm"><i class="fa fa-close"></i>&nbsp;Cancel</button>
          </div>
        </form>
      </div>

      <div class="row">
        <div class="description col-7">
          <p>By: {{ task.username }}</p>
          <p>{{ dateFormat }}</p>
        </div>
        <div class="col-5 dropdown">
          <button type="button" class="btn fas fa-pencil-alt edit" @click.prevent="letsEdit(true)"></button>
          <button type="button" class="btn far fa-trash-alt edit" @click.prevent="deleteTask(task.id)" style="color: rgb(184, 12, 12);"></button>
          <button type="button" class="btn fas fa-arrows-alt edit dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></button>
          <ul class="dropdown-menu">
            <!-- Dropdown menu links -->
            <li><button class="dropdown-item center" type="button" @click.prevent="patchTask('backlog')">backlog</button></li>
            <li><button class="dropdown-item center" type="button" @click.prevent="patchTask('todo')">todo</button></li>
            <li><button class="dropdown-item center" type="button" @click.prevent="patchTask('doing')">doing</button></li>
            <li><button class="dropdown-item center" type="button" @click.prevent="patchTask('done')">done</button></li>
          </ul>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  props: ['task'],
  name: 'Task',
  data() {
    return {
      message: 'masuk task',
      editForm: false,
      newTask: {
        id: this.task.id,
        title: this.task.title,
        category: this.task.category
      },
      newCategory: {
        id: this.task.id,
        category: ''
      }
    }
  },
  methods: {
    deleteTask(id) {
      this.$emit('deleteTask', id)
    },
    updateTask(){
      this.$emit('updateTask', this.newTask)
      this.editForm = false
    },
    letsEdit(e) {
      this.editForm = e
    },
    patchTask(category) {
      this.newCategory.category = category
      this.$emit('changeCategory', this.newCategory)

    },
    closeEditForm() {
      this.editForm = false
    },
  },
  computed:{
    dateFormat(){
      let date = this.task.date.slice(0, 10)
      return date
    },
  }
}
</script>

<style>

</style>