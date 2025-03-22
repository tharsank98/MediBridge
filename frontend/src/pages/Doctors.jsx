import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardActions, Typography, Button, MenuItem, Select, InputLabel, FormControl, AppBar, Toolbar } from "@mui/material";
import { TextField } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import countryData from "dialcode-and-country-data/data/Country_Data.json";

const doctors = [
  { name: "Dr. John Doe", specialization: "Cardiologist", hospital: "City Hospital", location: "Colombo", country: "Sri Lanka", image: "https://via.placeholder.com/150" },
  { name: "Dr. Sarah Smith", specialization: "Dentist", hospital: "Sunrise Clinic", location: "Kandy", country: "Sri Lanka", image: "https://via.placeholder.com/150" },
  { name: "Dr. Emily Johnson", specialization: "Diabetics", hospital: "Green Valley Hospital", location: "Galle", country: "Sri Lanka", image: "https://via.placeholder.com/150" },
  { name: "Dr. James Brown", specialization: "Neurologist", hospital: "City Hospital", location: "Colombo", country: "Sri Lanka", image: "https://via.placeholder.com/150" },
  { name: "Dr. Michael Lee", specialization: "Pediatrician", hospital: "Sunrise Clinic", location: "Jaffna", country: "Sri Lanka", image: "https://via.placeholder.com/150" },
];

const specializations = ["Cardiologist", "Dentist", "Diabetics", "Neurologist", "Pediatrician"];

export const Doctors = () => {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (country) {
      setLocations(countryData[country] || []);
    } else {
      setLocations([]);
    }
  }, [country]);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      (doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(search.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(search.toLowerCase())) &&
      (country === "" || doctor.country === country) &&
      (location === "" || doctor.location === location) &&
      (specialization === "" || doctor.specialization === specialization)
  );

  const handleConsultClick = (doctor) => {
    navigate('/ConsultationPage', { state: { doctor } });
  };

  return (
    <div style={{ padding: "24px" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Find Doctor
          </Typography>
        </Toolbar>
      </AppBar>
      <br />
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
            {specializations.map((spec) => (
              <MenuItem key={spec} value={spec}>{spec}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
        {filteredDoctors.map((doctor, index) => (
          <Card key={index} style={{ padding: "16px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
            <CardContent>
              <img src={doctor.image} alt={doctor.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }} />
              <Typography variant="h6" style={{ marginTop: "8px" }}>{doctor.name}</Typography>
              <Typography color="textSecondary">{doctor.specialization}</Typography>
              <Typography color="textSecondary">{doctor.hospital}</Typography>
              <Typography color="textSecondary">{doctor.location}</Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon />} onClick={() => handleConsultClick(doctor)}>
                Consult
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};