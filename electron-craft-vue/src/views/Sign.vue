<template>
  <div id="sign-container">
    <form>
      <h1>ElectronCraft</h1>
      <label class="user-data"
        >NOM D'UTILISATEUR <input id="username-input" type="text"
      /></label>
      <label class="user-data"
        >MOT DE PASSE <input id="password-input" type="password"
      /></label>
      <span class="stay-connected"
        ><label><input type="checkbox" />Rester connecté</label
        ><a href="blank">Mot de passe oublié ?</a></span
      >
      <button type="button" class="login-btn" @click="tryLogin()">
        S'IDENTIFIER
      </button>
      <span class="got-account"
        >Pas encore de compte ? <a href="blank">S'inscrire</a></span
      >
    </form>
  </div>
</template>

<script>
import * as storage from "../modules/storage.js";
import axios from "axios";
export default {
  name: "Sign",
  components: {},
  data() {
    return {};
  },
  methods: {
    tryLogin() {
      const userData = new FormData();
      userData.set("username", document.getElementById("username-input").value);
      userData.set("password", document.getElementById("password-input").value);
      axios
        .post("http://localhost:3000/api/users/login", userData)
        .then((response) => {
          if (response) {
            console.log(response);
            storage.setStorage("token", response.data.token);
            storage.setStorage("username", response.data.username);
            storage.setStorage("userId", response.data.userId);
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped lang="scss">
#sign-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  flex-direction: column;
}
.login-btn {
  color: #e4e4e4;
  font-size: 20px;
  height: 40px;
  background: #007700;
  border: 4px solid darken(#007700, 10%);
  border-radius: 10px;
  letter-spacing: -0.07em;
  font-weight: 700;
}
form {
  position: relative;
  background: #101010;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 50px 30px;
  border-radius: 10px;
}
label {
  display: flex;
  gap: 10px;
  letter-spacing: -0.07em;
  &.user-data {
    font-weight: 700;
    justify-content: space-between;
    flex-direction: column;
  }
}
input {
  background: #030303;
  padding: 8px;
  border-radius: 5px;
  border: 0px;
  color: #e4e4e4;
}
span {
  display: flex;
  justify-content: space-between;
  &.got-account {
    justify-content: center;
    gap: 10px;
  }
}
a {
  font-weight: 700;
  color: inherit;
}
h1 {
  margin: 0 calc(50% - 100px);
  position: absolute;
  top: -20px;
  text-align: center;
}
</style>
