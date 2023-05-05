import axios from 'axios';

const baseURL = "http://localhost:8080/auth/account"

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
     * Sends a POST request to register a new account.
     * @param {object} account - An object containing the information of the account to be registered.
     * @returns {Promise} A Promise object representing the result of the request.
     */

    registerAccount(account) {
        return axios.post(baseURL + '/registerAccount', account)
    },
    /**
     * Sends a POST request to log in to an account.
     * @param {object} account - An object containing the information of the account to be logged in.
     * @returns {Promise} A Promise object representing the result of the request.
     */
    loginAccount(account) {
        return axios.post(baseURL + '/loginAccount', account, this.config)
    },

    /**
     * Sends a GET request to retrieve all accounts.
     * @param {string} token - The authorization token required for the request.
     * @returns {Promise} A Promise object representing the result of the request.
     */
    getAllAccounts(token) {
        return axios.get(baseURL + '/', configToken(token));
    },
    /**
     * Sends a DELETE request to remove an account.
     * @param {string} token - The authorization token required for the request.
     * @returns {Promise} A Promise object representing the result of the request.
     */
    removeAccount(token) {
        return axios.delete(baseURL + '/remove', configToken(token));
    },
    /**
     * Sends a GET request to retrieve all profiles associated with the given token.
     * @param {string} token - The authentication token.
     * @return {Promise} A Promise object representing the response data.
     */

    getAllProfiles(token) {
        return axios.get(baseURL + '/profiles', configToken(token))
    },
    /**

     Sends a POST request to register a new profile with the given token.
     @param {object} profile - The profile data to register.
     @param {string} token - The authentication token.
     @return {Promise} A Promise object representing the response data.
     */
    registerProfile(profile, token) {
        return axios.post(baseURL + '/registerProfile', profile, configToken(token))
    },
    /**

     Sends a POST request to log in to a profile with the given token.
     @param {object} profile - The profile data to log in with.
     @param {string} token - The authentication token.
     @return {Promise} A Promise object representing the response data.
     */
    loginProfile(profile, token) {
        return axios.post(baseURL + "/profileLogin", profile, configToken(token))
    },
    /**

     Sends a POST request to delete a profile with the given token.
     @param {object} profile - The profile data to delete.
     @param {string} token - The authentication token.
     @return {Promise} A Promise object representing the response data.
     */
    deleteProfile(profile, token) {
        return axios.post(baseURL + "/deleteProfile", profile, configToken(token))
    }
};
