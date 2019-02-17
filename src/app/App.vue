<template>
  <div>

    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendTask()">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Ingrese una tarea"
                    v-model="task.title"
                    required
                  >
                </div>
                <div class="form-group">
                  <textarea
                    name
                    id
                    cols="30"
                    rows="10"
                    class="form-control"
                    placeholder="Ingrese una descripcion"
                    v-model="task.description"
                    required
                  ></textarea>
                </div>
                <template v-if="!edit">
                  <button class="btn btn-success btn-block">Crear Tarea</button>
                </template>
                <template v-else>
                  <button class="btn btn-secondary btn-block">Actualizar Tarea</button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Task</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in tasks" :key="task.id">
                <td>{{task.title}}</td>
                <td>{{task.description}}</td>
                <td>
                  <button class="btn btn-danger" @click="deleteTasks(task._id)">Eliminar</button>
                </td>
                <td>
                  <button class="btn btn-secondary" @click="editTasks(task._id)">Editar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";


class Task {
  constructor(titleTask, descriptionTask) {
    this.title = titleTask;
    this.description = descriptionTask;
  }
}

export default {
  name: "app",
  data() {
    return {
      task: new Task(),
      tasks: [],
      edit: false,
      taskToEdit: "",
    };
  },

  created() {
    this.getTasks();
    
  },
  methods: {
    sendTask() {
      if (!this.edit) {
        fetch("/api/tasks", {
          method: "POST",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getTasks();
            this.task = new Task();
          });
      } else {
        fetch("/api/tasks/" + this.taskToEdit, {
          method: "PUT",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getTasks();
            this.edit = false;
            this.task = new Task();
          });
      }
    },
    getTasks() {
      fetch("/api/tasks")
        .then(res => res.json())
        .then(data => {
          this.tasks = data;
          console.log(this.tasks);
        });
    },
    deleteTasks(taskID) {
      fetch("/api/tasks/" + taskID, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => this.getTasks());
    },
    editTasks(taskID) {
      fetch("/api/tasks/" + taskID)
        .then(res => res.json())
        .then(data => {
          this.task = new Task(data.title, data.description);
          this.edit = true;
          this.taskToEdit = data._id;
          // console.log(data);
        });
    }
  }
};
</script>

<style lang="scss">
</style>