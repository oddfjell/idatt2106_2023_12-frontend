<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="h">
{{msg}}
  </div>
</template>

<style scoped>

</style>
