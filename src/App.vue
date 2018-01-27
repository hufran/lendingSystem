<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
ul,li{
  list-style-type: none;
  padding:0;
}
.floatLeft{
  float:left;
}
.floatRight{
  float: right;
}
.clear{
  overflow: hidden;
  clear: both;
  display: block;
}
.textCenter{
  text-align: center !important;
}
button{
  text-shadow: none;
  border:0;
}
a{
  border:0;
  text-decoration:none;
}

.clear:after{
  conten:'';
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  width:100%;
  overflow: hidden;
  clear: both;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size:100%;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
