import axios from 'axios';
const baseURL = 'http://localhost:8080/waste';

function config (token) {
    return {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token

        },
        withCredentials: true
    }
}

export default {
    getMoneyLost(token, month) {
        return axios.get(baseURL + '/month/'+month, config(token))
    },
    getMoneyLostPerCategory(token){
        return axios.get(baseURL + '/category', config(token))
    }
}