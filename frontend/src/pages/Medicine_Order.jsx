import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper, FormControlLabel, Switch, IconButton } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";

export const MedicineOrder = () => {
    const { medicineName } = useParams(); // Get medicine name from route params
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [prescription, setPrescription] = useState(null);
    const [delivery, setDelivery] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPrescription(file);
        }
    };

    const handleFileRemove = () => {
        setPrescription(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!prescription) {
            toast.error("Please upload a valid doctor's prescription.");
            return;
        }

        console.log({ name, phone, address, prescription, delivery, medicineName });

        toast.success(`Your order has been placed. ${delivery ? "Delivery charge: 100rs" : "Takeaway selected"}`);

        // Reset form without refreshing
        setName("");
        setPhone("");
        setAddress("");
        setPrescription(null);
        setDelivery(false);
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: "20px", marginBottom: "10px" }}>
            <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    Order {medicineName}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        margin="normal"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Address"
                        variant="outlined"
                        margin="normal"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />

                    {/* File Upload with Text Button */}
                    <div style={{ textAlign: "left", marginTop: "10px", display: "flex", alignItems: "center" }}>
                        <Button
                            component="label"
                            variant="text"
                            color="primary"
                            startIcon={<AttachFileIcon />}
                            style={{ textTransform: "none" }} // Keeps button text normal case
                        >
                            Choose File
                            <input type="file" accept="image/*, .pdf" onChange={handleFileChange} hidden required />
                        </Button>
                        {prescription && (
                            <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
                                <Typography variant="body2" color="primary">
                                    {prescription.name}
                                </Typography>
                                <IconButton onClick={handleFileRemove} color="error" size="small">
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        )}
                    </div>

                    <Typography variant="caption" display="block" gutterBottom>
                        Upload Doctor's Prescription (Required)
                    </Typography>

                    <FormControlLabel
                        control={<Switch checked={delivery} onChange={(e) => setDelivery(e.target.checked)} />}
                        label={delivery ? "Delivery (100rs)" : "Takeaway"}
                    />

                    <Button variant="contained" sx={{ backgroundColor: "#3cbece" }} type="submit" fullWidth style={{ marginTop: "10px" }}>
                        Submit Order
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};
