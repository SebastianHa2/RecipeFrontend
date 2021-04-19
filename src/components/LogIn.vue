<template>
    <div class="container">
        <div class="input-container">
            <div class="input-group">
                <label for="username">Username: </label>
                <input @click="incorrect = false" :class="{errorBorder: incorrect}" type="text" id="username" v-model="username">
                <div class="error-message" v-if="incorrect == true">incorrect username or password</div>
            </div>
            <div class="input-group">
                <label for="password">Password: </label>
                <input @click="incorrect = false" :class="{errorBorder: incorrect}" type="password" id="password" v-model="password">
            </div>
            <button @click="logIn">Log In</button>
        </div>
    </div>
</template>

<script>
import CookDataService from '../services/CookDataServices'
export default {
    name: "Log In",
    props: ["loggedInAsId"],
    data() {
        return {
            username: '',
            password: '',
            incorrect: false
        }
    },
    methods: {
        logIn() {
            const user = {
                username: this.username,
                password: this.password
            }

            CookDataService.logInCook(user).then(response => {
                console.log(response)
                this.setLoggedInAs(true, response.data.user[0].username, response.data.user[0].id)
                this.$router.push('/recipes')
            }).catch(() => {
                this.incorrect = true
            })
        }
    },
    inject: ['setLoggedInAs'],
    beforeMount() {
        if(this.loggedInAsId.loggedInAsId !== null) {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
    .container{
        width: 100%;
        height: 100%;
        padding-top: 10rem;
    }

    .errorBorder{
        border: 0.2rem solid red;
    }

    .error-message{
        position: absolute;
        top: -2rem;
        left: 0;
        color: red;
        text-transform: uppercase;
    }

    .input-container{
        min-height: 90vh;
        width: 50vw;
        margin: auto;
        display: flex;
        flex-direction: column;
    }

    .input-group{
        display: flex;
        flex-direction: column;
        color: #fff;
        margin: 2rem 0;
        position: relative;
    }

    .input-group input{
        padding-left: 0.5rem;
    }

    .input-group textarea{
        max-width: 100%;
        max-height: 50rem;
        padding: 0.5rem;
    }

    .input-group label{
        font-size: 1.5rem;
        text-transform: uppercase;
        font-weight: 200;
    }

    button{
        width: 30%;
        margin: 3rem auto;
        padding: 0.5rem 1.5rem;
        background-color: transparent;
        color: #fff;
        border: 0.2rem solid #fff;
        transition:  all 0.4s;
    }

    button:hover{
        cursor: pointer;
        background: #fff;
        border: 0.2rem solid #000;
        color: #000;
    }

    /* Media queries */ 

    @media(max-width: 1000px){
        .input-container{
            width: 70vw;
        }
    }
</style>