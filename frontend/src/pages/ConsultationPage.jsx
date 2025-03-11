import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const style = {
    margin: 'auto',
    width: '50%',
    padding: '24px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    textAlign: 'center',
};

export const ConsultationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const doctor = location.state?.doctor;

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const handleSubmit = () => {
        if (selectedDate && selectedTime) {
            console.log('Selected Date:', selectedDate);
            console.log('Selected Time:', selectedTime);
            navigate('/doctors');
        } else {
            alert('Please select a date and time for the consultation.');
        }
    };

    if (!doctor) {
        return (
            <Box sx={style}>
                <Typography variant="h6" color="error">
                    No doctor selected.
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/doctors')}>
                    Go Back
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={style}>
            <Typography variant="h5">{doctor.name}</Typography>
            <Typography color="textSecondary">{doctor.specialization}</Typography>
            <Typography color="textSecondary">{doctor.hospital}, {doctor.location}</Typography>
            <Typography sx={{ mt: 2 }}>
                Select a Date and Time for Consultation:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box sx={{ mt: 2 }}>
                    <DatePicker
                        label="Select Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                </Box>
                <Box sx={{ mt: 2 }}>
                    <TimePicker
                        label="Select Time"
                        value={selectedTime}
                        onChange={handleTimeChange}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                </Box>
            </LocalizationProvider>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 3 }}
            >
                Confirm
            </Button>
        </Box>
    );
};
