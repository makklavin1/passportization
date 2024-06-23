<template>
  <div>
    <h2>Login Page</h2>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
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
        localStorage.setItem('username', this.username); // Сохраняем имя пользователя
        this.$router.push({ name: 'Main' });
      } catch (error) {
        console.error(error);
        alert('Login failed');
      }
    },
  },
};
</script>
