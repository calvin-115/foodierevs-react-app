import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const API_BASE = process.env.NEXT_PUBLIC_HTTP_SERVER;

export const register = async (user: any) => {
    const response = await axiosWithCredentials.post(
        `${API_BASE}/api/users/register`,
        user
    );
    return response.data;
};

export const login = async (credentials: any) => {
    const response = await axiosWithCredentials.post(
        `${API_BASE}/api/users/login`,
        credentials
    );
    return response.data;
};

export const logout = async () => {
    const response = await axiosWithCredentials.post(
        `${API_BASE}/api/users/logout`
    );
    return response.data;
};

export const profile = async () => {
    const response = await axiosWithCredentials.get(
        `${API_BASE}/api/users/profile`
    );
    return response.data;
};

export const updateProfile = async (user: any) => {
    const response = await axiosWithCredentials.put(
        `${API_BASE}/api/users/profile`,
        user
    );
    return response.data;
};

export const findUserById = async (userId: string) => {
    const response = await axiosWithCredentials.get(
        `${API_BASE}/api/users/${userId}`
    );
    return response.data;
};

export const findAllUsers = async (role?: string) => {
    const params = role ? `?role=${role}` : "";
    const response = await axiosWithCredentials.get(
        `${API_BASE}/api/users${params}`
    );
    return response.data;
};