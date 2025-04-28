import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "../api/axiosInstance";

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/user/login", {
          email: values.email,
          password: values.password,
        });

        localStorage.setItem("userToken", response.data.token);
        toast.success("Logged in successfully!");
        navigate("/");
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred. Please try again.");
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center">
      <div className="bg-white bg-opacity-30 p-6 rounded-2xl shadow-lg w-full max-w-4xl pt-10 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 order-1">
          <div className="flex justify-center mb-4">
            <img src="/assets/MediBridge_logo.png" alt="Logo" className="w-24" />
          </div>
          <h2 className="text-xl font-bold text-center mb-4">Login</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
              className="w-full p-2 border rounded-lg"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                {...formik.getFieldProps("password")}
                className="w-full p-2 border rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2"
                aria-label="Toggle Password Visibility"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </button>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              )}
            </div>
            <div className="flex justify-center">
              <motion.button
                type="submit"
                className="w-1/4 bg-[#3cbece] text-white py-2 rounded-lg hover:bg-blue-600 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </div>
          </form>

          <div className="text-center mt-4">
            <span className="text-blue-500 text-sm">
              New here?{" "}
              <Link to="/register" className="flex items-center text-blue-500 hover:text-blue-700">
                <span>Go to Registration</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M6 12h14" />
                </svg>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
