<template>
    <div class="container">
        <div class="recipe" v-if="activeRecipe">
            <div class="recipe-image">
                <img :src="activeRecipe.imageUrl" alt="recipe-img">
            </div>
            <div class="recipe-description">
                <h1>{{ activeRecipe.title }}</h1>
                <h3>Approximate cooking time: {{ activeRecipe.duration }} minutes</h3>
                <p>{{ activeRecipe.instructions }}</p>
            </div>
        </div>
        <div class="recipe-options" v-if="activeRecipe && loggedInAsId.loggedInAsId === activeRecipe.cookId">
            <a class="edit" @click="$router.push(`/recipes/recipe/edit-recipe/${activeRecipe.id}`)">Edit</a>
            <a class="delete" @click="deleteRecipe(activeRecipe.id)">Delete</a>
        </div>
    </div>
</template>

<script>
import RecipeDataService from '../services/RecipeDataServices'
export default {
    props: ['loggedInAsId'],
    name: 'Recipe',
    data() {
        return {
            activeRecipe: null,
            message: ''
        }
    },
    methods: {
        getRecipe(id) {
            RecipeDataService.getOne(id).then(response => {
                this.activeRecipe = response.data
            }).catch(err => {
                console.log(err.message)
            })
        },
        deleteRecipe(id) {
            RecipeDataService.delete(id).then(() => {
                console.log('Recipe was successfully deleted!')
            }).catch(err => {
                console.log(err.message)
            })
        }
    },

    mounted() {
        this.getRecipe(this.$route.params.id)
    }
}
</script>

<style scoped>
p{
    color: #fff;
}
    .container{
        width: 100%;
        min-height: 85vh;
        margin-top: 6rem;
    }

    .recipe{
        width: 100%;
        height: auto;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5rem;
    }

    .recipe-image {
        width: 35rem;
        height: 30rem;
        margin-right: 10rem;
        border-radius: 0.3rem;
    }

    .recipe-image img{
        width: 100%;
        height: 100%;
        border-radius: 0.3rem;
    }

    .recipe-description{
        width: 70%;
        height: 100%;
        color: #fff;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .recipe-description h1{
        margin-bottom: 1rem;
        font-size: 4rem;
    }

    .recipe-description h3{
        font-size: 2.2rem;
        margin-bottom: 1rem;
    }

    .recipe-description p {
        font-size: 1.8rem;
    }

    .recipe-options{
        height: 11rem;
        margin-top: 2rem;
        padding-bottom: 7rem;
        display: flex;
        justify-content: center;
    }

    .recipe-options a{
        margin: 0 5rem;
        padding: 0.5rem 3rem;
        font-size: 1.7rem;
        text-transform: uppercase;
        background-color: rgba(253, 244, 152, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.2rem;
        border-radius: 0.4rem;
    }

    .recipe-options .delete{
        color: #c70000;
    }

    .recipe-options .edit{
        color: #000;
    }

    .recipe-options a:hover{
        background-color: rgba(253, 244, 152, 1);
        cursor: pointer;
    }

    /* Media queries */ 
    @media(max-width: 1150px){
        .recipe{
            flex-direction: column;
        }

        .recipe-image{
            margin-right: 0;
            margin-bottom: 3rem;
        }
    }
</style>