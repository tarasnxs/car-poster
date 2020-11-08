<template>
  <div id="home">
    <AuctionForm v-on:search="searchLot" />
    <Loader v-if="loading" />
    <template v-else-if="images.length" style="text-align: center;">
      <p v-if="postMessage.length">{{postMessage}}</p>
      <p v-if="errorMessage.length">{{errorMessage}}</p>
      <LotImages v-bind:images="images" ref="images"/>
      <PostOptions v-bind:postInfo="postInfo" v-on:save-post="savePost" v-on:save-car="saveCar" ref="options"/>
    </template>
    <p v-else-if="errorMessage.length">{{errorMessage}}</p>

  </div>
</template>

<script>
import AuctionForm from "@/components/AuctionForm";
import LotImages from "@/components/LotImages";
import PostOptions from "@/components/PostOptions";
import Loader from "@/components/Loader";
import api from "../api";
export default {
  name: "Home",
  components: {
    AuctionForm, LotImages, PostOptions, Loader
  },
  data() {
    return {
      images: [],
      postInfo: {},
      loading: false,
      errorMessage: "",
      postMessage: ""
    }
  },
  methods: {
    async saveCar(postData) {
      this.loading = true;
      let imagesData = this.$refs.images.getImages();
      let toPost = {
        onTimePost: postData.onTimePost,
        postTime: postData.postTime,
        instaDescription: postData.instaDescription,
        teleDescription: postData.teleDescription,
        canal: postData.canal,
        price: postData.price,
        carName: postData.carName,
        secondName: postData.secondName,
        selectedAccount: postData.selectedAccount,
        mainPhoto: imagesData.mainPhoto,
        selectedPhotos: imagesData.selectedPhotos
      };

      await api.
      saveCar(toPost).
      then(() => {
        this.postMessage = "Лот додано до збережених";
        this.postInfo.saved = true;
      }).
      catch(error => {
        this.errorMessage = "Не можу зберегти лот. Спробуйте ще раз!" + error;
      });

      this.loading = false;
    },
    async savePost(postData) {
      this.loading = true;
      let imagesData = this.$refs.images.getImages();
      let toPost = {
        onTimePost: postData.onTimePost,
        postTime: postData.postTime,
        instaDescription: postData.instaDescription,
        teleDescription: postData.teleDescription,
        canal: postData.canal,
        price: postData.price,
        carName: postData.carName,
        secondName: postData.secondName,
        selectedAccount: postData.selectedAccount,
        mainPhoto: imagesData.mainPhoto,
        selectedPhotos: imagesData.selectedPhotos
      };

      await api.
          savePost(toPost).
          then(() => {
            this.postMessage = "Пост успішно збережено";
          }).
          catch(error => {
            this.errorMessage = "Не можу зберегти пост. Спробуйте ще раз!" + error;
          });

      this.loading = false;
    },
    async searchLot(searchData) {
      this.errorMessage = "";
      this.loading = true;
      await api.
          getPostInfo(searchData.auction, searchData.lotId).
          then(response => this.postInfo = response.data[0]).
          catch(error => this.errorMessage = "Не можу отримати дані : " + error);
      await api.
          getImages(searchData.auction, searchData.lotId).
          then(response => this.images = response.data);
      this.loading = false;
    }
  }
}
</script>

<style scoped>
</style>