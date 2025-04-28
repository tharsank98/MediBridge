import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PersonIcon from "@mui/icons-material/Person";
import { motion } from "framer-motion";
import * as yup from "yup";
import { useFormik } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import countryData from "dialcode-and-country-data/data/Country_Data.json";
import { registerUser } from "../api/axiosInstance";
import { TextField } from "@mui/material";

export function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [cities, setCities] = useState([]);
  const country = "Sri Lanka";
  const countryCode = "+94";

  useEffect(() => {
    setCities(countryData[country] || []);
  }, []);

  const validationSchema = yup.object({
    name: yup.string().required("Full Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Confirm Password is required"),
    gender: yup.string().required("Gender is required"),
    dob: yup.date().required("Date of Birth is required"),
    city: yup.string().required("City is required"),
    address: yup.string().required("Address is required"),
    phone: yup.string().matches(/^\d+$/, "Phone number must be numeric").required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      dob: null,
      city: "",
      address: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await registerUser(values);
        toast.success("Signed up successfully!");
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred. Please try again.");
      }
    },
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.size < 2 * 1024 * 1024 && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Invalid file. Please upload an image less than 2MB.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center">
      <div className="bg-white bg-opacity-30 p-6 rounded-2xl shadow-lg w-full max-w-4xl pt-10 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 order-1">
          <div className="flex justify-center mb-4">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full mb-2" />
            ) : (
              <PersonIcon fontSize="large" className="mb-2" />
            )}
            <label htmlFor="upload-photo" className="cursor-pointer">
              <AddAPhotoIcon fontSize="large" />
            </label>
            <input
              type="file"
              id="upload-photo"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          <h2 className="text-xl font-bold text-center mb-4">Sign Up</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              {...formik.getFieldProps("name")}
              className="w-full p-2 border rounded-lg"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
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
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                {...formik.getFieldProps("confirmPassword")}
                className="w-full p-2 border rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-2"
                aria-label="Toggle Confirm Password Visibility"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </button>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
              )}
            </div>
            <select
              name="gender"
              {...formik.getFieldProps("gender")}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <div className="text-red-500 text-sm">{formik.errors.gender}</div>
            )}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Birth"
                value={formik.values.dob}
                onChange={(value) => formik.setFieldValue("dob", value)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            {formik.touched.dob && formik.errors.dob && (
              <div className="text-red-500 text-sm">{formik.errors.dob}</div>
            )}
            <select
              name="city"
              {...formik.getFieldProps("city")}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {formik.touched.city && formik.errors.city && (
              <div className="text-red-500 text-sm">{formik.errors.city}</div>
            )}
            <input
              type="text"
              name="address"
              placeholder="Address"
              {...formik.getFieldProps("address")}
              className="w-full p-2 border rounded-lg"
            />
            {formik.touched.address && formik.errors.address && (
              <div className="text-red-500 text-sm">{formik.errors.address}</div>
            )}
            <div className="relative">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                {...formik.getFieldProps("phone")}
                className="w-full p-2 border rounded-lg"
                pattern="[0-9]*" // Restrict input to numbers
                value={`${countryCode}${formik.values.phone.replace(countryCode, "")}`} // Always prepend the country code
                onChange={(e) =>
                  formik.setFieldValue(
                    "phone",
                    `${countryCode}${e.target.value.replace(countryCode, "").replace(/\D/g, "")}` // Remove non-numeric characters
                  )
                }
              />
            </div>
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500 text-sm">{formik.errors.phone}</div>
            )}
            <div className="flex justify-center">
              <motion.button
                type="submit"
                className="w-1/4 bg-[#3cbece] text-white py-2 rounded-lg hover:bg-blue-600 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
