import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, FormControlLabel, Switch } from '@mui/material';

const style = {
    margin: 'auto',
    width: '50%',
    padding: '24px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    textAlign: 'center',
};

export const PharmacyOrder = () => {
    const [location, setLocation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isDelivery, setIsDelivery] = useState(false);
    const [prescriptionPhoto, setPrescriptionPhoto] = useState(null);
    const navigate = useNavigate();

    const handleToggleChange = (event) => {
        setIsDelivery(event.target.checked);
    };

    const handlePhotoChange = (event) => {
        setPrescriptionPhoto(event.target.files[0]);
    };

    const handleSubmit = () => {
        if (location && phoneNumber && prescriptionPhoto) {
            if (isDelivery) {
                // Simulate sending the bill to the user's email
                alert('Bill sent to your email with delivery payment details.');
            } else {
                alert('Order placed for take-away.');
            }
            navigate('/'); // Navigate to the home page or another page after submission
        } else {
            alert('Please fill in all the fields and upload a prescription photo.');
        }
    };

    return (
        <Box sx={style}>
            <Typography variant="h5" gutterBottom>
                Pharmacy Order
            </Typography>
            <TextField
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                fullWidth
                sx={{ mt: 2 }}
            />
            <TextField
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                fullWidth
                sx={{ mt: 2 }}
            />
            <FormControlLabel
                control={<Switch checked={isDelivery} onChange={handleToggleChange} />}
                label="Delivery"
                sx={{ mt: 2 }}
            />
            <Button
                variant="contained"
                component="label"
                sx={{ mt: 2 }}
            >
                Upload Prescription Photo
                <input
                    type="file"
                    hidden
                    onChange={handlePhotoChange}
                />
            </Button>
            {prescriptionPhoto && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                    {prescriptionPhoto.name}
                </Typography>
            )}
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 3 }}>
                Submit
            </Button>
        </Box>
    );
};