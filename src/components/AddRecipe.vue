<template>
    <div class="container">
        <div class="message" v-if="message !== ''">
            <p>{{ message }}</p>
        </div>
        <div class="input-container">
            <div class="input-group">
                <label for="title">Title:</label>
                <input type="text" id="title" v-model="title" name ="title">
            </div>
            <div class="input-group">
                <label for="duration">Approximate cooking duration (minutes):</label>
                <input type="number" id="duration" v-model="duration" name ="duration">
            </div>
            <div class="input-group">
                <label for="instructions">Cooking instructions:</label>
                <textarea name="instructions" id="instructions" cols="30" rows="10" v-model="instructions"></textarea>
            </div>
            <div class="input-group">
                <label for="imageUrl">Image Url:</label>
                <input type="text" id="imageUrl" v-model="imageUrl" name ="imageUrl">
            </div>
            <button @click="addRecipe()">Add Recipe</button>
        </div>
    </div>
</template>

<script>
import RecipeDataService from '../services/RecipeDataServices'
export default {
    name: 'Add Recipe',
    data() {
        return {
            title: '',
            duration: null,
            instructions: '',
            message: '',
            imageUrl: ''
        }
    },
    methods: {
        addRecipe() {
            
            const newRecipe = {}
            newRecipe.title = this.title
            newRecipe.duration = this.duration
            newRecipe.instructions = this.instructions
            newRecipe.cookId = this.loggedInAsId.loggedInAsId
            newRecipe.imageUrl = this.imageUrl

            RecipeDataService.create(newRecipe).then(response => {
                console.log(response)
                this.title = ''
                this.duration = null,
                this.instructions = ''
                this.imageUrl = ''
                this.message = 'Recipe was successfully addded!'
                setTimeout(() => {
                    this.message = ''
                }, 2000)
            }).catch(err => {
                console.log(err)
            })
        }
    },
    props: ['loggedInAsId']
}
</script>

<style scoped>
    .container{
        width: 100%;
        height: 100%;
        padding: 5rem 0;
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