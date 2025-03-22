import { useState, useEffect } from "react";
import { Card, CardContent, CardActions, Typography, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { TextField } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import countryData from "dialcode-and-country-data/data/Country_Data.json";

const medicines = [
    { name: "Paracetamol", type: "Tablet", pharmacy: "City Pharmacy", location: "Colombo", country: "Sri Lanka", image: "https://via.placeholder.com/150" },
    { name: "Amoxicillin", type: "Capsule", pharmacy: "Sunrise Pharmacy", location: "Kandy", country: "Sri Lanka", image: "https://via.placeholder.com/150" },
    { name: "Metformin", type: "Tablet", pharmacy: "Green Valley Pharmacy", location: "Galle", country: "Sri Lanka", image: "https://via.placeholder.com/150" },
    { name: "Ibuprofen", type: "Tablet", pharmacy: "City Pharmacy", location: "Colombo", country: "Sri Lanka", image: "https://via.placeholder.com/150" },
    { name: "Cough Syrup", type: "Syrup", pharmacy: "Sunrise Pharmacy", location: "Jaffna", country: "Sri Lanka", image: "https://via.placeholder.com/150" },
];

const types = ["Tablet", "Capsule", "Syrup"];

export const Pharmacy = () => {
    const [search, setSearch] = useState("");
    const [country, setCountry] = useState("");
    const [location, setLocation] = useState("");
    const [type, setType] = useState("");
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        if (country) {
            setLocations(countryData[country] || []);
        } else {
            setLocations([]);
        }
    }, [country]);

    const filteredMedicines = medicines.filter(
        (medicine) =>
            (medicine.name.toLowerCase().includes(search.toLowerCase()) ||
                medicine.type.toLowerCase().includes(search.toLowerCase()) ||
                medicine.pharmacy.toLowerCase().includes(search.toLowerCase())) &&
            (country === "" || medicine.country === country) &&
            (location === "" || medicine.location === location) &&
            (type === "" || medicine.type === type)
    );

    return (
        <div style={{ padding: "24px" }}>
            <Typography variant="h5" gutterBottom>
                Order Medicines
            </Typography>
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
                    placeholder="Search by name, type, or pharmacy"
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
                    <InputLabel>Type</InputLabel>
                    <Select value={type} onChange={(e) => setType(e.target.value)}>
                        <MenuItem value="">All Types</MenuItem>
                        {types.map((type) => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
                {filteredMedicines.map((medicine, index) => (
                    <Card key={index} style={{ padding: "16px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
                        <CardContent>
                            <img src={medicine.image} alt={medicine.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }} />
                            <Typography variant="h6" style={{ marginTop: "8px" }}>{medicine.name}</Typography>
                            <Typography color="textSecondary">{medicine.type}</Typography>
                            <Typography color="textSecondary">{medicine.pharmacy}</Typography>
                            <Typography color="textSecondary">{medicine.location}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: "#3cbece" }}
                                endIcon={<ArrowForwardIcon />}
                                onClick={() => window.location.href = `/order/${medicine.name}`}
                            >
                                Order
                            </Button>

                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    );
};