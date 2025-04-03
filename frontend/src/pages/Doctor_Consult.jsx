import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { toast } from "react-toastify";

export const DoctorConsult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { date, time, doctorName } = location.state || {};
    const [patientName, setPatientName] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            patientName,
            phone,
            age,
            message,
            date,
            time,
            doctorName,
        });

        toast.success("Your consultation request has been submitted.");

        setPatientName("");
        setPhone("");
        setAge("");
        setMessage("");
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: "20px", marginBottom: "10px" }}>
            <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
                {/* Back Button */}
                <Button
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    onClick={handleGoBack}
                    style={{ marginBottom: "20px" }}
                />

                <Typography variant="h5" gutterBottom>
                    Consult with Dr. {doctorName}
                </Typography>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    Appointment: {date} at {time}
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
                        label="Patient Age"
                        variant="outlined"
                        margin="normal"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
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
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#3cbece" }}
                        type="submit"
                        fullWidth
                        style={{ marginTop: "10px" }}
                    >
                        Submit Consultation Request
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};
