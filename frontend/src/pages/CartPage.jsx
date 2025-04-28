import { useState, useEffect } from "react";
import { Card, CardContent, CardActions, Typography, Button, IconButton, TextField, Divider, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const CartPage = () => {
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart") || "[]"));
    const [quantities, setQuantities] = useState({});  // No type annotation needed in JS
    const [deliveryOption, setDeliveryOption] = useState("takeaway"); // "takeaway" or "delivery"

    useEffect(() => {
        setQuantities(cart.reduce((acc, item) => {
            acc[item.id] = item.quantity;
            return acc;
        }, {}));
    }, [cart]);

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

    const updateCart = (id, quantity) => {
        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, quantity } : item
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const removeItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleDeliveryOptionChange = (event) => {
        setDeliveryOption(event.target.value);
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div style={{ padding: "24px" }}>
            <Typography variant="h4" gutterBottom>
                Your Cart
            </Typography>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
                {cart.length === 0 && (
                    <Typography>No items in your cart.</Typography>
                )}

                {cart.map((item) => (
                    <Card key={item.id} style={{ padding: "16px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
                        <CardContent>
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                            />
                            <Typography variant="h6" style={{ marginTop: "8px" }}>
                                {item.name}
                            </Typography>
                            <Typography color="textSecondary">Price: ${item.price}</Typography>
                            <Typography color="textSecondary">Expiry Date: {item.expiryDate}</Typography>
                        </CardContent>
                        <CardActions style={{ justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <IconButton onClick={() => decreaseQuantity(item.id)}>
                                    <RemoveIcon />
                                </IconButton>
                                <TextField
                                    value={quantities[item.id] || 1}
                                    size="small"
                                    style={{ width: "40px", textAlign: "center" }}
                                    inputProps={{ style: { textAlign: "center" }, readOnly: true }}
                                />
                                <IconButton onClick={() => increaseQuantity(item.id)}>
                                    <AddIcon />
                                </IconButton>
                            </div>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => removeItem(item.id)}
                            >
                                Remove
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>

            <Divider style={{ margin: "24px 0" }} />

            {cart.length > 0 && (
                <>
                    <Typography variant="h6">Total Price: ${totalPrice.toFixed(2)}</Typography>

                    <FormControl component="fieldset" style={{ marginTop: "16px" }}>
                        <FormLabel component="legend">Delivery Option</FormLabel>
                        <RadioGroup
                            value={deliveryOption}
                            onChange={handleDeliveryOptionChange}
                        >
                            <FormControlLabel value="takeaway" control={<Radio />} label="Takeaway" />
                            <FormControlLabel value="delivery" control={<Radio />} label="Delivery" />
                        </RadioGroup>
                    </FormControl>

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px" }}>
                        <Link to="/checkout" style={{ textDecoration: "none" }}>
                            <Button variant="contained" color="primary">
                                Checkout
                            </Button>
                        </Link>
                        <Button variant="outlined" color="secondary">
                            Cancel
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};
