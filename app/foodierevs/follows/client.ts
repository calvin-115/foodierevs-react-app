import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const API_BASE = process.env.NEXT_PUBLIC_HTTP_SERVER;

export const followUser = async (userId: string) => {
    const response = await axiosWithCredentials.post(
        `${API_BASE}/api/follows/${userId}`
    );
    return response.data;
};

export const unfollowUser = async (userId: string) => {
    const response = await axiosWithCredentials.delete(
        `${API_BASE}/api/follows/${userId}`
    );
    return response.data;
};

export const findFollowers = async (userId: string) => {
    const response = await axiosWithCredentials.get(
        `${API_BASE}/api/follows/${userId}/followers`
    );
    return response.data;
};

export const findFollowing = async (userId: string) => {
    const response = await axiosWithCredentials.get(
        `${API_BASE}/api/follows/${userId}/following`
    );
    return response.data;
};