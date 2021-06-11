<template>
  <div class="container">
    <header class="jumbotron">
      <h1>{{ content.Title}}</h1>
      <h3>{{ content.Heading}}</h3>
      <img :src="imagePath" alt="">
    </header>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Home",
  data() {
    return {
      content: '',
      imagePath: ''
    };
  },
  
  mounted() {
    UserService.getHomePage().then(
      (response) => {
        this.content = response.data.HomePage[0];
        this.imagePath= 'http://localhost:8081/'+this.content.imagePath
        console.log(this.content.imagePath)
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
