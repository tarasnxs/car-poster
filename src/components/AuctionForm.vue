<template>
  <form id="auctionForm" class="searchForm" @submit.prevent="$emit('search', $data)">
    <input @click="auction = 'copart'"
           class="hiddenRadio"
           id="auction1"
           type="radio"
           name="auction"
           value="copart"
           checked>
    <label for="auction1">
      <img class="aucImage"
           v-bind:class="{grayImage : auction !== 'copart'}"
           id="imgCopart"
           src="../assets/images/copart.png"
           alt="copart"/>
    </label>

    <input @click="auction = 'iaai'"
           class="hiddenRadio"
           id="auction2"
           type="radio"
           name="auction"
           value="iaai">
    <label for="auction2">
      <img class="aucImage"
           v-bind:class="{grayImage : auction !== 'iaai'}"
           id="imgIaai"
           src="../assets/images/iaai.png"
           alt="iaai"/>
    </label>
    <br>
    <p class="iaaiInfo"
       :style="[auction === 'iaai' ? {} : {'visibility':'hidden'}]" >
      Вводити номер з URL аукціону
    </p>

    <input
        v-model="lotId"
        type="text"
           placeholder="Номер лоту.."
           name="lot">

    <button id="search"
            type="submit">
      <i class="fa fa-search"></i>
    </button>
  </form>
</template>

<script>
export default {
  name: "AuctionForm",
  data() {
    return {
      auction: "copart",
      lotId: ""
    }
  },
  methods: {
    onSubmit() {

    }
  }
}
</script>

<style scoped>
#auctionForm {
  width: 300px;
  font-size: small;
  margin: 0 auto;
}

.aucImage {
  width: 120px;
}

.iaaiInfo {
  color: crimson;
  font-style: italic;
  font-size: 10px;
}

form.searchForm input[type=text] {
  padding: 10px;
  font-size: 17px;
  border: 1px solid grey;
  float: left;
  background: #f1f1f1;
}

form.searchForm button {
  float: left;
  width: 20%;
  padding: 10px;
  background: #2196F3;
  color: white;
  font-size: 17px;
  border: 1px solid grey;
  border-left: none;
  cursor: pointer;
}

form.searchForm button:hover {
  background: #0b7dda;
}

form.searchForm::after {
  content: "";
  clear: both;
  display: table;
}

input[type="radio"] {
  margin-top: 2px;
  vertical-align: top;
}

.grayImage {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  opacity: 0.5;
}

.hiddenRadio {
  visibility: hidden;
}

</style>