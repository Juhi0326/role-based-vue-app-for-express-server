<template>
  <div class="container">
    <header class="jumbotron">
      <div v-if="loggedIn">
        <form class="d-flex">
          <input
            v-model="searchField"
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
        <div v-for="(product, index) in filteredProducts" :key="index">
          <h1>Termék név: {{ product.name }}</h1>
          <h3>ár: {{ product.price }}</h3>
          <img
            :src="product.imagePath"
            alt=""
            class="img-fluid max-with=50px"
          />
        </div>
      </div>
      <div v-else>
        <h1>be kell jelentkezned, hogy elérd a termékek listáját!</h1>
      </div>
    </header>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "User",
  data() {
    return {
      content: [],
      searchField: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    filteredProducts() {
      return this.content.filter(product  => {

        if (product.name.toLowerCase().includes(this.searchField.toLowerCase())) {
          return product
        } else if (product.price.toString().includes(this.searchField.toLowerCase())) {
          return product
        }
      });
    },
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      UserService.getProducts().then(
        (response) => {
          this.content = response.data.products;
          this.content.map((product) => {
            product.imagePath = "http://localhost:8081/" + product.imagePath;
          });
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
<style scoped>
img {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 250px;
}
</style>
