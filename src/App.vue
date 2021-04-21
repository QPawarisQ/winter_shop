<template>
  <div id="app">
    <navbar-component></navbar-component>
    <router-view/>
  </div>
</template>
<script>
  import NavbarComponent from '@/components/NavbarComponent.vue';
  export default{
    components: {
      "navbar-component": NavbarComponent
    }
  };
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@400;500;600;700;800&display=swap');
#app {
  font-family: 'Abhaya Libre', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#background {
}
</style>
