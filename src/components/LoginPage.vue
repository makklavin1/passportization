<template>
  <div class="d-flex flex-column align-items-center justify-content-center vh-100">
    <div class="login-box p-4 shadow">
      <h2 class="text-center mb-4">Login Page</h2>
      <form @submit.prevent="login">
        <b-form-group>
          <b-form-input type="text" v-model="username" placeholder="Username" required></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="password" v-model="password" placeholder="Password" required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" class="w-100">Login</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8000/api/token/', {
          username: this.username,
          password: this.password,
        });
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('username', this.username);
        this.$emit('login-success', this.username); // Emit event on successful login
        this.$router.push({ name: 'Main' });
      } catch (error) {
        console.error(error);
        alert('Login failed');
      }
    },
  },
};
</script>

<style scoped>
.login-box {
  max-width: 400px;
  border-radius: 15px;
  background-color: white;
}
</style>
