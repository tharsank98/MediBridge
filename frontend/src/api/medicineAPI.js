import API from "./axiosInstance";

export const getAllDoctors = async () => {
  try {
    const response = await API.get("/doctor/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching doctors:", error.response || error.message);
    throw new Error("Failed to fetch the Medicines");
  }
};
