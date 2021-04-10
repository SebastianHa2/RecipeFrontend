import http from '../http-common'

class CookDataService {
    registerCook(data) {
        return http.post('/cooks/register', data)
    }

    logInCook(data) {
        return http.post('/cooks/log-in', data)
    }

    logOutCook() {
        return http.post('/cooks/log-out')
    }

    getAll() {
        return http.get('/cooks')
    }

    isLoggedIn() {
        return http.get('/cooks/is-logged-in')
    }
}

export default new CookDataService()