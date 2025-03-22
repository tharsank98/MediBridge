import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DoctorConsult = () => {
    const { doctorName } = useParams(); // Get doctor name from route params
    const [patientName, setPatientName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({ patientName, phone, email, message, doctorName });

        toast.success("Your consultation request has been submitted.");

        // Reset form without refreshing
        setPatientName("");
        setPhone("");
        setEmail("");
        setMessage("");
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: "20px", marginBottom: "10px" }}>
            <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    Consult with {doctorName}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Patient Name"
                        variant="outlined"
                        margin="normal"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
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
                        label="Email (Optional)"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Medical Issue"
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <Button variant="contained" sx={{ backgroundColor: "#3cbece" }} type="submit" fullWidth style={{ marginTop: "10px" }}>
                        Submit Consultation Request
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};
