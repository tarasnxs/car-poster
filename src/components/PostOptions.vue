<template>
  <div id='postOptions'>
    <hr>
    <div class='description'>
      <label for='instaDescription' class='descriptionLabel'>Опис для інстаграму: </label>
      <textarea id='instaDescription' class='descriptionArea' v-model="instaDescription">
			</textarea>
    </div>

    <div class='description'>
      <label for='teleDescription' class='descriptionLabel'>Опис для телеграму: </label>
      <textarea id='teleDescription' class='descriptionArea' v-model="teleDescription">
			</textarea>
    </div>

    <div id='settings'>
      <div id="canals">
        <input
            @click="canal = 'telegram'"
            class="hiddenRadio"
            id="teleCanal"
            type="radio"
            name="postCanal"
            value="telegram"
            checked>
        <label for="teleCanal">
          <img
              v-bind:class="{grayImage : canal !== 'telegram'}"
              class="postCanalImage"
              id="imgTelegram"
              src="../assets/images/telegram.png"/>
        </label>
        <input
            @click="canal = 'instagram'"
            class="hiddenRadio"
            id="instaCanal"
            type="radio"
            name="postCanal"
            value="instagram">
        <label for="instaCanal">
          <img
              v-bind:class="{grayImage : canal !== 'instagram'}"
              class="postCanalImage"
              id="imgInstagram"
              src="../assets/images/Instagram.png"/>
        </label>
      </div>
      <p
          v-if="canal === 'telegram'"
          class="postHint"
          id="telegramHint">
          Для постів в телеграм оберіть 3 фото
      </p>

      <label id="accountLabel" for="accountChooser">Аккаунт : </label>
      <select id="accountChooser" v-model="selectedAccount">
        <option
            v-for="account in canal === 'telegram' ? telegramAccounts : instaAccounts"
            v-bind:value="account.id"
            v-bind:key="account.id"
        >
          {{account.name}}
        </option>
      </select>
      <br>
      <br>
      <label for="price">Ціна: </label>
      <input v-model="price" id="price" type="text" name="price" value="" pattern="[0-9]{3} [0-9]{3} [0-9]{3}">
      <br>
      <p class="postHint">Якщо назва задовга- <br>перенесіть частину в другий рядок</p>
      <label for="carName">Назва авто на фото: </label>
      <input id="carName" type="text" name="carName" v-model="carName"><br>
      <br>
      <label for="secondNameOnPhoto">Другий рядок: </label>
      <input id="secondNameOnPhoto" type="text" name="secondNameOnPhoto" v-model="secondName">
      <br>
      <br>
      <label for="planningPost">Опублікувати пізніше</label>
      <input type="checkbox" v-model="onTimePost" id="planningPost">
      <br>
      <br>
      <datetime
          v-if="onTimePost"
          format="YYYY-MM-DD H:i"
          v-model="postTime"
          first-day-of-week="1"
          id="postTime"
          ></datetime>
      <br>
      <br>
      <a  v-bind:class="{savedButton : saved}"
          class="postButton"
          v-on:click="saved ? console.log('already saved') : $emit('save-car', $data)"
          >{{saved ? 'Збережено' : 'Зберегти'}}</a>
      <a class="postButton" v-on:click="$emit('save-post', $data)">Опублікувати</a>

    </div>
  </div>
</template>

<script>
import datetime from "@/components/datetime_picker";
import api from "../api";

export default {
  name: "PostOptions",
  props: ['postInfo'],
  created() {
    api.getAccounts().then(response => {
      this.telegramAccounts = response.data.telegram;
      this.instaAccounts = response.data.instagram;
    });
  },
  mounted() {
    this.setPostData(this.postInfo);
  },
  watch: {
    postInfo: function (val) {
      this.setPostData(val);
    }
  },
  data() {
    return {
      onTimePost: false,
      postTime: "",
      instaDescription: "",
      teleDescription: "",
      canal: "telegram",
      price: 0,
      carName: "",
      secondName: "",
      telegramAccounts: [],
      instaAccounts: [],
      selectedAccount: -1,
      mainPhoto: 1,
      selectedPhotos: [],
      saved: false
    }
  },
  components: {datetime},
  methods: {
    setPostData(data) {
      this.instaDescription = data.instaDescription;
      this.teleDescription = data.teleDescription;
      this.price = data.carPrice;
      this.carName = data.carName;
      this.saved = data.saved;
    }
  }
}
</script>

