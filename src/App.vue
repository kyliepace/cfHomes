<template>
  <div id="app">
    <h3>Crossfit Homes</h3>
    <!-- <AddressSearch></AddressSearch> -->
    <MyMap></MyMap>
  </div>
</template>

<script>
import MyMap from './components/MyMap'
//import AddressSearch from './components/AddressSearch'

export default {
  name: 'app',
  components: {
    MyMap
  }
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
</style>