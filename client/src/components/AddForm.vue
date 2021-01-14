<template>
  <div class="card mb-2" style="width: 16rem;">
    <div class="card-body">
      <div>
        <form @submit.prevent="addTask">
          <div class="form-floating">
            <textarea v-model="newTask.title" class="form-control" placeholder="Leave a comment here" id="floatingTextarea"
            style="height: 57px; resize: none;"></textarea>
            <label for="floatingTextarea">Title</label>
          </div>
          <div class="card-board-add-task mt-2">
            <button class="btn btn-sm"><i class="fa fa-plus"></i>&nbsp;Add Task</button>
            <button class="btn btn-secondary btn-sm" @click.prevent="cancel"><i class="fa fa-close"></i>&nbsp;Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['category'],
  name: 'AddForm',
  data () {
    return {
      message: 'masuk addForm',
      newTask: {
        title: '',
        category: this.category.title
      },
    }
  },
  methods: {
    addTask() {
      this.$emit('createTask', this.newTask)
      this.$emit('letsAdd', false)
    },
    cancel() {
      this.$emit('letsAdd', false)
      this.newTask.title = ''
    }
  }
}
</script>

<style>

</style>