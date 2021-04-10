<template>
  <div id="app">
    <nav class="navigation">
      <ul>
        <li class="nav-item" :class="{active: this.getRouteName === '/'}" ><router-link to="/">All Recipes</router-link></li>
        <li v-if="loggedInAsId" class="nav-item" :class="{active: this.getRouteName == '/recipes/add-recipe'}"><router-link to="/recipes/add-recipe">Add a Recipe</router-link></li>
        <li v-if="loggedInAsId == null" class="nav-item" :class="{active: this.getRouteName == '/cooks/register'}"><router-link to="/cooks/register">Register as a Cook</router-link></li>
        <li v-if="loggedInAsId == null" class="nav-item" :class="{active: this.getRouteName == '/cooks/log-in'}"><router-link to="/cooks/log-in">Log In</router-link></li>
        <li v-if="loggedInAsId" class="nav-item" :class="{active: this.getRouteName == '/recipes/my-recipes'}"><router-link to="/recipes/my-recipes">My Recipes</router-link></li>
        <li v-if="loggedInAsId" class="nav-item"><a @click="logOut">Log Out</a></li>
      </ul>
    </nav>
    <div class="component-container">
      <router-view :loggedInAsId="{loggedInAsId}"></router-view>
    </div>
    <p class="loggedIn" v-if="loggedInAsUsername !== ''">Logged in as {{loggedInAsUsername}}</p>
  </div>
</template>

<script>
import CookDataService from './services/CookDataServices'
export default {
  name: 'App',
  data() {
    return{
      loggedIn: false,
      loggedInAsUsername: '',
      loggedInAsId: null
    }
  },
  computed: {
    getRouteName() {
        return this.$route.path.toString();
    }
  },
  methods: {
    setLoggedInAs(loggedIn, username, id) {
      this.loggedIn = loggedIn
      this.loggedInAsUsername = username
      this.loggedInAsId = id
    },
    logOut() {
      this.loggedInAsId = null
      this.loggedInAsUsername = ''
      CookDataService.logOutCook().then(() => {
        console.log('successfully logged out')
        this.$router.push('/')
      }).catch(err => {
        console.log(err)
      })
    }
  },
  provide() {
    return {
      setLoggedInAs: this.setLoggedInAs
    }
  },
  mounted() {
    CookDataService.isLoggedIn().then(response => {
      this.setLoggedInAs(response.data.isLoggedIn, response.data.isLoggedInAs[0].username, response.data.isLoggedInAs[0].id)
      this.$router.push('/')
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@200;300;400;500&display=swap');

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    list-style-type: none;
    font-family: 'Catamaran', sans-serif;
  }

  html{
    font-size: 62.5%;
  }

  #app{
    background: linear-gradient(rgba(0.4, 0.5, 0.5, 0.8),rgba(0.4, 0.5, 0.5, 0.8)), url('./assets/bg.jpeg') center no-repeat;
    height: 100%;
  }

  .loggedIn{
    position: absolute; 
    right: 3rem;
    top: 10rem;
    color: #fff;
    font-size: 1.5rem;
  }

  .navigation{
    width: 100%;
    height: 10vh;
    background-color: rgba(253, 244, 152, 0.7);
  }

  .navigation ul{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .navigation ul li{
    width: 25%;
    height: 100%;
    font-size: 1.6rem;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
  }

  .navigation ul li a{
    color: #fff;
  }

  .navigation ul li:hover{
    background-color: rgba(253, 244, 152, 1);
    cursor: pointer;
  }

  .navigation ul li:hover a{
    color: #000;
  }

  .navigation ul li a{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .active{
    background-color: rgba(253, 244, 152, 1);
  }

  .navigation ul .active a{
    color: #000;
  }
</style>
