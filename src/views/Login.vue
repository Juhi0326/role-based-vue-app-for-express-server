<template>
  <div class="mt-5">
      <div id="form" >
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <div class="row">
              <div class="mb-3 mt-5">
                <label for="email" class="py-2">email</label>
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                />
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="mb-3">
                <label for="password" class="py-2">Password</label>
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  id="password"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="mb-3">
              <button type="submit" class="btn btn-primary">Submit</button>
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
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style scoped>
#form {
  display: flex;
  justify-content: center;
  
}
#main {
align-items: center;
}


</style>
