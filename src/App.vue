<template>
  <div style="height:100%;">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components:{
    Map
  },

}
</script>
  
<style>
  body{
    background: #32004b;
    /* background-image: -moz-linear-gradient(top,#fff,#32004b,#fff); */
  }
</style>
