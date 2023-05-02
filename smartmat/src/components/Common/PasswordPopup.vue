<template>

  <div class="popup">
    <div class="popup-inner">
      <form>
        <h1>PIN</h1>
        <input type="text" v-model="password">
        <button type="submit">Logg inn</button>
      </form>
    </div>
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
  z-index: 99999;
  width: 100%;
  text-align: center;
  top: 0;
  background-color: rgba(0,0,0,0.2);
  height: 100vh;
  transition: 0.25s;
  display: flex;
  justify-content: center;
}

.popup-inner{
  margin-top: 35vh;
  background-color: white;
  width: 25vh;
  height: 20vh;
}


</style>