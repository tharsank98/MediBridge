import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PersonIcon from "@mui/icons-material/Person";
import { motion } from "framer-motion";
import * as yup from "yup";
import { useFormik } from "formik";
import countryData from "dialcode-and-country-data/data/Country_Data.json";
import countryDialCodes from "dialcode-and-country-data/data/Country_Dialcode.json";
import { userLogin, registerUser } from "../api/axiosInstance";

export function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [countries] = useState(Object.keys(countryData));
  const [cities, setCities] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const validationSchema = yup.object({
    name: yup.string().test({
      name: "required-if-signup",
      test: function (value) {
        return isLogin || !!value || this.createError({ message: "Full Name is required" });
      },
    }),
    username: yup.string().test({
      name: "required-if-signup",
      test: function (value) {
        return isLogin || !!value || this.createError({ message: "Username is required" });
      },
    }),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: yup.string().test({
      name: "password-match",
      test: function (value) {
        return isLogin || (value === this.parent.password) || this.createError({ message: "Passwords must match" });
      },
    }),
    country: yup.string().test({
      name: "required-if-signup",
      test: function (value) {
        return isLogin || !!value || this.createError({ message: "Country is required" });
      },
    }),
    city: yup.string().test({
      name: "required-if-signup",
      test: function (value) {
        return isLogin || !!value || this.createError({ message: "City is required" });
      },
    }),
    phone: yup.string().test({
      name: "required-if-signup",
      test: function (value) {
        return isLogin || !!value || this.createError({ message: "Phone number is required" });
      },
    }),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
      city: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isForgotPassword) {
          if (otpSent) {
            if (otp === "123456") {
              toast.success("OTP verified successfully!");
              setIsForgotPassword(false);
              setOtpSent(false);
              setOtp("");
            } else {
              toast.error("Invalid OTP. Please try again.");
            }
          } else {
            toast.success("OTP sent to your email!");
            setOtpSent(true);
          }
        } else {
          if (isLogin) {
            // Call login API
            const response = await userLogin({
              email: values.email,
              password: values.password,
            });
            toast.success("Logged in successfully!");
            navigate("/"); // Redirect to home page
          } else {
            // Call signup API
            const response = await registerUser(values);
            toast.success("Signed up successfully!");
            setIsLogin(true); // Switch to login mode after signup
          }
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred. Please try again.");
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
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center">
      <div className="bg-white bg-opacity-30 p-6 rounded-2xl shadow-lg w-full max-w-4xl pt-10 flex flex-col md:flex-row">
        <div className={`w-full md:w-1/2 ${isLogin ? "order-2" : "order-1"}`}>
          <div className="flex justify-center mb-4">
            {isLogin ? (
              <img src="/assets/MediBridge_logo.png" alt="Logo" className="w-24" />
            ) : (
              <div className="flex flex-col items-center">
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
            )}
          </div>
          <h2 className="text-xl font-bold text-center mb-4">
            {isForgotPassword ? "Forgot Password" : isLogin ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {isForgotPassword ? (
              <>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  {...formik.getFieldProps("email")}
                  className="w-full p-2 border rounded-lg"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm">{formik.errors.email}</div>
                ) : null}
                {otpSent && (
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                )}
                <motion.button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {otpSent ? "Verify OTP" : "Send OTP"}
                </motion.button>
              </>
            ) : (
              <>
                {!isLogin && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        {...formik.getFieldProps("name")}
                        className="w-full p-2 border rounded-lg"
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-500 text-sm">{formik.errors.name}</div>
                      ) : null}
                      <select
                        name="country"
                        {...formik.getFieldProps("country")}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      {formik.touched.country && formik.errors.country ? (
                        <div className="text-red-500 text-sm">{formik.errors.country}</div>
                      ) : null}
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        {...formik.getFieldProps("email")}
                        className="w-full p-2 border rounded-lg"
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 text-sm">{formik.errors.email}</div>
                      ) : null}
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
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </button>
                        {formik.touched.password && formik.errors.password ? (
                          <div className="text-red-500 text-sm">{formik.errors.password}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        {...formik.getFieldProps("username")}
                        className="w-full p-2 border rounded-lg"
                      />
                      {formik.touched.username && formik.errors.username ? (
                        <div className="text-red-500 text-sm">{formik.errors.username}</div>
                      ) : null}
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
                      {formik.touched.city && formik.errors.city ? (
                        <div className="text-red-500 text-sm">{formik.errors.city}</div>
                      ) : null}
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        {...formik.getFieldProps("phone")}
                        className="w-full p-2 border rounded-lg"
                        value={formik.values.phone}
                        onChange={(e) =>
                          formik.setFieldValue(
                            "phone",
                            `${countryCode}${e.target.value.replace(countryCode, "").trim()}`
                          )
                        }
                      />
                      {formik.touched.phone && formik.errors.phone ? (
                        <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                      ) : null}
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
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </button>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                          <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )}
                {isLogin && (
                  <div className="space-y-4">
                    <div className="flex justify-center w-full">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        {...formik.getFieldProps("email")}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-500 text-sm text-center">{formik.errors.email}</div>
                    ) : null}
                    <div className="flex justify-center w-full relative">
                      <div className="relative w-full">
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
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </button>
                      </div>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-red-500 text-sm text-center">{formik.errors.password}</div>
                    ) : null}
                  </div>
                )}

                <div className="flex justify-center">
                  <motion.button
                    type="submit"
                    className="w-1/4 bg-[#3cbece] text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLogin ? "Login" : "Sign Up"}
                  </motion.button>
                </div>
                <p className="text-center text-sm mt-4">
                  {isLogin ? (
                    <>
                      Don&apos;t have an account?{" "}
                      <span className="text-blue-500 cursor-pointer" onClick={() => setIsLogin(false)}>
                        Sign up
                      </span>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <span className="text-blue-500 cursor-pointer" onClick={() => setIsLogin(true)}>
                        Login
                      </span>
                    </>
                  )}
                </p>
                {isLogin && (
                  <p className="text-center text-sm mt-4">
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => setIsForgotPassword(true)}
                    >
                      Forgot Password?
                    </span>
                  </p>
                )}
              </>
            )}
          </form>
        </div>
        <div className={`hidden md:flex w-1/2 ${isLogin ? "order-1" : "order-2"} justify-center items-center ml-3 mr-3`}>
          <img
            src="/assets/doctor.jpg"
            alt="Side"
            className={`w-full h-full object-cover border-2 border-black rounded-xl m-[5px] ${isLogin ? "transform scale-x-[-1]" : ""
              }`}
          />
        </div>
      </div>
    </div>
  );
}