import axios from 'axios';

const baseURL = "http://localhost:8080/fridge"

function configToken(token) {
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
     * Retrieves all groceries from the server for the authenticated user.
     * @param {string} token - The user token.
     * @returns {Promise} A promise that resolves with the grocery list or rejects with an error.
     */
    getGroceries(token) {
        return axios.get(baseURL + '/groceries', configToken(token))
    },
    /**
     * Adds a new grocery to the server for the authenticated user.
     * @param {Object} grocery - The grocery object to add.
     * @param {string} token - The user token.
     * @returns {Promise} A promise that resolves with a success message or rejects with an error.
     */
    addGrocery(grocery, token) { //TODO account or just token??
        return axios.post(baseURL + '/add', grocery, configToken(token))
    },
    /**
     * Removes an existing grocery from the server for the authenticated user.
     * @param {Object} grocery - The grocery object to remove.
     * @param {string} token - The user token.
     * @returns {Promise} A promise that resolves with a success message or rejects with an error.
     */

    removeGrocery(grocery, token) {
        console.log(grocery)
        return axios.post(baseURL + '/remove', grocery, configToken(token))
    },
    /**
     * Throws away an existing grocery for the authenticated user and registers it as food waste.
     * @param {Object} waste - The waste object to register.
     * @param {string} token - The user token.
     * @returns {Promise} A promise that resolves with a success message or rejects with an error.
     */
    throwGrocery(waste, token) {
        console.log(waste)
        return axios.post(baseURL + '/throw', waste, configToken(token))
    }
}
