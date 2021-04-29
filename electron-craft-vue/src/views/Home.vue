<template>
  <div id="home-container">
    <main>
      <section class="panel" id="left-panel">
        <div>
          <span id="user-profile"
            ><p>
              <img src="../assets/main-background.webp" />{{ getUsername }}
            </p>
            <img class="chevron" src="../assets/chevron-down-solid.svg"
          /></span>
          <span><img src="../assets/news-logo.png" />Nouveautés</span>
          <span class="selected"
            ><img
              src="../assets/ElectronCraft-logo.png"
            />ElectronCraft:<br />Vue.js Edition</span
          >
        </div>
        <span id="settings"
          ><img src="../assets/settings-logo.png" />Réglages</span
        >
      </section>
      <section class="panel" id="right-panel">
        <header><h1>ElectronCraft</h1></header>
        <section id="main-section">
          <footer>
            <span
              ><p>
                <img src="../assets/release-logo.png" />Latest release
                <br />1.16.5
              </p>
              <img class="chevron" src="../assets/chevron-down-solid.svg"
            /></span>
            <button id="play-button">Jouer</button>
            <p>{{ getUsername }}</p>
          </footer>
        </section>
      </section>
    </main>
  </div>
</template>

<script>
import * as storage from "../modules/storage.js";
export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  computed: {
    getUsername() {
      return storage.getStorage("username");
    },
  },
  methods: {
    disconnect() {
      this.$router.push("/sign");
      localStorage.clear();
      sessionStorage.clear();
    },
  },
};
</script>

<style scoped lang="scss">
div {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}
#home-container {
  display: flex;
  justify-content: left;
  width: 100%;
  height: 100vh;
  flex-direction: row;
}
main {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.panel {
  display: flex;
  flex-direction: column;
  flex-basis: 10%;
}
#left-panel {
  background: #262626;
  justify-content: space-between;
  flex: 0 0 12%;
}
span:not(.selected) {
  padding-left: 16px;
  &:hover {
    background: lighten(#262626, 10%);
    cursor: pointer;
  }
}
#right-panel {
  background: #262626;
  flex: 1;
  padding: 0;
}
span {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  padding: 10px;
  &:hover > .chevron {
    transform: translateY(2px);
  }
  &#user-profile {
    justify-content: space-between;
    margin: 10px 0;
  }
  & img {
    height: 30px;
    width: 30px;
  }
}
header {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: underline #007700;
}
#main-section {
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background: url("../assets/main-background.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
footer {
  width: calc(100% - 20px);
  padding: 0 10px;
  background: #262626;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
#play-button {
  cursor: pointer;
  position: absolute;
  top: -25px;
  left: calc(50% - 100px);
  height: 50px;
  width: 200px;
  background: #008942;
  border: 4px solid darken(#008942, 10%);
  border-radius: 10px;
  letter-spacing: -0.07em;
  font-weight: 700;
  font-size: 20px;
  color: #e4e4e4;
}
.selected {
  border-left: solid 6px #e4e4e4;
}
p {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
}
.chevron {
  width: 15px;
}
</style>
