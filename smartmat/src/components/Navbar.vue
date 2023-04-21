<template>
  <header>

    <HelloWorld msg="Hello!" />

    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/login">| Login</RouterLink>
      <RouterLink to="/register"> | Register</RouterLink>

    </nav>

  </header>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>

</style>