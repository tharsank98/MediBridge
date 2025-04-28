import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardActions, Typography, Button, IconButton, TextField, Badge } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export const View_Pharmacy = () => {
    const { pharmacyName } = useParams();
    const navigate = useNavigate();
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
    const [quantities, setQuantities] = useState({});

    const dummyMedicines = [
        { id: 1, name: "Paracetamol", expiryDate: "2026-01-01", price: 5.99, pharmacy: "City Pharmacy", image: "https://via.placeholder.com/150" },
        { id: 2, name: "Ibuprofen", expiryDate: "2025-07-15", price: 8.49, pharmacy: "City Pharmacy", image: "https://via.placeholder.com/150" },
        { id: 3, name: "Vitamin C", expiryDate: "2026-11-20", price: 12.00, pharmacy: "Sunrise Pharmacy", image: "https://via.placeholder.com/150" },
        { id: 4, name: "Amoxicillin", expiryDate: "2024-12-10", price: 15.75, pharmacy: "Green Valley Pharmacy", image: "https://via.placeholder.com/150" },
        { id: 5, name: "Cetirizine", expiryDate: "2025-03-30", price: 6.25, pharmacy: "Sunrise Pharmacy", image: "https://via.placeholder.com/150" },
    ];

    const pharmacyMedicines = dummyMedicines.filter(med => med.pharmacy === pharmacyName);

    const increaseQuantity = (id) => {
        setQuantities(prev => ({
            ...prev,
            [id]: (prev[id] || 1) + 1
        }));
    };

    const decreaseQuantity = (id) => {
        setQuantities(prev => ({
            ...prev,
            [id]: prev[id] > 1 ? prev[id] - 1 : 1
        }));
    };

    const addToCart = (medicine) => {
        const quantity = quantities[medicine.id] || 1;
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItemIndex = existingCart.findIndex(item => item.id === medicine.id);

        if (existingItemIndex !== -1) {
            existingCart[existingItemIndex].quantity += quantity;
        } else {
            existingCart.push({ ...medicine, quantity });
        }

        setCart(existingCart);
        localStorage.setItem("cart", JSON.stringify(existingCart));
    };

    // Update cart when adding
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    // Calculate total items
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

    return (
        <div style={{ padding: "24px", position: "relative" }}>
            <IconButton
                style={{
                    position: "fixed",
                    top: "90px",
                    right: "30px",
                    backgroundColor: "#3cbece",
                    color: "white",
                    zIndex: 1000,
                }}
                onClick={() => navigate("/order-cart")} // you can change route
            >
                <Badge badgeContent={totalItems} color="error">
                    <AddShoppingCartIcon />
                </Badge>
            </IconButton>

            <Typography variant="h5" gutterBottom>
                Medicines at {pharmacyName}
            </Typography>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
                {pharmacyMedicines.length === 0 && (
                    <Typography>No medicines available at this pharmacy.</Typography>
                )}

                {pharmacyMedicines.map((medicine, index) => (
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
                            <Typography color="textSecondary">Expiry Date: {medicine.expiryDate}</Typography>
                            <Typography color="textSecondary">Price: ${medicine.price}</Typography>
                        </CardContent>
                        <CardActions style={{ justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <IconButton onClick={() => decreaseQuantity(medicine.id)}>
                                    <RemoveIcon />
                                </IconButton>
                                <TextField
                                    value={quantities[medicine.id] || 1}
                                    size="small"
                                    style={{ width: "40px", textAlign: "center" }}
                                    inputProps={{ style: { textAlign: "center" }, readOnly: true }}
                                />
                                <IconButton onClick={() => increaseQuantity(medicine.id)}>
                                    <AddIcon />
                                </IconButton>
                            </div>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: "#3cbece" }}
                                startIcon={<AddShoppingCartIcon />}
                                onClick={() => addToCart(medicine)}
                            >
                                Add
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    );
};
