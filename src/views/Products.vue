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
        <div class="row">
          <div
          v-for="(product, index) in filteredProducts"
          :key="index"
          class="mt-3 col"        
        >
          <div class="card" style="width: 18rem;">
            <img
              :src="product.imagePath"
              :alt="product.name"
              @click="goToProductDetails(product._id)"
            />
            <div class="card-body">
              <h5 class="card-title" @click="goToProductDetails(product._id)">
                Termék név: {{ product.name }}
              </h5>
              <p class="card-text" @click="goToProductDetails(product._id)">
                ár: {{ product.price }}
              </p>
            </div>
          </div>
        </div>
      </div>

        </div>
        
      <div v-else>
        <h1>be kell jelentkezned, hogy elérd a termékek listáját!</h1>
      </div>
    </header>
  </div>
</template>

<script>
import userService from "../services/user.service";
export default {
  name: "User",
  data() {
    return {
      content: [],
      searchField: "",
      id: null,
    };
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },

    filteredProducts() {
      return this.content.filter((product) => {
        if (
          product.name &&
          product.name.toLowerCase().includes(this.searchField.toLowerCase())
        ) {
          return product;
        } else if (
          product.price &&
          product.price.toString().includes(this.searchField.toLowerCase())
        ) {
          return product;
        }
      });
    },
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    formatMoney(amount) {
      const value = Number(amount).toLocaleString("hu-HU", {
        // minimumFractionDigits: 2,
        // maximumFractionDigits: 2,
      });
      return `${value} Ft`;
    },

    async getProducts() {
      await userService.getProducts().then((response) => {
        this.content = response.data.products;
      });
      this.content.map((product) => {
        product.imagePath = "http://localhost:8081/" + product.imagePath;
      });

      if (this.content) {
        this.content.map((product) => {
          if (typeof product.price === "number") {
            product.price = this.formatMoney(product.price);
          }
        });
      }
    },
    goToProductDetails(id) {
      console.log(id);
      this.$router.push("/Product-details/" + id);
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
  height: 200px;
}
</style>
