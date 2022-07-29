<template>
  <div class="chrome_container">
    <ElInput v-model="msg"></ElInput>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const msg = ref('')
</script>
<style lang="less" scoped></style>
