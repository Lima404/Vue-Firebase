<template>
  <div class="d-flex justify-content-center">
    <div class="col-6 mt-2">
      <b-card title="Card title">
        <b-card-text>
          Some quick example text to build on the <em>card title</em> and make up the bulk of the card's
          content.
        </b-card-text>
    
        <div id="but">
          <b-button variant="info" class="ml-2">Editar</b-button>
          <b-button variant="danger" class="ml-2">Excluir</b-button>
        </div>
      </b-card>
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
  export default {
    name: "ListView"
  }
</script>