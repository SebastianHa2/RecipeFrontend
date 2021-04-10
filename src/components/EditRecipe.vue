<template>
    <div class="container" v-if="activeRecipe">
        <div class="message" v-if="message !== ''">
            <p>{{ message }}</p>
        </div>
        <div class="input-container">
            <div class="input-group">
                <label for="title">Title:</label>
                <input type="text" id="title" v-model="activeRecipe.title" name ="title">
            </div>
            <div class="input-group">
                <label for="duration">Approximate cooking duration (minutes):</label>
                <input type="number" id="duration" v-model="activeRecipe.duration" name ="duration">
            </div>
            <div class="input-group">
                <label for="instructions">Cooking instructions:</label>
                <textarea name="instructions" id="instructions" cols="30" rows="10" v-model="activeRecipe.instructions"></textarea>
            </div>
            <button @click="editRecipe()">Edit Recipe</button>
        </div>
    </div>
</template>

<script>
import RecipeDataService from '../services/RecipeDataServices'
export default {
    data() {
        return {
            activeRecipe: null,
            message: ''
        }
    },
    methods: {
        getRecipe(id) {
            RecipeDataService.getOne(id).then(response => {
                console.log(response)
                this.activeRecipe = response.data
            }).catch(err => {
                console.log(err.message)
            })
        },
        editRecipe() {
            RecipeDataService.update(this.activeRecipe.id, this.activeRecipe).then(() => {
                this.message = 'Recipe was successfully updated!'
                setTimeout(() => {
                    this.message = ''
                }, 2000)
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mounted() {
        this.getRecipe(this.$route.params.id)
    },
    props: ['loggedInAsId'],
    beforeMount() {
        if(this.loggedInAsId.loggedInAsId === null) {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
    .container{
        width: 100%;
        height: 100%;
        padding-top: 3rem;
        position: relative;
    }

    .message{
        color: #fff;
        position: absolute;
        left: 50%;
        top: 1rem;
        transform: translateX(-50%);
        font-size: 1.5rem;
        text-transform: uppercase;
    }

    .input-container{
        min-height: 90vh;
        width: 40vw;
        margin: auto;
        display: flex;
        flex-direction: column;
    }

    .input-group{
        display: flex;
        flex-direction: column;
        color: #fff;
        margin: 2rem 0;
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
</style>