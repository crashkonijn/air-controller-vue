<template>
  <div id="app">
    <air-controller>
      <air-page name="home">
        <air-button name="top-left" anchor="top-left"></air-button>
        <air-button name="bottom-right" anchor="center-right"></air-button>
        <air-button name="center-center" anchor="center-center"></air-button>
      </air-page>
      <air-page name="loading"></air-page>
    </air-controller>
  </div>
</template>

<script>

import AirController from "./components/AirController";
import AirPage from "./components/AirPage";
import AirButton from "./components/AirButton";
export default {
  name: 'app',
  components: {AirButton, AirPage, AirController},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

  .air-page--home {
    background-color: green;
  }

  .air-page--loading {
    background-color: black;
  }
</style>
