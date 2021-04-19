import axios from 'axios'
import jsCookie from 'js-cookie'
// We will initialize axios here

export default axios.create({
    baseURL: '/',
    headers: {'Content-Type': 'application/json', 'x-csrf-token': jsCookie.get('XSRF-TOKEN'), 'json-web-token': jsCookie.get('jwt')},
    withCredentials: true,
})