import { createStore } from 'vuex'
import { auth } from "./auth.module";
import { products } from "./products.module";
import createPersistedState from "vuex-persistedstate";

export default createStore({

  modules: {
    auth,
    products
  },
  plugins: [createPersistedState()]
})
