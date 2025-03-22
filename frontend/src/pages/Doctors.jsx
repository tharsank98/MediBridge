import { useState, useEffect } from "react";
import { Card, CardContent, CardActions, Typography, Button, MenuItem, Select, InputLabel, FormControl, CircularProgress } from "@mui/material";
import { TextField } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "../api/axiosInstance";
import countryData from "dialcode-and-country-data/data/Country_Data.json";

export const Doctors = () => {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [locations, setLocations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctors from backend API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/api/doctor/list");
        setDoctors(response.data);
      } catch (error) {
        setError("Failed to fetch doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Update locations when country changes
  useEffect(() => {
    if (country) {
      setLocations(countryData[country] || []);
    } else {
      setLocations([]);
    }
  }, [country]);

  // Filter doctors based on search and filters
  const filteredDoctors = doctors.filter(
    (doctor) =>
      (doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(search.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(search.toLowerCase())) &&
      (country === "" || doctor.country === country) &&
      (location === "" || doctor.location === location) &&
      (specialization === "" || doctor.specialization === specialization)
  );

  return (
    <div style={{ padding: "24px" }}>
      <Typography variant="h5" gutterBottom>
        Find Doctors
      </Typography>

      {/* Filters */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "16px" }}>
        <FormControl style={{ flex: 1, minWidth: "200px" }}>
          <InputLabel>Country</InputLabel>
          <Select value={country} onChange={(e) => setCountry(e.target.value)}>
            <MenuItem value="">All Countries</MenuItem>
            {Object.keys(countryData).map((country) => (
              <MenuItem key={country} value={country}>{country}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          placeholder="Search by name, specialization, or hospital"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: "200px" }}
        />
        <FormControl style={{ flex: 1, minWidth: "200px" }}>
          <InputLabel>Location</InputLabel>
          <Select value={location} onChange={(e) => setLocation(e.target.value)}>
            <MenuItem value="">All Locations</MenuItem>
            {locations.map((loc) => (
              <MenuItem key={loc} value={loc}>{loc}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={{ flex: 1, minWidth: "200px" }}>
          <InputLabel>Specialization</InputLabel>
          <Select value={specialization} onChange={(e) => setSpecialization(e.target.value)}>
            <MenuItem value="">All Specializations</MenuItem>
            {["Cardiologist", "Dentist", "Diabetics", "Neurologist", "Pediatrician"].map((spec) => (
              <MenuItem key={spec} value={spec}>{spec}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Show loading spinner */}
      {loading && <CircularProgress />}

      {/* Show error message if API call fails */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Display doctor cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
        {!loading && !error && filteredDoctors.map((doctor, index) => (
          <Card key={index} style={{ padding: "16px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
            <CardContent>
              <img src={doctor.image} alt={doctor.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }} />
              <Typography variant="h6" style={{ marginTop: "8px" }}>{doctor.name}</Typography>
              <Typography color="textSecondary">{doctor.specialization}</Typography>
              <Typography color="textSecondary">{doctor.hospital}</Typography>
              <Typography color="textSecondary">{doctor.location}</Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#3cbece" }}
                endIcon={<ArrowForwardIcon />}
                onClick={() => window.location.href = `/consult/${doctor.name}`}
              >
                Consult
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};
