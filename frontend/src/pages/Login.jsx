import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Visibility, VisibilityOff, CloudUpload } from "@mui/icons-material";
import { motion } from "framer-motion";
import * as yup from "yup";
import { useFormik } from "formik";
import countryData from "dialcode-and-country-data/data/Country_Data.json";
import countryDialCodes from "dialcode-and-country-data/data/Country_Dialcode.json";

export function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [countries] = useState(Object.keys(countryData));
  const [cities, setCities] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [existingUsernames, setExistingUsernames] = useState(["existingUser1", "existingUser2"]); // Example existing usernames

  const validationSchema = yup.object({
    name: yup.string().when("isLogin", {
      is: false,
      then: yup.string().required("Full Name is required"),
    }),
    username: yup.string().when("isLogin", {
      is: false,
      then: yup.string()
        .required("Username is required")
        .notOneOf(existingUsernames, "Username is already taken"),
    }),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: yup.string().when("isLogin", {
      is: false,
      then: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
    }),
    country: yup.string().when("isLogin", {
      is: false,
      then: yup.string().required("Country is required"),
    }),
    city: yup.string().when("isLogin", {
      is: false,
      then: yup.string().required("City is required"),
    }),
    phone: yup.string().when("isLogin", {
      is: false,
      then: yup.string().required("Phone number is required"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "demo@gmail.com",
      password: "123456789SK",
      confirmPassword: "",
      country: "",
      city: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      toast.success(isLogin ? "Logged in successfully!" : "Signed up successfully!");
      if (isLogin) {
        navigate("/dashboard");
      }
    },
  });

  useEffect(() => {
    if (formik.values.country) {
      setCities(countryData[formik.values.country] || []);
      setCountryCode(countryDialCodes[formik.values.country] || "");
      formik.setFieldValue("phone", countryDialCodes[formik.values.country] || "");
    }
  }, [formik.values.country]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('/assets/medical_bg.jpg')]">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 pt-10">
        <div className="flex justify-center mb-4">
          <img src="/assets/MediBridge_logo.png" alt="Logo" className="w-24" />
        </div>
        <h2 className="text-xl font-bold text-center mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input type="text" name="name" placeholder="Full Name" {...formik.getFieldProps("name")} className="w-full p-2 border rounded-lg" />
              {formik.touched.name && formik.errors.name ? <div className="text-red-500 text-sm">{formik.errors.name}</div> : null}
              <input type="text" name="username" placeholder="Username" {...formik.getFieldProps("username")} className="w-full p-2 border rounded-lg" />
              {formik.touched.username && formik.errors.username ? <div className="text-red-500 text-sm">{formik.errors.username}</div> : null}
              <select name="country" {...formik.getFieldProps("country")} className="w-full p-2 border rounded-lg">
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {formik.touched.country && formik.errors.country ? <div className="text-red-500 text-sm">{formik.errors.country}</div> : null}
              <select name="city" {...formik.getFieldProps("city")} className="w-full p-2 border rounded-lg">
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {formik.touched.city && formik.errors.city ? <div className="text-red-500 text-sm">{formik.errors.city}</div> : null}
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                {...formik.getFieldProps("phone")}
                className="w-full p-2 border rounded-lg"
                value={`${countryCode} ${formik.values.phone.replace(countryCode, "").trim()}`}
                onChange={(e) => formik.setFieldValue("phone", `${countryCode}${e.target.value.replace(countryCode, "").trim()}`)}
              />
              {formik.touched.phone && formik.errors.phone ? <div className="text-red-500 text-sm">{formik.errors.phone}</div> : null}
              <div className="flex flex-col items-center">
                {profileImage && <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full mb-2" />}
                <label htmlFor="upload-photo" className="cursor-pointer">
                  <CloudUpload fontSize="large" />
                </label>
                <input type="file" id="upload-photo" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>
            </>
          )}
          <input type="email" name="email" placeholder="Email" {...formik.getFieldProps("email")} className="w-full p-2 border rounded-lg" />
          {formik.touched.email && formik.errors.email ? <div className="text-red-500 text-sm">{formik.errors.email}</div> : null}
          <div className="relative">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" {...formik.getFieldProps("password")} className="w-full p-2 border rounded-lg" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
            {formik.touched.password && formik.errors.password ? <div className="text-red-500 text-sm">{formik.errors.password}</div> : null}
          </div>
          {!isLogin && (
            <div className="relative">
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" {...formik.getFieldProps("confirmPassword")} className="w-full p-2 border rounded-lg" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-2 top-2">
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </button>
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div> : null}
            </div>
          )}
          <motion.button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {isLogin ? "Login" : "Sign Up"}
          </motion.button>
        </form>
        <p className="text-center text-sm mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"} <span className="text-blue-500 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Sign up" : "Login"}</span>
        </p>
      </div>
    </div>
  );
}