import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, Typography, MenuItem, Select, InputLabel, FormControl, TextField } from "@mui/material";
import countryData from "dialcode-and-country-data/data/Country_Data.json";

const pharmacies = [
  { name: "City Pharmacy", location: "Colombo", country: "Sri Lanka" },
  { name: "Sunrise Pharmacy", location: "Kandy", country: "Sri Lanka" },
  { name: "Green Valley Pharmacy", location: "Galle", country: "Sri Lanka" },
  { name: "Sunrise Pharmacy", location: "Jaffna", country: "Sri Lanka" },
];

export const Pharmacy = () => {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (country) {
      setLocations(countryData[country] || []);
    } else {
      setLocations([]);
    }
  }, [country]);

  const filteredPharmacies = pharmacies.filter(
    (pharmacy) =>
      (pharmacy.name.toLowerCase().includes(search.toLowerCase()) ||
        pharmacy.location.toLowerCase().includes(search.toLowerCase())) &&
      (country === "" || pharmacy.country === country) &&
      (location === "" || pharmacy.location === location)
  );

  const handlePharmacySelect = (pharmacy) => {
    history.push(`/pharmacy/${pharmacy.name}`);
  };

  return (
    <div style={{ padding: "24px" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Select Pharmacy
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
          placeholder="Search by name or location"
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
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
        {filteredPharmacies.map((pharmacy, index) => (
          <div key={index} style={{ padding: "16px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
            <Typography variant="h6">{pharmacy.name}</Typography>
            <Typography color="textSecondary">{pharmacy.location}</Typography>
            <Typography color="textSecondary">{pharmacy.country}</Typography>
            <button onClick={() => handlePharmacySelect(pharmacy)}>Select</button>
          </div>
        ))}
      </div>
    </div>
  );
};