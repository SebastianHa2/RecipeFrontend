<template>
    <div class="container">
        <div class="message" v-if="message !== ''">
            <p>{{ message }}</p>
        </div>
        <div class="input-container">
            <div class="input-group">
                <label for="username">Username: </label>
                <input :class="{errorBorder: shortUsername}" @focus="shortUsername = false, usernameTaken=false" type="text" id="username" v-model="username">
                <div class="error-message" v-if="shortUsername">Username must be at least 4 and no longer than 10 characters</div>
                <div class="error-message" v-if="usernameTaken">Username is already taken</div>
            </div>
            <div class="input-group">
                <label for="password">Password: </label>
                <input :class="{errorBorder: unmatchedPassword}" @focus="unmatchedPassword = false" type="password" id="password" v-model="password">
                <div class="error-message error-message-password" v-if="unmatchedPassword">Minimum 6 and maximum 20, containing uppercase, lowercase, special characters and digits</div>
            </div>
            <div class="input-group">
                <label for="confirmPassword">Confirm Password: </label>
                <input :class="{errorBorder: unmatchedPassword}" @focus="unmatchedPassword = false" type="password" id="confirmPassword" v-model="confirmPassword">
            </div>
            <button @click="registerNewCook">Register</button>
        </div>
    </div>
</template>

<script>
import CookDataService from '../services/CookDataServices.js'
export default {
    name: "Cook Register",
    props: ["loggedInAsId"],
    data() {
        return {
            username: '',
            password: '',
            confirmPassword: '',
            unmatchedPassword: false,
            shortUsername: false,
            usernameTaken: false,
            message: ''
        }
    },
    methods: {
        registerNewCook() {
            const newCook = {
                username: this.username,
                password: this.password,
                confirmPassword: this.confirmPassword
            }
            CookDataService.getAll().then(response => {
                response.data.forEach(user => {
                    if(user.username === newCook.username){
                        this.usernameTaken = true
                    }
                });
                if(this.password === this.confirmPassword && this.password.length > 5 && this.username.length > 3 && this.usernameTaken === false){
                        CookDataService.registerCook(newCook).then(() => {
                            this.username = ''
                            this.password = ''
                            this.confirmPassword = ''
                            this.message = "Cook account successfully created, you can now log in!" 
                            setTimeout(() => {
                                this.message = ''
                            }, 2000)
                        }).catch(err => {
                            err.response.data.errors.forEach(error => {
                                if(error.param === 'password'){
                                    this.unmatchedPassword = true
                                }
                                if(error.param === 'username'){
                                    this.shortUsername = true
                                }

                            })
                        })
                    }else{
                        if(this.username.length < 3){
                            this.shortUsername = true
                        }
                        if(this.password !== this.confirmPassword || this.password.length < 5){
                            this.unmatchedPassword = true
                        }
                    }
            })
        }
    },
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
        position: relative
    }

    .message{
        color: red;
        position: absolute;
        left: 50%;
        top: 1rem;
        transform: translateX(-50%);
        font-size: 1.5rem;
        text-transform: uppercase;
    }

    .input-container{
        min-height: 90vh;
        width: 60vw;
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

    .errorBorder{
        border: 0.2rem solid red;
    }

    .error-message{
        position: absolute;
        bottom: -2rem;
        left: 0;
        color: red;
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

    @media(max-width: 650px){
        .input-container{
            width: 80vw;
        }
    }

    @media(max-width: 500px){
        .input-group{
            margin: 3rem 0;
        }

        .error-message-password{
            bottom: -3.5rem;
        }
    }
</style>