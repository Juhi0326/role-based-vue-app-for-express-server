<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-6">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/Products" class="nav-link" v-if="productAccess" >Products</router-link>
          <router-link to="/Login" class="nav-link" v-if="!loggedIn"
            >Login</router-link
          >
          <router-link
            to="/Login"
            class="nav-link"
            v-if="loggedIn"
            @click="logOut"
            >Log Out</router-link
          >
          <div v-if="role" class=" d-flex">
            <button type="button" class="btn btn-success">{{ role }}</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      role: "",
      productAccess: false,
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
    },
    getRole() {
      if (this.$store.state.auth.user) {
        this.role = this.$store.state.auth.user.role;
      } else {
        this.role = "Gest";
      }
    },
    checkProductAccess() {
      if (this.$store.state.auth.user) {
        this.productAccess = true;
      } else {
        this.productAccess = false;
      }
    },
  },
  created() {
    this.getRole();
    this.checkProductAccess();
  },
  updated() {
    this.getRole();
    this.checkProductAccess();
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    userRole() {
      return this.$store.state.auth.user.role;
    },
  },
};
</script>

<style></style>
