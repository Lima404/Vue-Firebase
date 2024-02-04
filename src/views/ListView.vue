<template>
  <div>
    <div class="d-flex justify-content-center" v-for="task in tasks" :key="task.id">
      <div class="col-6 mt-2">
        <b-card :title="task.subject">
          <b-card-text>
            {{ task.description }}
          </b-card-text>
    
          <div id="but">
            <b-button variant="info" class="ml-2" @click="updateTask(task.id)">Editar</b-button>
            <b-button variant="danger" class="ml-2">Excluir</b-button>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
  
  #but{
    display: flex;
    gap: 10px;
  }
  
  </style>
<script>
  // getDoc doc
  import { db } from '../firebaseDb'
  import {collection, onSnapshot} from "firebase/firestore"
  //import Vue from 'vue'
  export default {
    name: "ListView",
    data(){
      return{
        tasks: []
      }
    },
    created(){
      this.getTasks();
    },
    methods: {
      async getTasks(){
        try{
            onSnapshot(collection(db, "tasks"), (snapshot => {
            this.tasks = [];

            snapshot.forEach((doc) => {
              let objectTask = {};
              objectTask = doc.data();
              objectTask.id = doc.id;
              this.tasks.push(objectTask);
            })
          }),
          )}
          catch(e){
            console.log('erro')
        }
      },
      updateTask(idTask){
        this.$router.push({ name: 'form', params: { id: idTask }})
      }
    }
  }
</script>