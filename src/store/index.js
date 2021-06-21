import { createStore } from 'vuex'
import { auth } from "./auth.module";
import { products } from "./products.module";

export default createStore({

  modules: {
    auth,
    products
  },
})
