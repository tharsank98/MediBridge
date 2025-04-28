import { useState } from "react";
import { Card, CardContent, CardActions, Typography, Button, Badge, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Searchbar from "../components/Searchbar";
import { useNavigate } from "react-router-dom";

const pharmacies = [
    { name: "City Pharmacy", location: "Downtown", image: "https://via.placeholder.com/150" },
    { name: "Sunrise Pharmacy", location: "Main Street", image: "https://via.placeholder.com/150" },
    { name: "Green Valley Pharmacy", location: "Green Street", image: "https://via.placeholder.com/150" },
];

export const Pharmacy = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate(); // for navigation
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const filteredPharmacies = pharmacies.filter(
        (pharmacy) =>
            pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pharmacy.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOrderClick = (pharmacyName) => {
        navigate(`/pharmacy/${pharmacyName}`);
    };

    const handleCartClick = () => {
        navigate("/cart");
    };

    return (
        <div style={{ padding: "24px", position: "relative" }}>
            <Typography variant="h5" gutterBottom>
                Find Pharmacies
            </Typography>

            <div style={{ marginBottom: "16px" }}>
                <Searchbar onSearch={(query) => setSearchQuery(query)} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
                {filteredPharmacies.map((pharmacy, index) => (
                    <Card key={index} style={{ padding: "16px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
                        <CardContent>
                            <img
                                src={pharmacy.image}
                                alt={pharmacy.name}
                                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                            />
                            <Typography variant="h6" style={{ marginTop: "8px" }}>
                                {pharmacy.name}
                            </Typography>
                            <Typography color="textSecondary">{pharmacy.location}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: "#3cbece" }}
                                endIcon={<ArrowForwardIcon />}
                                onClick={() => handleOrderClick(pharmacy.name)}
                            >
                                Order Here
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>

            <IconButton
                style={{
                    position: "fixed",
                    top: "90px",
                    right: "30px",
                    backgroundColor: "#3cbece",
                    color: "white",
                    zIndex: 1000,
                }}
                onClick={handleCartClick}
            >
                <Badge badgeContent={cart.length} color="error">
                    <AddShoppingCartIcon sx={{ fontSize: 40, color: "white" }} />
                </Badge>
            </IconButton>
        </div>
    );
};
