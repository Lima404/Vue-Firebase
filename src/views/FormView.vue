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
  import {collection, addDoc, doc, getDoc, updateDoc} from "firebase/firestore"
  import Vue from 'vue'

    export default {
      name: "FormView",
      data() {
        return {
          form: {
            id: '',
            subject: '',
            description: '',
          },
        }
      },
      created(){
        this.form.id = this.route.params.id
        if(this.form.id){
          const docRef = doc(db, "tasks", this.form.id);

          // Recupera o documento usando a referência
          getDoc(docRef).then(snapshot => {
            if (snapshot.exists()) {
              // Se o documento existe, atualiza os dados do formulário
              const task = snapshot.data(); // Supondo que `this.form.data` é onde os dados do formulário são armazenados
              this.form.subject = task.subject
            } else {
              console.log("Nenhuma tarefa encontrada com esse ID!");
            }
          }).catch(error => {
            console.error("Erro ao recuperar a tarefa: ", error);
          });
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
            autoHideDelay: 10000,
            variant: 'sucess'
          })
        },
        makeToastErro(){
          const  ve = new Vue();
          ve.$bvToast.toast(`Tarefa salva com sucesso`, {
            title: 'Erro na leitura',
            autoHideDelay: 10000,
            variant: 'danger'
          })
        },
        // Método para atualizar a tarefa
        updateTask() {
          // Verifica se um ID de tarefa foi definido
          if (this.form.id) {
            // Cria uma referência para o documento específico na coleção 'tasks'
            const docRef = doc(db, "tasks", this.form.id);

            // Prepara os dados do formulário para atualização
            const updatedData = {
              // Supondo que `this.form.data` contém os dados atualizados do formulário
              title: this.form.data.title,
              description: this.form.data.description,
              // Adicione outros campos conforme necessário
            };

            // Atualiza o documento no Firestore com os novos dados
            updateDoc(docRef, updatedData)
              .then(() => {
                console.log("Tarefa atualizada com sucesso!");
                // Aqui você pode adicionar qualquer lógica pós-atualização, como redirecionamento ou exibição de uma mensagem de sucesso
              })
              .catch((error) => {
                console.error("Erro ao atualizar a tarefa: ", error);
              });
          } else {
            console.log("ID da tarefa não definido.");
          }
        }
      }
    }
  </script>