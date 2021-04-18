<template>
    <div class="container">
        <div class="message-container" v-if="message !== ''">
            <div class="message" v-if="message !== ''">
                <p>{{ message }}</p>
            </div>
        </div>
        <div class="recipes">
            <div class="recipe" v-for="(recipe, index) in recipes" :key="index">
                <h1>{{ recipe.title }}</h1>
                <h3>Approximate cooking time: <br> {{ recipe.duration }} minutes</h3>
                <a @click="$router.push(`/recipes/recipe/${recipe.id}`)">See the recipe</a>
            </div>
        </div>
        <div class="pagination">
            <ul class="pagination-list">
                <li class="pagination-list-item pagination-item">
                    <a v-if="hasPreviousPage" @click="changePage(previousPage)">Previous Page</a>
                </li>
                <li class="pagination-list-item" v-if="hasPreviousPage" @click="changePage(previousPage)">
                    {{previousPage}}
                </li>
                <li class="pagination-list-item active">
                    <a>{{activePage}}</a>
                </li>
                <li class="pagination-list-item" v-if="hasNextPage" @click="changePage(nextPage)">
                    {{nextPage}}
                </li>
                <li class="pagination-list-item pagination-item">
                    <a v-if="hasNextPage" @click="changePage(nextPage)">Next Page</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import RecipeDataService from '../services/RecipeDataServices'
import gsap from '../../node_modules/gsap'
export default {
    name: 'All Recipes',
    data() {
        return {
            recipes: [],
            activeRecipe: null,
            activeIndex: -1,
            title: '',
            message: '',
            numberOfPages: null,
            activePage: 1,
            hasNextPage: true,
            hasPreviousPage: false,
            lastPage: null
        }
    },
    computed: {
        previousPage: function(){
            return this.activePage - 1
        },
        nextPage: function(){
            return this.activePage + 1
        }
    },
    methods: {
        // Fetch all the recipes
        fetchAll(page, size) {
            RecipeDataService.getAll(page, size).then(response => {
                this.recipes = response.data.recipes.rows
                this.numberOfPages = response.data.numberOfPages
                if(this.activePage*size >= response.data.numberOfAllRecipes){
                    this.hasNextPage = false
                }else{
                    this.hasNextPage = true
                }
                if(this.activePage > 1){
                    this.hasPreviousPage = true
                }else{
                    this.hasPreviousPage = false
                }

                this.lastPage = Math.ceil(response.data.numberOfAllRecipes / size)

            }).catch(err => {
                console.log(err.message)
            })
        },

        fadeMessage() {
            setTimeout(() => {
                gsap.to('.message', {duration: 0.5, opacity: '0'})
                gsap.to('.message-container', {duration: 0.5, opacity: 0})
            }, 2000)

            setTimeout(() => {
                this.message = ''
            }, 2500)
        },

        changePage(number) {
            this.fetchAll(number - 1, 1)
            this.activePage = number
        }
    },
    mounted() {
        this.fetchAll(0, 1)

        if(this.$route.query.msg === 'edited'){
            this.message = 'Recipe was edited successfully!'
            this.fadeMessage()
        }

        if(this.$route.query.msg === 'added'){
            this.message = 'Recipe was added successfully!'
            this.fadeMessage()
        }

        if(this.$route.query.msg === 'deleted'){
            this.message = 'Recipe was deleted successfully!'
            this.fadeMessage()
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

    .message-container{
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw; 
        background-color: rgba(0, 0, 0, 0.7)
    }

    .message{
        color: #000;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.5rem;
        text-transform: uppercase;
        background-color: rgba(253, 244, 152);
        padding: 2rem 5rem;
        border-radius: 0.3rem;
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

    .pagination-list{
        display: flex;
        justify-content: center;
    }

    .pagination-list-item{
        color: #fff;
        font-size: 2rem;
        margin: 0 2rem;
        transition: all 0.3s;
        height: 4rem;
        width: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }


    .pagination-list-item:hover{
        cursor: pointer;
        color: rgba(253, 244, 152)
    }

    .active{
        color: rgba(253, 244, 152);
    }

    .active a{
        color: #000;
    }

    .pagination-item{
        font-size: 1.5rem;
        width: 10rem;
    }
</style>