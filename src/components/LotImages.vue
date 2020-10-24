<template>
  <div id="photos">
    <div class="imgContainer" v-for="image in images" v-bind:key="image.id">
      <div class="checkBoxContainer">
        <input class="mgr mgr-success mgr-lg"
               type="radio"
               name="mainPhoto"
               v-bind:value="image.id"
               v-bind:id="'carImg' + image.id"
               :checked="image.id == 1">
        <input class="mgc-switch mgc-sm"
               type="checkbox"
               name="enabledPhoto"
               v-bind:value="image.id" checked>
      </div>
      <label v-bind:for="'carImg' + image.id">
        <img v-bind:src="image.url" v-bind:alt="image.id">
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "LotImages",
  props: ['images']
}
</script>

<style scoped>
  #photos {
    width: 100%;
  }

  .imgContainer > label > img {
    width: 100%;
  }

  .imgContainer {
    width: 18%;
    padding-left: 10px;
    display: inline-block;
  }
</style>