import userService from "../services/user.service";

export const products = {
  namespaced: true,
  state: {
    products: [],
  },
  actions: {
    getProducts({ commit }, products) {
      return userService.getProducts().then(
        (response) => {
          products = response.data.products;

          commit("getProductsSuccess", products);
          return Promise.resolve(products);
        },
        (error) => {
          commit("productsFailure");
          return Promise.reject(error);
        }
      );
    },
  },
  getters: {
    getAllProducts(state) {
      return state.products;
    },
  },

  mutations: {
    getProductsSuccess(state, products) {
      state.products = products;
      state.products.map((product) => {
        product.imagePath = "http://localhost:8081/" + product.imagePath;
      });
    },
    productsFailure(state) {
      state.products = null;
    },
  },
};
