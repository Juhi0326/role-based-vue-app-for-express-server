<template>
  <div class="d-flex justify-content-between mt-3">
    <span> termék neve: {{ content.name }} </span>
    <span v-if="access"
      >
      <ChangeDataModal 
      @update-name="updateProductName"
      text='Termék nevének megváltoztatása'
      title= 'Írd be az új termék nevet!'
      :content="content.name" />
    </span>
  </div>
  
  <div class="d-flex justify-content-between mt-3">
    <span> termék ára: {{ content.price }} </span>
    <span v-if="access"
      ><button type="button" class="btn btn-primary btn-sm">
        termék árának megváltoztatása
      </button>
    </span>
  </div>

  <div class="d-flex justify-content-between mt-3">
    <span> <img :src="content.imagePath" alt="" class="responsive" /> </span>
    <span v-if="access"
      ><button type="button" class="btn btn-primary btn-sm">
        kép megváltoztatása
      </button>
    </span>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import ChangeDataModal from '../components/ChangeDataModal.vue'
export default {
  components: {
    ChangeDataModal
  },
  
  data() {
    return {
      content: [],
      access: false,
    };
  },
  computed: {
    productId() {
      return this.$route.params.id;
    },
  },
  created() {
    this.getProduct();
    this.getAccessInfo();
  },
  methods: {
    getProduct() {
      const id = this.productId;
      UserService.getProductyId(id).then(
        (response) => {
          this.content = response.data.product;
          this.content.price = this.formatMoney(this.content.price);
          this.content.imagePath =
            "http://localhost:8081/" + this.content.imagePath;
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
    updateProductName() {
      console.log(this.$route.params.id);
    
    },
    formatMoney(amount) {
      const value = Number(amount).toLocaleString("hu-HU", {
        // minimumFractionDigits: 2,
        // maximumFractionDigits: 2,
      });
      return `${value} Ft`;
    },
    getAccessInfo() {
      if (this.$store.state.auth.user.role === "admin") {
        this.access = true;
      }
      console.log(this.access);
    },
  },
};
</script>

<style>
.responsive {
  width: 100%;
  max-width: 500px;
  height: auto;
}
</style>
