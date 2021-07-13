<template>
  <div class="d-flex justify-content-between mt-3">
    <span> termék neve: {{ Product.name }} </span>
    <span v-if="access">
      <!-- Button trigger modal -->
      <Button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Termék nevének megváltoztatása
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
              <h5 class="modal-title" id="exampleModalLabel">
                Írd be az új terméknevet!
              </h5>
              <Button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></Button>
            </div>
            <CustomInput :inputTitle="title" @custom-change="logChange" />
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
    </span>
  </div>

  <div class="d-flex justify-content-between mt-3">
    <span> termék ára: {{ Product.price }} </span>
    <span v-if="access">
      <!-- Button trigger modal -->
      <Button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
      >
        Termék árának megváltoztatása
      </Button>

      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModal2Label"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModa2lLabel">
                Írd be az új árat!
              </h5>
              <Button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></Button>
            </div>
            <CustomInput :inputTitle="title" @custom-change="logChange2" />
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
import Button from "../components/Button.vue";
import CustomInput from "../components/CustomInput.vue";
export default {
  components: {
    Button,
    CustomInput,
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
    Product() {
      return this.content;
    },
  },
  created() {
    this.getProduct();
    this.getAccessInfo();
  },

  methods: {
    async getProduct() {
      const id = this.productId;
      await UserService.getProductyId(id).then((response) => {
        this.content = response.data.product;
        this.content.price = this.formatMoney(this.content.price);
        this.content.imagePath =
          "http://localhost:8081/" + this.content.imagePath;
      });
    },
    updateProductName(event) {
      UserService.updateProductsById(this.$route.params.id, [
        { propName: "name", value: event },
      ]);
      this.getProduct();
    },
    async updateProductPrice(event) {
      await UserService.updateProductsById(this.$route.params.id, [
        { propName: "price", value: event },
      ]);
      this.getProduct();
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
    },
    logChange(event) {
      this.updateProductName(event);
    },
    logChange2(event) {
      this.updateProductPrice(event);
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
