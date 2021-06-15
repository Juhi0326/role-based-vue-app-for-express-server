<template>
  <div>
    A termék neve: {{ content.name }}
  </div>

    <div>
    A termék ára: {{ content.price }}
  </div>
    <img
            :src="content.imagePath"
            alt=""
            class="img-fluid max-with=50px"
          />

</template>

<script>
import UserService from "../services/user.service";
export default {
  data() {
    return {
      content: [],
    };
  },
  computed: {
    productId() {
      return this.$route.params.id;
    },
    /*   actualProduct () {

    } */
  },
created () {
    this.getProduct()
},
  methods: {
    getProduct() {
      const id = this.productId;
      UserService.getProductyId(id).then(
        (response) => {
            
          this.content = response.data.product;
          this.content.imagePath = "http://localhost:8081/" + this.content.imagePath
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style></style>
