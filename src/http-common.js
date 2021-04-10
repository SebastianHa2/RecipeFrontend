import axios from 'axios'

// We will initialize axios here

export default axios.create({
    baseURL: 'https://sebastian-recipe-saver.herokuapp.com/',
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
})