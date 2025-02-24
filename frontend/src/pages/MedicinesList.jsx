import { useState } from "react";
import { useParams } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Card, CardContent, CardActions, Button, Badge } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const medicines = [
    { name: "Paracetamol", type: "Tablet", pharmacy: "City Pharmacy", location: "Colombo", country: "Sri Lanka", image: "https://via.placeholder.com/150" },
    { name: "Amoxicillin", type: "Capsule", pharmacy: "Sunrise Pharmacy", location: "Kandy", country: "Sri Lanka", image: "https://via.placeholder.com/150" },
    { name: "Metformin", type: "Tablet", pharmacy: "Green Valley Pharmacy", location: "Galle", country: "Sri Lanka", image: "https://via.placeholder.com/150" },
    { name: "Ibuprofen", type: "Tablet", pharmacy: "City Pharmacy", location: "Colombo", country: "Sri Lanka", image: "https://via.placeholder.com/150" },
    { name: "Cough Syrup", type: "Syrup", pharmacy: "Sunrise Pharmacy", location: "Jaffna", country: "Sri Lanka", image: "https://via.placeholder.com/150" },
];

export const MedicinesList = () => {
    const { pharmacyName } = useParams();
    const [cartItems, setCartItems] = useState(0);

    const filteredMedicines = medicines.filter((medicine) => medicine.pharmacy === pharmacyName);

    const handleAddToCart = () => {
        setCartItems(cartItems + 1);
    };

    return (
        <div style={{ padding: "24px" }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Medicines at {pharmacyName}
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={cartItems} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <br />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
                {filteredMedicines.map((medicine, index) => (
                    <Card key={index} style={{ padding: "16px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
                        <CardContent>
                            <img src={medicine.image} alt={medicine.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }} />
                            <Typography variant="h6" style={{ marginTop: "8px" }}>{medicine.name}</Typography>
                            <Typography color="textSecondary">{medicine.type}</Typography>
                            <Typography color="textSecondary">{medicine.location}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary" endIcon={<AddShoppingCartIcon />} onClick={handleAddToCart}>
                                Add to cart
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    );
};