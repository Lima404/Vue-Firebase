<template>
  <div>
    <b-form class="mt-2">
      <b-row>
        <b-cow class="col-6 offset-sm-3">

          <b-form-group
            label="Tarefa:"
            label-for="subject"
          >
            <b-form-input
              id="subject"
              v-model="form.subject"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
        </b-cow>

        <b-cow class="col-6 offset-sm-3">
          <b-form-group
            label="Decrição:"
            label-for="description"
          >
            <b-form-textarea
              id="description"
              v-model="form.description"
              type="text"
              required
            ></b-form-textarea>
          </b-form-group>
        </b-cow>

        <b-cow id="but" class="col-6 offset-sm-3">

          <b-button type="button" variant="info" class="mt-2" @click="saveTask">Submit</b-button>
          <b-button type="reset" variant="warning" class="mt-2">Reset</b-button>

        </b-cow>

      </b-row>

    </b-form>
  </div>
</template>

<style>
  #but{
    display: flex;
    gap: 10px;
  }
</style>

<script>
  import { db } from '../firebaseDb'
  import {collection, addDoc} from "firebase/firestore"
  import Vue from 'vue'

    export default {
      name: "FormView",
      data() {
        return {
          form: {
            subject: '',
            description: '',
          },
        }
      },
      methods: {
        async saveTask(){
          try{
            await addDoc(collection(db, "tasks"), {
              subject: this.form.subject,
              description: this.form.description,
            })
            this.clearForm();
            this.makeToast();
            this.$router.push({ name: 'list' });
          }
          catch (e){
            this.makeToastErro()
          }

        },
        clearForm(){
          this.form.subject = '';
          this.form.description = '';
        },
        makeToast(){
          const  vm = new Vue();
          vm.$bvToast.toast(`Tarefa salva com sucesso`, {
            title: 'Sucesso',
            autoHideDelay: 5000,
            variant: 'sucess'
          })
        },
        makeToastErro(){
          const  ve = new Vue();
          ve.$bvToast.toast(`Tarefa salva com sucesso`, {
            title: 'Erro na leitura',
            autoHideDelay: 5000,
            variant: 'danger'
          })
        }
      }
    }
  </script>