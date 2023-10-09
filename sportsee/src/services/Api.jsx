import axios from "axios";


/**
 * @namespace getUserId
 * @function getUserId
 * @description The function `getUserId` makes an asynchronous request to an API endpoint to retrieve user data
 * based on a given user ID. the structure is the same for all the other functions in the services file.
 * @param {String} API_URL
 * @param {Number} userId
 * @returns {Array<Object>} - an array of user data.
 */
export const getUserId = async (API_URL, userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
}
/**@memberof Api
 * @namespace getActivity
 * @function getActivity*/

export const getActivity = async (API_URL, userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}/activity`);
    return response.data;
}
/**
 * @namespace getAverage
 * @function getAverage
*/
export const getAverage = async (API_URL, userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}/average-sessions`);
    return response.data;
}
/**
 * @namespace getPerformance
 * @function getPerformance*/
export const getPerformance = async (API_URL, userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}/performance`);
    return response.data;
}
