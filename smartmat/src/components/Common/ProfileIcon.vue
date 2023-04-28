<template>

  <div id="profile-row">
    <div id="icon"></div>
    <div>{{profile.username}}</div>
  </div>

</template>

<script>
export default {
  name: "ProfileIcon",
  props:{
    profile:Object
  }

}
</script>

<style scoped>

#profile-row{
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  font-size: 7vh;
}

#icon{
  background-color: red;
  border: black 1vh solid;
  padding: 4vh;
  border-radius: 50vh;
  width: 1vh;
}

</style>