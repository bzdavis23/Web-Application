<template>
  <div id="register">
    <form v-on:submit.prevent="register">
      <h1>Create Account</h1>
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
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          v-model="user.name"
          required
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          v-model="user.password"
          required
        />
        <label for="confirmPassword">Confirm password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          v-model="user.confirmPassword"
          required
        />

        <label for="address">Address</label>
        <input
          type="text"
          id="address"
          placeholder="Address"
          v-model="user.address"
        />

        <label for="city">City</label>
        <input type="text" id="city" placeholder="City" v-model="user.city" />

        <label for="state">State</label>
        <input
          type="text"
          id="state"
          placeholder="State"
          v-model="user.stateCode"
          maxlength="2"
          required
        />

        <label for="zip">ZIP</label>
        <input
          type="number"
          id="zip"
          placeholder="ZIP"
          v-model="user.zip"
          required
          minlength="5"
          maxlength="5"
        />
        <div></div>
        <div>
          <button type="submit">Create Account</button>
        </div>
      </div>
      <hr />
      Have an account?
      <router-link v-bind:to="{ name: 'login' }">Sign in!</router-link>
    </form>
  </div>
</template>

<script>
import authService from "../services/AuthService";

export default {
  name: "RegisterView",
  data() {
    return {
      user: {
        username: "",
        name: "",
        password: "",
        confirmPassword: "",
        address: "",
        city: "",
        stateCode: "",
        zip: "",
        role: "user",
      },
    };
  },
  methods: {
    error(msg) {
      alert(msg);
    },
    success(msg) {
      alert(msg);
    },
    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.error("Password & Confirm Password do not match");
      } else {
        authService
          .register(this.user)
          .then((response) => {
            if (response.status == 201) {
              this.success("Thank you for registering, please sign in.");
              this.$router.push({
                path: "/login",
              });
            }
          })
          .catch((error) => {
            const response = error.response;
            if (!response) {
              this.error(error);
            } else if (response.status === 400) {
              if (response.data.errors) {
                // Show the validation errors
                let msg = "Validation error: ";
                for (let err of response.data.errors) {
                  msg += `'${err.field}':${err.defaultMessage}. `;
                }
                this.error(msg);
              } else {
                this.error(response.data.message);
              }
            } else {
              this.error(response.data.message);
            }
          });
      }
    },
  },
};
</script>

<style scoped>
  #register {
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
    border-color: #8e44ad;
    outline: none;
  }

  button[type="submit"] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    background-color: #8e44ad;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button[type="submit"]:hover {
    background-color: #6c3483;
  }

  hr {
    margin-top: 40px;
    margin-bottom: 20px;
    border: none;
    border-top: 1px solid #dddddd;
  }

  .sign-in-link {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #555555;
  }

  .sign-in-link a {
    color: #8e44ad;
    text-decoration: none;
  }

  .sign-in-link a:hover {
    text-decoration: underline;
  }
</style>
