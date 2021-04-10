<template>
    <div class="container">
        <div class="recipes">
            <div class="recipe" v-for="(recipe, index) in recipes" :key="index">
                <h1>{{ recipe.title }}</h1>
                <h3>Approximate cooking time: <br> {{ recipe.duration }} minutes</h3>
                <a @click="$router.push(`/recipes/recipe/${recipe.id}`)">See the recipe</a>
            </div>
        </div>
    </div>
</template>

<script>
import RecipeDataService from '../services/RecipeDataServices'
export default {
    name: 'My Recipes',
    data() {
        return {
            recipes: [],
            activeRecipe: null,
            activeIndex: -1,
            title: ''
        }
    },
    methods: {
        // Fetch all the recipes
        fetchAll() {
            RecipeDataService.getAll().then(response => {
                response.data.forEach(recipe => {
                    if(recipe.cookId == this.loggedInAsId.loggedInAsId){
                        this.recipes.push(recipe)
                    }
                })
            }).catch(err => {
                console.log(err.message)
            })
        }
    },
    mounted() {
        this.fetchAll()
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
        min-height: 90vh;
        padding-top: 3rem;
    }

    .recipes{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 1rem;
        flex-wrap: wrap;
    }

    .recipe{
        width: 25rem;
        height: 25rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(253, 244, 152, 0.8);
        border-radius: 0.5rem;
        margin: 3rem 3rem;
    }

    .recipe h1{
        margin-bottom: 1rem;
        font-weight: 200;
        font-size: 3rem;
    }

    .recipe h3{
        margin-bottom: 1rem;
        text-align: center;
        font-size: 1.8rem;
    }

    .recipe a{
        color:  #0057e7;
        font-size: 1.3rem;
        text-transform: uppercase;
        transition: 0.4s;
    }

    .recipe a:hover{
        color: #0035d6;
        cursor: pointer;
    }
</style>