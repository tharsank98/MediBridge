import API from "./axiosInstance";

// 1. Get doctor lists
export const getDoctors = async () => {
  try {
    const response = await API.get("/doctor/list"); // ✅ Fixed extra `/api`
    return response.data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};

// 2. Add doctor (Admin Only)
export const addDoctor = async (doctorData) => {
  try {
    const response = await API.post("/admin/add-doctor", doctorData);
    return response.data;
  } catch (error) {
    console.error("Error adding doctor:", error);
    throw error;
  }
};

// 3. Admin login
export const adminLogin = async (credentials) => {
  try {
    const response = await API.post("/admin/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in admin:", error);
    throw error;
  }
};

// 4. User registration
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/user/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// 5. User login (Fixed to store token)
export const userLogin = async (credentials) => {
  try {
    const response = await API.post("/user/login", credentials);

    // ✅ Store token in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// 6. Get user details (Fixed RESTful API path)
export const getUserDetails = async (userId) => {
  try {
    const response = await API.get(`/user/get-profile/${userId}`); // ✅ Fixed to use path parameter
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

// 7. Edit user profile (Fixed RESTful API path)
export const updateUserProfile = async (userId, updatedData) => {
  try {
    const response = await API.put(
      `/user/update-profile/${userId}`,
      updatedData
    ); // ✅ Fixed to use path parameter
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
