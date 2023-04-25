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
    getGroceries(token) {
        return axios.get(baseURL + '/groceries', configToken(token))
    },
    addGrocery(grocery, token){ //TODO account or just token??
        return axios.post(baseURL + '/add', grocery, configToken(token))
    },
    removeGrocery(grocery, token){
        return axios.post(baseURL + '/remove', grocery, configToken(token))
    },
    throwGrocery(grocery, token){
        return axios.post(baseURL + '/throw', grocery, configToken(token))
    }
}

/*
alle
add
remove
throw
 */