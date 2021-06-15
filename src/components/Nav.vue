<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-6" >
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
          <router-link to="/Products" class="nav-link">Products</router-link> 
          <router-link to="/Login" class="nav-link">Login</router-link> 
        </div>
      </div> 
    </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>