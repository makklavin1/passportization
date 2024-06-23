<template>
  <div id="app">
    <b-navbar toggleable="lg" type="light" variant="warning" class="mb-4">
      <b-navbar-brand href="#">My App</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" @click="$router.push('/')">
            <i class="fas fa-home"></i> Главная
          </b-nav-item>
          <b-nav-item href="#" @click="$router.push('/my-objects')">
            <i class="fas fa-user"></i> Мои Объекты
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#" @click="logout" class="btn-outline">
            <i class="fas fa-sign-out-alt"></i> Выход
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
}
</script>

<style>
.btn-outline {
  border: 2px solid white;
  border-radius: 15px;
  padding: 5px 10px;
  color: white !important;
  display: flex;
  align-items: center;
}

.btn-outline i {
  margin-right: 5px;
}

.btn-outline:hover {
  background-color: white;
  color: #ff8c00 !important;
}

.navbar-nav {
  display: flex;
  align-items: center;
}

.navbar-nav .nav-item {
  margin-left: 10px;
}

.navbar-brand, .navbar-nav .nav-item {
  color: white !important;
}

.navbar {
  background-color: #ff8c00 !important;
}
</style>
