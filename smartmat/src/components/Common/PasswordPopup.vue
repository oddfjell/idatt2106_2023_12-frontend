<template>

  <div class="popup">
    <h1>PIN</h1>
    <input type="text" v-model="password">
  </div>

</template>

<script>
export default {
  name: "PasswordPopup",
  data() {
    return {
      password: ""
    }
  }
}
</script>

<style scoped>

.popup{
  position: fixed;
  margin: auto;
  z-index: 99999;
  background-color: red;
  padding: 10vh;
  width: 10vh;
  height: 10vh;

}


</style>