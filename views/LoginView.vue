<template>
  <div id="login">
    <form v-on:submit.prevent="login">
      <h1>Please Sign In</h1>
      <div id="fields">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          v-model="user.username"
          required
          autofocus
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          v-model="user.password"
          required
        />
        <div><button type="submit">Sign in</button></div>
      </div>
      <hr/>
      Need an account? <router-link v-bind:to="{ name: 'register' }">Register!</router-link>
    </form>
  </div>
</template>

<script>
import authService from "../services/AuthService";

export default {
  name: "LoginView",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      authService
        .login(this.user)
        .then((response) => {
          if (response.status == 200) {
            this.$store.commit("SET_AUTH_TOKEN", response.data.token);
            this.$store.commit("SET_USER", response.data.user);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          const response = error.response;
          if (!response) {
            alert(error);
          } else if (response.status === 401) {
            alert("Invalid username and password!");
          } else {
            alert(response.message);
          }
        });
    },
  },
};
</script>

<style scoped>

#login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
  }

  form {
    width: 400px;
    padding: 40px;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  h1 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    color: #333333;
  }

  label {
    display: block;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #555555;
  }

  input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    margin-bottom: 20px;
    color: #333333;
  }

  input[type="text"]:focus,
  input[type="password"]:focus {
    border-color: #2980b9;
    outline: none;
  }

  button[type="submit"] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    background-color: #2980b9;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button[type="submit"]:hover {
    background-color: #1a5276;
  }

  hr {
    margin-top: 40px;
    margin-bottom: 20px;
    border: none;
    border-top: 1px solid #dddddd;
  }

  .register-link {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #555555;
  }

  .register-link a {
    color: #2980b9;
    text-decoration: none;
  }

  .register-link a:hover {
    text-decoration: underline;
  }

</style>
