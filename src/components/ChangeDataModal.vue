<template>
  <!-- Button trigger modal -->
  <Button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    {{ text }}
  </Button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
          <Button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></Button>
        </div>
        <CustomInput inputTitle="új név:" @custom-change="logChange" />
        <div class="modal-footer">
          <Button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            >Close</Button
          >
          <Button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            >változások mentése</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../components/Button.vue";
import CustomInput from "../components/CustomInput.vue";
export default {
  props: {
    text: String,
    title: String,
  },
  emits: ["updateName"],
  components: {
    Button,
    CustomInput,
  },
  methods: {

    logChange(event) {
      this.$emit("updateName", event);
    },
  },
};
</script>

<style></style>
