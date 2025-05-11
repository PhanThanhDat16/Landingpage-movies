import { axiosConfig } from "./axiosConfig";

export const movieTotalAPI = async (
  type_list = "phim-bo",
  page = 1,
  sort_lang = "vietsub",
  category = null,
  country = null,
  year = null,
  limit = 20
) =>
  await axiosConfig.get(
    `/v1/api/danh-sach/${type_list}?page=${page}&sort_type=asc&sort_lang=${sort_lang}${
      category ? `&category=${category}` : ""
    }${country ? `&country=${country}` : ""}${
      year ? `&year=${year}` : ""
    }&limit=${limit}`
  );

export const movieSearchAPI = async (
  keyword,
  page = 1,
  sort_lang = "vietsub",
  category = null,
  country = null,
  year = null,
  limit = 20
) =>
  await axiosConfig.get(
    `/v1/api/tim-kiem/?keyword=${keyword}&page=${page}&sort_type=asc&sort_lang=${sort_lang}${
      category ? `&category=${category}` : ""
    }${country ? `&country=${country}` : ""}${
      year ? `&year=${year}` : ""
    }&limit=${limit}`
  );

export const movieCategoryAPI = async (
  type_list,
  page = 1,
  sort_lang = "vietsub",
  country = null,
  year = null,
  limit = 20
) =>
  await axiosConfig.get(
    `/v1/api/the-loai/${type_list}?page=${page}&sort_type=asc&sort_lang=${sort_lang}${
      country ? `&country=${country}` : ""
    }${year ? `&year=${year}` : ""}&limit=${limit}`
  );

export const movieCountryAPI = async (
  type_list,
  page = 1,
  sort_lang = "vietsub",
  category = null,
  country = null,
  year = null,
  limit = 20
) =>
  await axiosConfig.get(
    `/v1/api/quoc-gia/${type_list}?page=${page}&sort_type=asc&sort_lang=${sort_lang}${
      category ? `&category=${category}` : ""
    }${country ? `&country=${country}` : ""}${
      year ? `&year=${year}` : ""
    }&limit=${limit}`
  );

export const movieYearAPI = async (
  type_list,
  page = 1,
  sort_lang = "vietsub",
  category = null,
  country = null,
  year = null,
  limit = 20
) =>
  await axiosConfig.get(
    `/v1/api/nam/${type_list}?page=${page}&sort_type=asc&sort_lang=${sort_lang}${
      category ? `&category=${category}` : ""
    }${country ? `&country=${country}` : ""}${
      year ? `&year=${year}` : ""
    }&limit=${limit}`
  );

export const countryAPI = async () => await axiosConfig.get("/quoc-gia");

export const categoryAPI = async () => await axiosConfig.get("/the-loai");
