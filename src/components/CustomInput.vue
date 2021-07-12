<template>
  <div class="input-group flex-nowrap">
    <span class="input-group-text" id="addon-wrapping">{{ inputTitle }}</span>
    <input
      type="text"
      class="form-control"
      aria-label="Username"
      aria-describedby="addon-wrapping"
     @change='customChange'
      
    />
  </div>
</template>

<script>
export default {
  props: {
    inputTitle: String,
    inputText: String,
  },

  methods: {
    customChange (event) {
            this.$emit("customChange", event.target.value)
        }
  },
};
</script>

<style></style>
