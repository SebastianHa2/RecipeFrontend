import http from '../http-common'

// Here we will create a class which will hold functions used for sending our http requests
// So we can then export the class and use it in our components

class RecipeDataService {
    getAll(page, size) {
        return http.get(`/recipes?page=${page}&size=${size}`)
    }

    getOne(id) {
        return http.get(`/recipes/recipe/${id}`)
    }

    create(data) {
        return http.post('/recipes/add-recipe', data)
    }

    delete(id) {
        return http.delete(`/recipes/recipe/${id}`)
    }

    update(id, data) {
        return http.put(`/recipes/recipe/edit-recipe/${id}`, data)
    }

    findByTitle(title) {
        return http.get(`/recipes/recipe?title=${title}`)
    }
}

export default new RecipeDataService()