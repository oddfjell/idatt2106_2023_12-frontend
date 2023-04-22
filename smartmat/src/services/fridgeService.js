import axios from 'axios';
const baseURL = "http://localhost:8080/fridge"
function configToken (token) {
    return {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token

        },
        withCredentials: true
    }
}
export default {
    //should get account from Token
    getGroceries( token) {
        return axios.get(baseURL + '/groceries', configToken(token))
    },
    addGrocery(account, token){
        return axios.post(baseURL + '/add', configToken(token))
    }
}