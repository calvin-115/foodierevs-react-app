import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const API_BASE = process.env.NEXT_PUBLIC_HTTP_SERVER;

export const searchMovies = async (query: string, page: number = 1) => {
    const response = await axiosWithCredentials.get(
        `${API_BASE}/api/tmdb/search?query=${encodeURIComponent(query)}&page=${page}`
    );
    return response.data;
};

export const getMovieDetails = async (movieId: string) => {
    const response = await axiosWithCredentials.get(
        `${API_BASE}/api/tmdb/${movieId}`
    );
    return response.data;
};

export const getTrending = async () => {
    const response = await axiosWithCredentials.get(
        `${API_BASE}/api/tmdb/trending`
    );
    return response.data;
};

export const getPopular = async () => {
    const response = await axiosWithCredentials.get(
        `${API_BASE}/api/tmdb/popular`
    );
    return response.data;
};

export const getFoodMovies = async () => {
    const response = await axiosWithCredentials.get(
        `${API_BASE}/api/tmdb/food`
    );
    return response.data;
};