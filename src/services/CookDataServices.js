import http from '../http-common'

class CookDataService {
    registerCook(data) {
        return http.post('/cooks/register', data)
    }

    logInCook(data) {
        return http.post('/cooks/log-in', data)
    }

    getAll() {
        return http.get('/cooks')
    }
}

export default new CookDataService()