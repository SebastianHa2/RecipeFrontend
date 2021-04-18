<template>
    <div class="container">
        <div class="input-container">
            <div class="input-group">
                <label for="title">Title:</label>
                <input :class="{errorBorder: invalidTitle}" type="text" id="title" v-model="title" name ="title" @focus="invalidTitle = false">
                <div class="error-message" v-if="invalidTitle">Title must be at least 3 characters long</div>
            </div>
            <div class="input-group">
                <label for="duration">Approximate cooking duration (minutes):</label>
                <input :class="{errorBorder: invalidDuration}" type="number" id="duration" v-model="duration" name ="duration" @focus="invalidDuration = false">
                <div class="error-message" v-if="invalidDuration">Minimum approximate duration is 10 minutes</div>
            </div>
            <div class="input-group">
                <label v-if="editOn === false" for="instructions">Step {{stepCount}}:</label>
                <label v-if="editOn === true" for="instructions">Editing Step {{stepToEdit}}:</label>
                <textarea :class="{errorBorder: invalidInstructions}" name="instruction" id="instruction" v-model="step" cols="10" rows="10" @focus="invalidInstructions = false"></textarea>
                <button v-if="editOn === true" @click="saveEditedStep">Edit step</button>
                <button v-if="editOn === false" @click="addStep">Add step</button>
                <div class="error-message" v-if="invalidInstructions">Instructions must have at least 1 step</div>
            </div>
            <div class="input-group">
                <ul id="instructionsList">
                    <li v-for="step in cookingStepsOutput" :key="step">
                        {{step}}
                        <i class="fas fa-pen" @click="editStep($event)"></i>
                        <i class="far fa-trash-alt" @click="deleteStep($event)"></i>
                    </li>
                </ul>
            </div>
            <div class="input-group">
                <label for="imageUrl">Image Url:</label>
                <input :class="{errorBorder: invalidImageUrl}" type="text" id="imageUrl" v-model="imageUrl" name ="imageUrl" @focus="invalidImageUrl = false">
                <div class="error-message" v-if="invalidImageUrl">Image URL must be of URL type</div>
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
            instructions: {},
            imageUrl: '',

            stepCount: 1,
            step: '',
            cookingStepsOutput: [],

            message: '',

            editOn: false,
            stepToEdit: null,

            invalidTitle: false,
            invalidDuration: false,
            invalidInstructions: false,
            invalidImageUrl: false
        }
    },
    methods: {
        // Send a request to add a recipe
        addRecipe() {
            
            const newRecipe = {}
            newRecipe.title = this.title
            newRecipe.duration = this.duration
            newRecipe.instructions = JSON.stringify(this.instructions)
            newRecipe.cookId = this.loggedInAsId.loggedInAsId
            newRecipe.imageUrl = this.imageUrl

            RecipeDataService.create(newRecipe).then(response => {
                console.log(response)
                this.title = ''
                this.duration = null,
                this.instructions = ''
                this.imageUrl = ''
                this.$router.push({path: '/', query:{msg: 'added'}})
            }).catch(err => {
                console.log(err.response.data)
                // Showing validation error messages
                err.response.data.errors.forEach(error => {
                    if (error.param === 'title'){
                        this.invalidTitle = true
                    }
                    if (error.param === 'duration'){
                        this.invalidDuration = true
                    }
                    if (error.param === 'instructions'){
                        this.invalidInstructions = true
                    }
                    if (error.param === 'imageUrl'){
                        this.invalidImageUrl = true
                    }
                })
            })
        },

        /* In some methods the cookingStepsOutput array must be reset to 
        avoid double displaying in the UI */

        // Add a step to the instructions
        addStep() {
            this.cookingStepsOutput = []
            this.instructions[this.stepCount] = this.step
            this.stepCount++
            this.appendCookingStep()
        },

        // Append to the array that the UI displays
        appendCookingStep() {
            for(this.step in this.instructions){
                this.cookingStepsOutput.push(`${this.step}. ${this.instructions[this.step]}`)
            }
            this.step = ''
        },

        // Sets edit mode for a specific step
        editStep(event) {
            this.editOn = true
            const target = event.target
            const stepElement = target.parentElement
            const stepNumber = stepElement.textContent.substr(0, stepElement.textContent.indexOf('.'))

            this.stepToEdit = stepNumber
            
            this.step = this.instructions[stepNumber]
        },

        // Updates the edited step
        saveEditedStep() {
            this.cookingStepsOutput = []
            this.editOn = false
            this.instructions[this.stepToEdit] = this.step

            this.appendCookingStep()
        },

        // Deletes a specific step and updates the rest of the step indexes
        deleteStep(event) {
            this.cookingStepsOutput = []
            this.stepCount--
            const target = event.target
            const stepElement = target.parentElement
            let stepNumber = stepElement.textContent.substr(0, stepElement.textContent.indexOf('.'))

            delete this.instructions[stepNumber]

            let newInstructions = {}

            for(this.step in this.instructions) {
                if(this.step > stepNumber){
                    newInstructions[this.step - 1] = this.instructions[this.step]
                    delete this.instructions[this.step]
                }

                this.instructions = {...this.instructions, ...newInstructions}
            }

            this.appendCookingStep()
        }
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

    .errorBorder{
        border: 0.2rem solid red;
    }

    .error-message{
        position: absolute; 
        bottom: -2rem;
        font-size: 1rem;
        text-transform: uppercase;
        color: red;
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
        max-height: 10rem;
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

    li{
        position: relative;
        border-bottom: 0.1rem solid #fff;
        min-height: 4rem;
        display: flex;
        align-items: center;
        font-size: 1.5rem;
        padding-right: 10rem;
        margin-bottom: 2rem;
    }

    li .fa-trash-alt{
        position: absolute;
        right: 1rem;
        color: red;
    }

    li .fa-pen{
        position: absolute;
        right: 4rem;
        color: yellow;
    }

    li i:hover{
        cursor: pointer;
    }





    /* Media queries */ 

    @media(max-width: 1100px){
        .input-container{
            width: 70vw;
        }
    }
</style>