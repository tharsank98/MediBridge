import { useState } from "react";
import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Searchbar from "../components/Searchbar"; // Import the Searchbar component

const medicines = [
    { name: "Paracetamol", type: "Tablet", pharmacy: "City Pharmacy", image: "https://via.placeholder.com/150" },
    { name: "Amoxicillin", type: "Capsule", pharmacy: "Sunrise Pharmacy", image: "https://via.placeholder.com/150" },
    { name: "Metformin", type: "Tablet", pharmacy: "Green Valley Pharmacy", image: "https://via.placeholder.com/150" },
    { name: "Ibuprofen", type: "Tablet", pharmacy: "City Pharmacy", image: "https://via.placeholder.com/150" },
    { name: "Cough Syrup", type: "Syrup", pharmacy: "Sunrise Pharmacy", image: "https://via.placeholder.com/150" },
];

export const Pharmacy = () => {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter medicines based on the search query
    const filteredMedicines = medicines.filter(
        (medicine) =>
            medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            medicine.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            medicine.pharmacy.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ padding: "24px" }}>
            <Typography variant="h5" gutterBottom>
                Order Medicines
            </Typography>

            {/* Searchbar */}
            <div style={{ marginBottom: "16px" }}>
                <Searchbar onSearch={(query) => setSearchQuery(query)} />
            </div>

            {/* Display filtered medicines */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
                {filteredMedicines.map((medicine, index) => (
                    <Card key={index} style={{ padding: "16px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
                        <CardContent>
                            <img
                                src={medicine.image}
                                alt={medicine.name}
                                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                            />
                            <Typography variant="h6" style={{ marginTop: "8px" }}>
                                {medicine.name}
                            </Typography>
                            <Typography color="textSecondary">{medicine.type}</Typography>
                            <Typography color="textSecondary">{medicine.pharmacy}</Typography>
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