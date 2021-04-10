import axios from 'axios'

// We will initialize axios here

export default axios.create({
    baseURL: 'http://localhost:8080',
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
})