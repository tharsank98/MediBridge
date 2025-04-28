import { useState } from "react";
import { Card, CardContent, CardActions, Typography, Button, Snackbar, Badge } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"; 
import Searchbar from "../components/Searchbar";
import { Link } from "react-router-dom"; 

const pharmacies = [
    { name: "City Pharmacy", location: "Downtown", image: "https://via.placeholder.com/150" },
    { name: "Sunrise Pharmacy", location: "Main Street", image: "https://via.placeholder.com/150" },
    { name: "Green Valley Pharmacy", location: "Green Street", image: "https://via.placeholder.com/150" },
];

export const Pharmacy = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false); 
    const filteredPharmacies = pharmacies.filter(
        (pharmacy) =>
            pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pharmacy.location.toLowerCase().includes(searchQuery.toLowerCase())
    );



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
                                onClick={() => window.location.href = `/pharmacy/${pharmacy.name}`}
                            >
                                Order Here
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                message="Pharmacy added to cart!"
            />

            <Link to="/cart" style={{ position: "absolute", top: 16, right: 16 }}>
                <Badge badgeContent={cart.length} color="primary">
                    <AddShoppingCartIcon sx={{ fontSize: 40, color: "#3cbece" }} />
                </Badge>
            </Link>
        </div>
    );
};
