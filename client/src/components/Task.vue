<template>
  <div class="card mb-2" style="width: 16rem;">
    <div class="card-body">
      <p class="card-text" v-if="!editForm">{{ task.title }}</p>
      <!-- EDIT FORM -->
      <div class="mb-2" v-else-if="editForm">
        <form @submit.prevent="updateTask">
          <div class="form-floating" >
            <textarea v-model="newTask.title" class="form-control" placeholder="Leave a comment here" id="floatingTextarea"
            style="height: 50px;"></textarea>
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
          <p>{{ task.date }}</p>
        </div>
        <div class="col-5">
          <button type="button" class="btn fas fa-pencil-alt edit" @click.prevent="letsEdit(true)"></button>
          <button type="button" class="btn far fa-trash-alt edit" @click.prevent="deleteTask(task.id)" style="color: rgb(184, 12, 12);"></button>
          <button type="button" class="btn fas fa-arrows-alt edit" @click.prevent="patchTask(task.id)" ></button>
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
      }
    }
  },
  methods: {
    deleteTask(id) {
      console.log('masuk')
      this.$emit('deleteTask', id)
    },
    updateTask(){
      this.$emit('updateTask', this.newTask)
      this.editForm = false
    },
    letsEdit(e) {
      this.editForm = e
    },
    patchTask() {
      // PR 
    },
    closeEditForm() {
      this.editForm = false
    },
  }
}
</script>

<style>

</style>