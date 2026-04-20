import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const API_BASE = process.env.NEXT_PUBLIC_HTTP_SERVER;

export const createReview = async (review: any) => {
    const response = await axiosWithCredentials.post(
        `${API_BASE}/api/reviews`,
        review
    );
    return response.data;
};

export const findReviewsByMovie = async (movieId: string) => {
    const response = await axiosWithCredentials.get(
        `${API_BASE}/api/reviews/movie/${movieId}`
    );
    return response.data;
};

export const findReviewsByUser = async (userId: string) => {
    const response = await axiosWithCredentials.get(
        `${API_BASE}/api/reviews/user/${userId}`
    );
    return response.data;
};

export const deleteReview = async (reviewId: string) => {
    const response = await axiosWithCredentials.delete(
        `${API_BASE}/api/reviews/${reviewId}`
    );
    return response.data;
};

export const findAllReviews = async () => {
    const response = await axiosWithCredentials.get(`${API_BASE}/api/reviews`);
    return response.data;
};