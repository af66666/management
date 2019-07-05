<template>
  <el-calendar v-model="today"></el-calendar>
</template>

<script>
    export default {
      name: "articles",
      data(){
        return {
          today: new Date()
        }
      }
    }
</script>

<style scoped>

</style>
