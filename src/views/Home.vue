<template>
  <div id="home">
    <AuctionForm />
    <LotImages v-bind:images="images" />
  </div>
</template>

<script>
import AuctionForm from "@/components/AuctionForm";
import LotImages from "@/components/LotImages";
export default {
  name: "Home",
  components: {
    AuctionForm, LotImages
  },
  data() {
    return {
      images: [
        {id: 1, url: 'https://lube-avto.s3.eu-central-1.amazonaws.com/images/cars/copart/46599900/1.jpg'},
        {id: 2, url: 'https://lube-avto.s3.eu-central-1.amazonaws.com/images/cars/copart/46599900/1.jpg'},
        {id: 3, url: 'https://lube-avto.s3.eu-central-1.amazonaws.com/images/cars/copart/46599900/1.jpg'},
        {id: 4, url: 'https://lube-avto.s3.eu-central-1.amazonaws.com/images/cars/copart/46599900/1.jpg'},
        {id: 5, url: 'https://lube-avto.s3.eu-central-1.amazonaws.com/images/cars/copart/46599900/1.jpg'},
      ]
    }
  }
}
</script>

<style scoped>
</style>