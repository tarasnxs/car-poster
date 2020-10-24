<template>
  <div id="app">
    <Header v-bind:isAdmin="isAdmin" v-bind:userName="userName"/>
    <router-view/>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      isAdmin: true,
      userName: "UserName"
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  background-color: #343434;
  height: 100vh;
}
</style>
