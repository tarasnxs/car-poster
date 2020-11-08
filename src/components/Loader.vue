<template>
  <div class="lds-hourglass"></div>
</template>

<script>
export default {
name: "Loader"
}
</script>

<style scoped>
.lds-hourglass {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  padding: 150px;
}
.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin: 0px;
  box-sizing: border-box;
  border: 10px solid #cef;
  border-color: #cef transparent #cef transparent;
  animation: lds-hourglass 2.6s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}

</style>