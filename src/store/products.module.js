import userService from "../services/user.service";

export const products = {
  namespaced: true,
  state: {
    products: [],
  },
  actions: {
    getProducts({ commit }, products) {
      return userService.getProducts().then(
        (product) => {
          commit("getProductsSuccess", product);
          return Promise.resolve(products);
        },
        (error) => {
          commit("productsFailure");
          return Promise.reject(error);
        }
      );
    },
  },
  getters:{
      getAllProducts(state) {
        return state.products
      }
  },

  mutations: {
    getProductsSuccess(state, products) {
      state.products = products;
    },
    productsFailure(state) {
      state.products = null;
    },
  },
};
