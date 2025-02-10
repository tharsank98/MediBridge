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

// Importing the data from the npm package
import countryData from "dialcode-and-country-data/data/Country_Data.json";
import countryDialCodes from "dialcode-and-country-data/data/Country_Dialcode.json";

import "react-toastify/dist/ReactToastify.css";

export const MyProfile = () => {
  const [user, setUser] = useState({
    email: "user@example.com",
    phone: "",
    phoneCode: "",
    city: "",
    country: "",
    username: "JohnDoe",
    photo: null,
  });

  const [editMode, setEditMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [countryDataState, setCountryData] = useState({});
  const [countryDialCodeState, setCountryDialCodes] = useState({});
  const countriesList = Object.keys(countryDataState);

  const getCountryDialCode = (country) => {
    return countryDialCodeState[country] || "";
  };

  useEffect(() => {
    setLoading(true);

    // Simulating data fetching from the npm package (already imported above)
    setCountryData(countryData);
    setCountryDialCodes(countryDialCodes);
    setLoading(false);
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
        const countryCities = countryDataState[country] || [];
        return countryCities.includes(value);
      }),
    country: Yup.string()
      .required("Country is required")
      .test("valid-country", "Country is not valid", (value) => countriesList.includes(value)),
    phoneCode: Yup.string()
      .required("Phone code is required")
      .matches(/^\+?[1-9]\d{1,14}$/, "Phone code must be valid"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{1,14}$/, "Phone number must be valid"),
  });

  const profileFormik = useFormik({
    initialValues: {
      username: user.username,
      city: user.city,
      country: user.country,
      phoneCode: user.phoneCode,
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
    const newCountryDialCode = getCountryDialCode(selectedCountry);
    const countryCities = countryDataState[selectedCountry] || [];

    setCityOptions(countryCities);
    profileFormik.setFieldValue("country", selectedCountry);
    profileFormik.setFieldValue("phoneCode", newCountryDialCode);

    setUser({
      ...user,
      country: selectedCountry,
      phoneCode: newCountryDialCode,
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
      reader.onerror = () => {
        toast.error("Error uploading photo.");
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (user.country && user.phoneCode === '') {
      const dialCode = countryDialCodeState[user.country] || '';
      setUser((prevUser) => ({
        ...prevUser,
        phoneCode: dialCode,
      }));
    }
  }, [user.country, countryDialCodeState]);

  if (loading) {
    return <div>Loading...</div>; // A simple loader or a spinner.
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-2xl">
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
          disabled
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
        <div className="flex gap-2">
          <TextField
            id="phoneCode"
            name="phoneCode"
            label="Phone Code"
            variant="standard"
            value={profileFormik.values.phoneCode}
            InputProps={{ readOnly: true }}
            onChange={profileFormik.handleChange}
            onBlur={profileFormik.handleBlur}
            error={profileFormik.touched.phoneCode && Boolean(profileFormik.errors.phoneCode)}
            helperText={profileFormik.touched.phoneCode && profileFormik.errors.phoneCode}
            disabled
            style={{ width: '100px' }} // Set a fixed width for the phone code input
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
        </div>
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