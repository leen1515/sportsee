import axios from "axios";


export const getUserId = async (API_URL, userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
}

export const getActivity = async (API_URL, userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}/activity`);
    return response.data;
}

export const getAverage = async (API_URL, userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}/average-sessions`);
    return response.data;
}

export const getPerformance = async (API_URL, userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}/performance`);
    return response.data;
}
