<template>
  <h1>Register Form</h1>
  <div v-if="error" id="error">
    {{errorMessage.message}}
  </div>
    <div class="mt-5">
      <div class="row">
        <form @submit.prevent="handleSignUp">
          <div class="form-group">
            <div class="row justify-content-md-center">
              <div class="mb-3 mt-5 col-8">
                <label for="email" class="py-2">email</label>
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
              <button type="submit" class="btn btn-primary" :disabled="!email.length || !password.length">Register</button>
            </div>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
import AuthService from "../services/auth.service";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      error: false,
      errorMessage: ""
    };
  },

  methods: {
    handleSignUp() {
       
        const user = {
          email: this.email,
          password: this.password,
          role: "user",
        };
        AuthService.register(user).then((response) => {
          if (!response.data) {
            console.log(response);
            this.error = true
            this.errorMessage = response
            this.
            console.log("Hibás kérés!");
          }

          if (response.status === 201) {
            console.log("sikerült");
            console.log(response.data)
            this.email = "";
            this.password = "";
          }
        });
      },
      clearError() {
        this.error =false;
        this.errorMessage = ''
      }
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
