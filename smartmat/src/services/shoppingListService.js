import axios from 'axios';
const baseURL = 'http://localhost:8080/shoppingList';

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
     * @function getProducts get all products
     * @param token
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getProducts(token){
        return axios.get(baseURL+'/', config(token))//Var add header
    },

    /**
     * @function saveChanges saves changes made to the shoppingList by a put request
     * @param shoppingList
     * @param token
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    saveChanges(shoppingList, token){
        return axios.put(baseURL+'/save', shoppingList, config(token))
    },

    /**
     * @function buyChecked checks the item as bought by a post request
     * @param token
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    buyChecked(token){
        return axios.post(baseURL+'/buy',null,  config(token))
    },

    /**
     * @function acceptRequest accepts a sugguested grocery by a put request
     * @param product
     * @param token
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    acceptRequest(product, token){
        return axios.put(baseURL+'/accept', product, config(token))
    },
    /**
     * @function getSuggestions fetch suggested groceries with get request
     * @param token
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getSuggestions(token){
        return axios.get(baseURL + "/getSuggestions", config(token))
    },
    /**
     * @function suggestGrocery suggests a new grocery
     * @param product
     * @param token
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    suggestGrocery(product, token){
        return axios.post(baseURL + "/suggest", product, config(token))
    },
    /**
     * @function delete  deletes a sugguested grocery
     * @param product
     * @param token
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    deleteSuggestion(product, token){
        return axios.post(baseURL + "/delete", product, config(token))
    }


}

