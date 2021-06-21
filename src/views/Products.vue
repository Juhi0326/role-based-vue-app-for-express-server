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
        <div v-for="(product, index) in filteredProducts" :key="index" class="mt-3">
          <h1 @click="goToProductDetails(product._id)">Termék név: {{ product.name }}</h1>
          <h3 @click="goToProductDetails(product._id)">ár: {{ product.price }}</h3>
          <img
            :src="product.imagePath"
            alt=""
            class="img-fluid max-with=50px mb-5"
            @click="goToProductDetails(product._id)"
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
      searchField: '',
      id: null
    };
  },
  updated () {
      console.log(this.id)
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
  created() {
    this.getProduct();
  },
  methods: {
    formatMoney(amount) {
      const value = Number(amount).toLocaleString("hu-HU", {
        // minimumFractionDigits: 2,
        // maximumFractionDigits: 2,
      });
      return `${value} Ft`;
    },
    getProduct() {
      UserService.getProducts().then(
        (response) => {
          this.content = response.data.products;
          this.content.map((product) => {
            product.imagePath = "http://localhost:8081/" + product.imagePath;
            product.price = this.formatMoney(product.price);
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
    goToProductDetails(id) {
      console.log(id)
      this.$router.push("/Product-details/"+id)
    }
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
