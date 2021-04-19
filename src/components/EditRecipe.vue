<template>
    <div class="container" v-if="activeRecipe">
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
                <label v-if="editOn === false" for="instructions">Step {{stepCount}}:</label>
                <label v-if="editOn === true" for="instructions">Editing Step {{stepToEdit}}:</label>
                <textarea name="instruction" id="instruction" v-model="step" cols="10" rows="10"></textarea>
                <button v-if="editOn === true" @click="saveEditedStep">Edit step</button>
                <button v-if="editOn === false" @click="addStep">Add step</button>
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
                <input type="text" id="imageUrl" v-model="activeRecipe.imageUrl" name ="imageUrl">
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
            instructions: {},

            message: '',

            editOn: false,
            stepToEdit: null,

            stepCount: 1,
            step: '',
            cookingStepsOutput: [],
        }
    },
    methods: {
        getRecipe(id) {
            RecipeDataService.getOne(id).then(response => {
                this.activeRecipe = response.data.recipe
                this.instructions = {...JSON.parse(this.activeRecipe.instructions)}

                this.stepCount = Object.keys(this.instructions).length + 1

                this.appendCookingStep()
            }).catch(err => {
                console.log(err.message)
            })
        },
        editRecipe() {
            this.activeRecipe.instructions = JSON.stringify(this.instructions)
            RecipeDataService.update(this.activeRecipe.id, this.activeRecipe).then(() => {
                this.$router.push({path: '/', query:{msg: 'edited'}})
            }).catch(err => {
                console.log(err)
            })
        },

        addStep() {
            this.cookingStepsOutput = []
            this.instructions[this.stepCount] = this.step
            this.stepCount++
            this.appendCookingStep()
        },

        appendCookingStep() {
            for(this.step in this.instructions){
                this.cookingStepsOutput.push(`${this.step}. ${this.instructions[this.step]}`)
            }
            this.step = ''
        },

        editStep(event) {
            this.editOn = true
            const target = event.target
            const stepElement = target.parentElement
            const stepNumber = stepElement.textContent.substr(0, stepElement.textContent.indexOf('.'))

            this.stepToEdit = stepNumber
            
            this.step = this.instructions[stepNumber]
        },

        saveEditedStep() {
            this.cookingStepsOutput = []
            this.editOn = false
            this.instructions[this.stepToEdit] = this.step

            this.appendCookingStep()
        },

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

    @media(max-width: 1100px){
        .input-container{
            width: 70vw;
        }
    }
</style>