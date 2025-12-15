import axiosInstance from "../utils/axiosInstance"

export const getAllUserUrls = async () => {
  // Changed from POST to GET for RESTful API
  const {data} = await axiosInstance.get("/api/user/urls")
  return data
}

export const createShortUrl = async (url, customSlug = null) => {
  try {
    const payload = customSlug ? { url, slug: customSlug } : { url };
    const { data } = await axiosInstance.post("/api/create", payload);
    return data;
  } catch (error) {
    console.error("Error creating short URL:", error);
    throw error;
  }
}
