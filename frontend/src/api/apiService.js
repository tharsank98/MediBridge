import API from "./axiosInstance";

// 1. Get doctor lists
export const getDoctors = async () => {
  try {
    const response = await API.get("/api/doctor/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};

// 2. Add doctor (Admin Only)
export const addDoctor = async (doctorData) => {
  try {
    const response = await API.post("/api/admin/add-doctor", doctorData);
    return response.data;
  } catch (error) {
    console.error("Error adding doctor:", error);
    throw error;
  }
};

// 3. Admin login
export const adminLogin = async (credentials) => {
  try {
    const response = await API.post("/api/admin/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in admin:", error);
    throw error;
  }
};

// 4. User registration
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/api/user/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// 5. User login
export const userLogin = async (credentials) => {
  try {
    const response = await API.post("/api/user/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// 6. Get user details
export const getUserDetails = async (userId) => {
  try {
    const response = await API.get(`/api/user/get-profile?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

// 7. Edit user profile
export const updateUserProfile = async (userId, updatedData) => {
  try {
    const response = await API.put(`/api/user/update-profile?userId=${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
