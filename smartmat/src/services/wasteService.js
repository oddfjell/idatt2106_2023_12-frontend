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
    /**
     * @function getMoneyLost fetches total money lost
     * @param {string} token
     * @param {number}month
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getMoneyLost(token, month) {
        return axios.get(baseURL + '/month/'+month, config(token))
    },

    /**
     * @function getMoneyLostPerCategory fetches money lost per category
     * @param token
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getMoneyLostPerCategory(token){
        return axios.get(baseURL + '/category', config(token))
    }
}