import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { Card, CardContent, TextField, Button, MenuItem, Select, IconButton, InputLabel, FormControl, Input } from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Visibility, VisibilityOff } from "@mui/icons-material";

export function Login() {
  const navigate = useNavigate();  // Initialize the navigate function
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "demo@gmail.com",
    password: "123456789SK",
    confirmPassword: "",
    mobile: "",
    country: "",
    countryCode: "",
    location: "",
    photo: null,
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryData, setCountryData] = useState({});
  const [countryCodes, setCountryCodes] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Load country data from JSON files
  useEffect(() => {
    fetch("/Location/Country_Data.json")
      .then((res) => res.json())
      .then((data) => {
        setCountryData(data);
        setCountries(Object.keys(data)); // Set available countries
      })
      .catch((error) => console.error("Error loading country data:", error));

    fetch("/CountryCode/ConvertedCountryCodes.json")
      .then((res) => res.json())
      .then((data) => setCountryCodes(data))
      .catch((error) => console.error("Error loading country codes:", error));
  }, []);

  // Update cities & country code when a country is selected
  useEffect(() => {
    if (formData.country && countryData[formData.country]) {
      const newCode = countryCodes[formData.country] || "";
      setCities(countryData[formData.country]); // Set correct cities
      setFormData((prev) => ({
        ...prev,
        countryCode: newCode,
        mobile: newCode, // Auto-fill country code in mobile number
        location: countryData[formData.country][0] || "", // Set first city as default
      }));
    }
  }, [formData.country, countryData, countryCodes]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile photo upload
  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin) {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.location) {
        toast.error("All fields are required!");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }
    }

    toast.success(isLogin ? "Logged in successfully!" : "Signed up successfully!");

    // Redirect user to another page after successful login
    if (isLogin) {
      navigate(""); // Redirect to dashboard or another page
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card sx={{ width: 400, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <TextField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />

                <FormControl fullWidth margin="normal">
                  <InputLabel id="country-label">Country</InputLabel>
                  <Select
                    labelId="country-label"
                    id="country"
                    name="country"
                    value={formData.country}
                    label="Country"
                    onChange={handleChange}
                    required
                  >
                    {countries.map((country) => (
                      <MenuItem key={country} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                  <TextField
                    label="Mobile Number"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>

                <FormControl fullWidth margin="normal">
                  <InputLabel id="location-label">Location</InputLabel>
                  <Select
                    labelId="location-label"
                    id="location"
                    name="location"
                    value={formData.location}
                    label="Location"
                    onChange={handleChange}
                    required
                  >
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <div style={{ marginBottom: "16px" }}>
                  <label htmlFor="photo-upload" style={{ display: "block", marginBottom: "8px" }}>
                    Upload Profile Photo (Optional)
                  </label>
                  <Input id="photo-upload" type="file" onChange={handlePhotoChange} fullWidth />
                </div>
              </>
            )}

            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}  // Toggle password visibility
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            {!isLogin && (
              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}  // Toggle confirm password visibility
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            )}
            <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>
          <p style={{ textAlign: "center", fontSize: "14px", marginTop: "16px" }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span style={{ color: "#1976d2", cursor: "pointer" }} onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign up" : "Login"}
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
