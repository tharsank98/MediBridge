import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Tooltip,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Avatar,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

import "react-toastify/dist/ReactToastify.css";

export const MyProfile = () => {
  const [user, setUser] = useState({
    email: "user@example.com",
    phone: "",
    city: "",
    country: "",
    countryCode: "",
    username: "JohnDoe",
    photo: null,
  });

  const [editMode, setEditMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const navigate = useNavigate();

  const countriesList = Object.keys(countryData);

  const getCountryCode = (country) => {
    return countryCodes[country] || "";
  };

  const [countryData, setCountryData] = useState({});
  const [countryCodes, setCountryCodes] = useState({});

  useEffect(() => {
    fetch("/Location/Country_Data.json")
      .then((response) => response.json())
      .then((data) => setCountryData(data))
      .catch((error) => console.error("Error loading country data:", error));

    fetch("/CountryCode/ConvertedCountryCodes.json")
      .then((response) => response.json())
      .then((data) => setCountryCodes(data))
      .catch((error) => console.error("Error loading country codes:", error));
  }, []);


  const profileValidationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    city: Yup.string()
      .min(3, "City must be at least 3 characters")
      .required("City is required")
      .test("valid-city", "City is not valid for the selected country", function (value) {
        const country = this.parent.country;
        const countryCities = countryData[country] || [];
        return countryCities.includes(value);
      }),
    country: Yup.string()
      .required("Country is required")
      .test("valid-country", "Country is not valid", (value) => countriesList.includes(value)),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\+?\d+$/, "Phone number must contain only digits and an optional '+' symbol")
      .test("valid-phone-code", "Phone number must match the selected country's code", function (value) {
        const country = this.parent.country;
        const expectedCode = getCountryCode(country);
        return value.startsWith(expectedCode);
      }),
  });

  const profileFormik = useFormik({
    initialValues: {
      username: user.username,
      city: user.city,
      country: user.country,
      phone: user.phone,
    },
    validationSchema: profileValidationSchema,
    onSubmit: () => {
      setShowConfirmation(true);
    },
    enableReinitialize: true,
  });

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    const newCountryCode = getCountryCode(selectedCountry);
    const countryCities = countryData[selectedCountry] || [];

    setCityOptions(countryCities);
    profileFormik.setFieldValue("country", selectedCountry);
    profileFormik.setFieldValue("phone", newCountryCode);

    setUser({
      ...user,
      country: selectedCountry,
      countryCode: newCountryCode,
      city: "",
    });
  };

  const handlePhoneChange = (e) => {
    profileFormik.setFieldValue("phone", e.target.value);
  };

  const handleConfirmChanges = () => {
    if (!profileFormik.isValid) {
      toast.error("Please fix the errors before updating your profile.");
      return;
    }
    setUser({ ...user, ...profileFormik.values });
    setEditMode(false);
    setShowConfirmation(false);
    toast.success("Profile updated successfully!");
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (user.country) {
      const code = countryCodes[user.country] || ""; // Get from embedded object
      setUser((prevUser) => ({
        ...prevUser,
        countryCode: code,
        phone: code,
      }));
      profileFormik.setFieldValue("phone", code);
    }
  }, [user.country, countryCodes, profileFormik]);



  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105">
      {/* Profile Photo */}
      <div className="flex justify-center mb-6 relative">
        <Avatar
          alt={user.username}
          src={user.photo}
          sx={{ width: 120, height: 120 }}
        >
          {!user.photo && <PersonIcon />}
        </Avatar>
        {editMode && (
          <IconButton
            color="primary"
            component="label"
            sx={{ position: "absolute", bottom: 0, right: "calc(50% - 24px)" }}
          >
            <PhotoCamera />
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handlePhotoUpload}
            />
          </IconButton>
        )}
      </div>

      <form onSubmit={profileFormik.handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          variant="standard"
          value={user.email}
          InputProps={{ readOnly: true }}
        />
        <TextField
          fullWidth
          id="username"
          name="username"
          label="Username"
          variant="standard"
          value={profileFormik.values.username}
          onChange={profileFormik.handleChange}
          onBlur={profileFormik.handleBlur}
          error={profileFormik.touched.username && Boolean(profileFormik.errors.username)}
          helperText={profileFormik.touched.username && profileFormik.errors.username}
          disabled={!editMode}
        />
        <FormControl fullWidth variant="standard" disabled={!editMode}>
          <InputLabel>City</InputLabel>
          <Select
            id="city"
            name="city"
            value={profileFormik.values.city}
            onChange={profileFormik.handleChange}
            onBlur={profileFormik.handleBlur}
            error={profileFormik.touched.city && Boolean(profileFormik.errors.city)}
          >
            {cityOptions.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          id="country"
          name="country"
          label="Country"
          variant="standard"
          value={profileFormik.values.country}
          onChange={handleCountryChange}
          onBlur={profileFormik.handleBlur}
          error={profileFormik.touched.country && Boolean(profileFormik.errors.country)}
          helperText={profileFormik.touched.country && profileFormik.errors.country}
          disabled={!editMode}
        />
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Phone"
          variant="standard"
          value={profileFormik.values.phone}
          onChange={handlePhoneChange}
          onBlur={profileFormik.handleBlur}
          error={profileFormik.touched.phone && Boolean(profileFormik.errors.phone)}
          helperText={profileFormik.touched.phone && profileFormik.errors.phone}
          disabled={!editMode}
        />
        {editMode && (
          <Button variant="contained" color="primary" type="submit" className="w-full mt-4">
            Update Profile
          </Button>
        )}
      </form>

      {/* Circular Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <Tooltip title="Edit Profile">
          <Fab color="secondary" onClick={() => setEditMode(!editMode)}>
            <EditIcon />
          </Fab>
        </Tooltip>
        <Tooltip title="Logout">
          <Fab
            color="error"
            onClick={() => {

              navigate("/login");
            }}
          >
            <LogoutIcon />
          </Fab>
        </Tooltip>
      </div>

      {/* Dialog for Confirm Changes */}
      <Dialog open={showConfirmation} onClose={() => setShowConfirmation(false)}>
        <DialogTitle>Confirm Changes</DialogTitle>
        <DialogContent>
          <p>Do you want to update your profile?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmation(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmChanges} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

