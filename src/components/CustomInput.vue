<template>
  <div class="input-group flex-nowrap">
  <span class="input-group-text" id="addon-wrapping">{{inputTitle}}</span>
  <input type="text" 
  class="form-control" 
  aria-label="Username" 
  aria-describedby="addon-wrapping"
  :value='inputText'>
</div>
</template>

<script>
export default {
props:{
      inputTitle: String, 
      inputText: String,
    },
}
</script>

<style>

</style>