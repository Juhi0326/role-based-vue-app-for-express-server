<template>
  
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Products" class="nav-link" v-if="productAccess"
              >Products</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/Login" class="nav-link" v-if="!loggedIn"
              >Login</router-link
            >
          </li>
          <li class="nav-item">
       <router-link
            to="/Login"
            class="nav-link"
            v-if="loggedIn"
            @click="logOut"
            >Log Out</router-link
          >
          </li>
        </ul>
        <span class="navbar-text" v-if="role">
          <button type="button" class="btn btn-success">{{ role }}</button>
        </span>
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
