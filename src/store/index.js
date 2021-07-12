import { createStore } from 'vuex'
import { auth } from "./auth.module";
import createPersistedState from "vuex-persistedstate";

export default createStore({

  modules: {
    auth,
  },
  plugins: [createPersistedState()]
})
