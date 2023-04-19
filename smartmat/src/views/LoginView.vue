<template>
  <form class="loginField">

<div class="inputField">
    <label for="username">Username </label>
    <input type="text" placeholder="Skriv ditt brukernavn " name="username" required>

    <label for="password">Password </label>
    <input type="text" placeholder="Skriv ditt passord" name="password" required>

    <button type="submit">Submit</button>
    </div>
  </form>


</template>
<script>

</script>

<style>

.loginField{
  max-width: 50%;
  margin:0;
  display: grid;
  grid-row-gap: 1rem;
  align-items: center;
}






</style>
