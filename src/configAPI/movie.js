import { axiosConfig } from "./axiosConfig";

export const movieAPI = async (slug) => await axiosConfig.get(`/phim/${slug}`);
