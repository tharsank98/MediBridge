import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardActions, Typography, Button, CircularProgress } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { getMedicines } from "../api/medicineAPI"; 

export const View_Pharmacy = ({ match }) => {
    const [cart, setCart] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const pharmacyName = match.params.pharmacyName;

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const data = await getMedicines();  
                setMedicines(data);  
                setLoading(false);  
            } catch {
                setError("Failed to load medicines. Please try again later.");
                setLoading(false);
        };
        
        View_Pharmacy.propTypes = {
            match: PropTypes.shape({
                params: PropTypes.shape({
                    pharmacyName: PropTypes.string.isRequired,
                }).isRequired,
            }).isRequired,
        };
        };

        fetchMedicines();
    }, []);  

    const pharmacyMedicines = medicines.filter(medicine => medicine.pharmacy === pharmacyName);

    const addToCart = (medicine) => {
        setCart([...cart, medicine]);
    };

    return (
        <div style={{ padding: "24px" }}>
            <Typography variant="h5" gutterBottom>
                Medicines at {pharmacyName}
            </Typography>

            {loading && <CircularProgress />}  
            {error && <Typography color="error">{error}</Typography>}  

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
                {pharmacyMedicines.length === 0 && !loading && !error && (
                    <Typography>No medicines available at this pharmacy.</Typography>
                )}

                {!loading && !error && pharmacyMedicines.map((medicine, index) => (
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
                        <CardActions>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: "#3cbece" }}
                                startIcon={<AddShoppingCartIcon />}
                                onClick={() => addToCart(medicine)}
                            >
                                Add to Cart
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    );
};