<style scoped>
  .savedButton {
    color: #2196F3!important;
  }

  #postTime {
    width: 300px;
    height: 30px;
  }

  .grayImage {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    opacity: 0.5;
  }

  .postCanalImage {
    width: 45px;
  }

  #instagramForm {
    padding: 10px;
    display: inline-grid;
    position: static;
    float: right;
  }

  #channelSelect {
    padding: 10px;
    display: inline-grid;
    position: static;
    float: right;
  }

  .carInfoDiv {
    float: left;
    margin: 10px;
  }

  #fields {
    height: 210px;
  }

  #fields > textarea {
    height: 190px;
    width: 260px;
  }

  .description {
    display: inline-block;
  }

  .vars > p {
    margin-top: 3px;
  }

  .descriptionArea {
    display: block;
    height: 200px;
    width: 270px;
    margin: 5px;
  }


  .descriptionLabel {
    display: block;
    font-weight: 700;
    color: #ddd;
    margin: 3px;
  }

  #settings {
    display: inline-block;
    margin-left: 50px;
    vertical-align: top;
    text-align: right;
  }

  #postOptions {
    text-align: center;
  }

  #postTime {
    min-height: 20px;
  }


  .hiddenRadio {
    visibility: hidden;
  }


  .instaButton {
    -moz-box-shadow: inset 0px 1px 0px 0px #a4e271;
    -webkit-box-shadow: inset 0px 1px 0px 0px #a4e271;
    box-shadow: inset 0px 1px 0px 0px #a4e271;
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.05, #89c403), color-stop(1, #77a809));
    background: -moz-linear-gradient(top, #89c403 5%, #77a809 100%);
    background: -webkit-linear-gradient(top, #89c403 5%, #77a809 100%);
    background: -o-linear-gradient(top, #89c403 5%, #77a809 100%);
    background: -ms-linear-gradient(top, #89c403 5%, #77a809 100%);
    background: linear-gradient(to bottom, #89c403 5%, #77a809 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#89c403', endColorstr='#77a809', GradientType=0);
    background-color: #89c403;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    border: 1px solid #74b807;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Verdana;
    font-size: 16px;
    padding: 6px 24px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #528009;
    display: none;
  }

  .instaButton:hover {
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.05, #77a809), color-stop(1, #89c403));
    background: -moz-linear-gradient(top, #77a809 5%, #89c403 100%);
    background: -webkit-linear-gradient(top, #77a809 5%, #89c403 100%);
    background: -o-linear-gradient(top, #77a809 5%, #89c403 100%);
    background: -ms-linear-gradient(top, #77a809 5%, #89c403 100%);
    background: linear-gradient(to bottom, #77a809 5%, #89c403 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#77a809', endColorstr='#89c403', GradientType=0);
    background-color: #77a809;
  }

  .instaButton:active {
    position: relative;
    top: 1px;
  }

  .teleButton {
    -moz-box-shadow: inset 0px 1px 0px 0px #a471e2;
    -webkit-box-shadow: inset 0px 1px 0px 0px #a471e2;
    box-shadow: inset 0px 1px 0px 0px #a471e2;
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.05, #8903c4), color-stop(1, #7709a8));
    background: -moz-linear-gradient(top, #8903c4 5%, #7709a8 100%);
    background: -webkit-linear-gradient(top, #8903c4 5%, #7709a8 100%);
    background: -o-linear-gradient(top, #8903c4 5%, #7709a8 100%);
    background: -ms-linear-gradient(top, #8903c4 5%, #7709a8 100%);
    background: linear-gradient(to bottom, #8903c4 5%, #7709a8 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#89c403', endColorstr='#77a809', GradientType=0);
    background-color: #8903c4;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    border: 1px solid #7407b8;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Verdana;
    font-size: 16px;
    padding: 6px 24px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #520980;
    display: none;
  }

  .teleButton:hover {
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.05, #7709a8), color-stop(1, #8903c4));
    background: -moz-linear-gradient(top, #7709a8 5%, #8903c4 100%);
    background: -webkit-linear-gradient(top, #7709a8 5%, #8903c4 100%);
    background: -o-linear-gradient(top, #7709a8 5%, #8903c4 100%);
    background: -ms-linear-gradient(top, #7709a8 5%, #8903c4 100%);
    background: linear-gradient(to bottom, #7709a8 5%, #8903c4 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#77a809', endColorstr='#89c403', GradientType=0);
    background-color: #7709a8;
  }

  .teleButton:active {
    position: relative;
    top: 1px;
  }

  .postButton {
    background-color: #1A1A1A;
    -moz-border-radius: 7px;
    -webkit-border-radius: 7px;
    border-radius: 7px;
    border: 1px solid #000000;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Trebuchet MS;
    font-size: 15px;
    font-weight: bold;
    padding: 10px 17px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #2f6627;
    margin-left: 20px;
  }

  .postButton:hover {
    background-color: #555853;
  }

  .postButton:active {
    position: relative;
    top: 1px;
  }

  .postHint {
    font-size: 0.01em;
    font-weight: 100;
    color: orangered;
  }

</style>