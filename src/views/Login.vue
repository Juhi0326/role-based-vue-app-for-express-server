<template>
  <h1>Login Form</h1>
  <div v-if="error" id="error">
    {{ errorMessage }}
  </div>
  <div class="mt-5">
    <div class="row">
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <div class="row justify-content-md-center">
            <div class="mb-3 mt-5 col-8">
              <label for="email" class="py-2">Email</label>
              <input
                v-model="email"
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Please type your email"
                @keyup="clearError"
              />
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row justify-content-md-center">
            <div class="mb-3 col-8">
              <label for="password" class="py-2">Password</label>
              <input
                type="password"
                v-model="password"
                class="form-control"
                id="password"
                placeholder="Please type your password"
                @keyup="clearError"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="mb-3">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="!email.length || !password.length"
            >
              Login
            </button>
          </div>
          <div>
            <router-link to="/signup">or Sign up </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      error: false,
      errorMessage: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  /*   created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  }, */
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
    },

    handleLogin() {
      const user = {
        email: this.email,
        password: this.password,
      };

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/");
          console.log(this.$store.user)
        },
        (error) => {
          this.error = true;
          this.errorMessage = "Auth failed!";
          console.log("Auth failed");
          console.log(error);
        }
      );
    },
    clearError() {
      this.error = false;
      this.errorMessage = "";
    },
  },
};
</script>

<style scoped>
#form {
  display: flex;
  justify-content: center;
}
#error {
  color: crimson;
}
#main {
  align-items: center;
}


</style>
