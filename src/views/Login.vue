<template>
  <div class="container">
    {{loggedIn}}
    <div>{{currentUser}}</div>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <div class="row">
          <div class="mb-3 col align-self-center col-6">
            <label for="email">email</label>
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
          <div class="mb-3 col align-self-center col-6">
            <label for="password" class="form-label">Password</label>
            <input type="password" 
            v-model="password"
            class="form-control" 
            id="password" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="mb-3 col align-self-center col-6">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
        <div class="mb-3 col align-self-center col-6">
          <button @click="logOut" class="btn btn-primary">logOut</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
    email: '',
    password:''
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    }

  },
/*   created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  }, */
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');},
    
    handleLogin() {
      const user= {
        email: this.email,
        password: this.password
      }

      this.$store.dispatch("auth/login", user).then(
        () => {
          //this.$router.push("/profile");
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style scoped></style>
