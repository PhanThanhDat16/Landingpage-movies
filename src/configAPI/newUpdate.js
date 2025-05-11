import { axiosConfig } from "./axiosConfig";

export const newUpdatev1API = async (page = 1) =>
  await axiosConfig.get(`/danh-sach/phim-moi-cap-nhat?page=${page}`);

export const newUpdatev2API = async (page = 1) =>
  await axiosConfig.get(`/danh-sach/phim-moi-cap-nhat-v2?page=${page}`);

export const newUpdatev3API = async (page = 1) =>
  await axiosConfig.get(`/danh-sach/phim-moi-cap-nhat-v3?page=${page}`);
