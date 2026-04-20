import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const API_BASE = process.env.NEXT_PUBLIC_HTTP_SERVER;

export const bookmarkMovie = async (bookmark: any) => {
    const response = await axiosWithCredentials.post(
        `${API_BASE}/api/bookmarks`,
        bookmark
    );
    return response.data;
};

export const removeBookmark = async (movieId: string) => {
    const response = await axiosWithCredentials.delete(
        `${API_BASE}/api/bookmarks/${movieId}`
    );
    return response.data;
};

export const findBookmarksByUser = async (userId: string) => {
    const response = await axiosWithCredentials.get(
        `${API_BASE}/api/bookmarks/user/${userId}`
    );
    return response.data;
};

export const isBookmarked = async (movieId: string) => {
    const response = await axiosWithCredentials.get(
        `${API_BASE}/api/bookmarks/check/${movieId}`
    );
    return response.data;
};