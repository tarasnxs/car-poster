<template>
  <div id="header">
    <router-link class="leftFloat" to="/">Головна</router-link>
    <router-link class="leftFloat" to="/previous-posts">Останні публікації</router-link>
    <router-link class="leftFloat" to="/saved-lots">Збережені лоти</router-link>
    <router-link v-if="isAdmin" class="leftFloat" to="/users">Користувачі</router-link>
    <router-link v-if="isAdmin" class="leftFloat" to="/settings">Налаштування</router-link>

    <a class="exitButton"  href="logout">Вийти</a>
    <p>{{ userName }}</p>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ['isAdmin', 'userName']
}
</script>

<style scoped>
  #header {
    font-size: 0.1em;
    font-weight: 500;
    width: 100%;
    height: 35px;
    background-color: #4D4D4D;
    color: white;
    display: inline-block;
    float: right;
    margin: 0;
  }

  #header a {
    padding: 3px;
    text-decoration: none;
    color: white;
    background-color:#5D5D5D;
    border-radius: 3px;
    display: inline-block;
    margin: 5px;
    float: right;
  }

  #header .leftFloat {
    float: left;
  }

  #header .leftFloat:hover {
    color: #2196F3;
    background-color: #333;
  }

  #header .exitButton:hover {
    color: #FF3A3D;
    background-color: #333;
  }

  #header p {
    float: right;
    display: inline-block;
    margin: 10px;
  }
</style>