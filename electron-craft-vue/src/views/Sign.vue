<template>
  <div id="sign-container">
    <form>
      <h1>ElectronCraft</h1>
      <label v-if="login == 0" class="user-data"
        >ADRESSE MAIL <input id="mail-input" type="text"
      /></label>
      <label class="user-data"
        >NOM D'UTILISATEUR <input id="username-input" type="text"
      /></label>
      <label class="user-data"
        >MOT DE PASSE <input id="password-input" type="password"
      /></label>
      <span class="stay-connected"
        ><label><input type="checkbox" />Rester connecté</label
        ><a href="#">Mot de passe oublié ?</a></span
      >
      <button
        v-if="login == 1"
        type="button"
        class="login-btn"
        @click="tryLogin()"
      >
        S'IDENTIFIER
      </button>
      <button v-else type="button" class="login-btn" @click="tryRegister()">
        S'INSCRIRE
      </button>
      <span v-if="login == 1" class="got-account"
        >Pas encore de compte ?
        <a @click="swapLoginRegister()" href="#">S'inscrire</a></span
      >
      <span v-else class="got-account"
        >Déjà un compte ?
        <a @click="swapLoginRegister()" href="#">Se connecter</a></span
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
    return {
      login: 1,
    };
  },
  methods: {
    tryLogin() {
      // const userData = new FormData();
      // userData.set("username", document.getElementById("username-input").value);
      // userData.set("password", document.getElementById("password-input").value);
      // axios
      //   .post("http://51.91.56.15:3000/api/users/login", userData)
      //   .then((response) => {
      //     if (response) {
      //       storage.setStorage("token", response.data.token);
      //       storage.setStorage("username", response.data.username);
      //       storage.setStorage("userId", response.data.userId);
      //       this.$router.push("/");
      //     }
      //   })
      //   .catch((error) => console.log(error));
      storage.setStorage(
        "username",
        document.getElementById("username-input").value
      );
      this.$router.push("/");
    },
    tryRegister() {
      const userData = new FormData();
      userData.set("mail", document.getElementById("mail-input").value);
      userData.set("username", document.getElementById("username-input").value);
      userData.set("password", document.getElementById("password-input").value);
      axios
        .post("http://51.91.56.15:3000/api/users/signup", userData)
        .then((response) => {
          if (response) {
            storage.setStorage("token", response.data.token);
            storage.setStorage("username", response.data.username);
            storage.setStorage("userId", response.data.userId);
            this.$router.push("/");
          }
        })
        .catch((error) => console.log(error));
    },
    swapLoginRegister() {
      if (this.login == 1) {
        this.login = 0;
      } else {
        this.login = 1;
      }
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
  height: 50px;
  background: #008942;
  border: 4px solid darken(#008942, 10%);
  border-radius: 10px;
  letter-spacing: -0.07em;
  font-weight: 700;
}
form {
  position: relative;
  background: #1c1c1c;
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
  margin: -70px 0 30px;
  top: -20px;
  text-align: center;
}
</style>
