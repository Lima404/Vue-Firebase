<template lang="pt-br">
    <div class="ml-2">
        <b-navbar id="nav" toggleable="lg" type="dark" variant="info">
            <b-navbar-brand to="/">ToDo List</b-navbar-brand>
        
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/List">Lista de Tarefas</b-nav-item>
                    <b-nav-item to="/Form">Cadastro</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
      </div>
</template>
<script>
export default {
    name: 'NavBarComponent'
}
</script>

<style>
    #nav{
        padding: 10px 20px;
    }
</style>