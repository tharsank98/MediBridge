import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Grid, Box } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ArrowBack } from "@mui/icons-material";
import axiosInstance from '../api/axiosInstance'; 

export const ViewDoctor = () => {
    const { doctorName } = useParams();  
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await axiosInstance.get(`/doctor/${doctorName}`);
                setDoctor(response.data);  
                generateAvailableTimes(response.data.schedule); 
            } catch (error) {
                console.log(error);
                setError("Failed to fetch doctor details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        const generateAvailableTimes = (schedule) => {
            const availableSlots = [];
            let currentTime = new Date();
            currentTime.setHours(16, 0, 0, 0); 

            for (let i = 0; i < 8; i++) {
                const slotTime = new Date(currentTime);
                const slotTimeString = slotTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                availableSlots.push({
                    time: slotTimeString,
                    available: !schedule.includes(slotTimeString), 
                });

                currentTime.setMinutes(currentTime.getMinutes() + 30);  
            }
            setAvailableTimes(availableSlots);
        };

        fetchDoctorDetails(); 
    }, [doctorName]);

    const handleBooking = (time) => {
        if (selectedDate && time) {
            setSelectedTime(time);
            navigate(`/doctor_consult`, {
                state: {
                    date: selectedDate,
                    time: time,
                    doctorName: doctor.name,
                }
            });
        }
    };

    if (loading) return <CircularProgress />;  
    if (error) return <div>{error}</div>;  

    const handleGoBack = () => {
        navigate(-1);  
    };

    return (
        <div className="container p-6">
            <Button
                startIcon={<ArrowBack />}
                onClick={handleGoBack}
                style={{ marginBottom: "20px" }}
            />

            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Box component="img" src={doctor.image} alt={doctor.name} sx={{ width: "100%", borderRadius: "8px" }} />
                </Grid>

                <Grid item xs={12} md={8}>
                    <Typography variant="h4" fontWeight="bold">
                        {doctor.name}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                        {doctor.degree}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {doctor.experience} years of experience
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Specialization: {doctor.specialization}
                    </Typography>
                    <Typography variant="body1" className="mt-4">
                        {doctor.bio}
                    </Typography>
                </Grid>
            </Grid>

            <Box className="mt-6">
                <Typography variant="h5" gutterBottom>Consultation Information</Typography>
                <Typography variant="body1">Location: {doctor.location}</Typography>

                <Typography variant="h6" gutterBottom className="mt-4">Select Date for Appointment</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        renderInput={(props) => <input {...props} />}
                        disablePast
                    />
                </LocalizationProvider>

                <Typography variant="h6" gutterBottom className="mt-4">Available Time Slots</Typography>
                <Grid container spacing={2} sx={{ rowGap: "20px" }}>
                    {availableTimes.map((slot, index) => (
                        <Grid item xs={12} sm={6} md={2} key={index} className="flex justify-center">
                            <Button
                                variant="contained"
                                size="small"
                                color={slot.available ? "primary" : "disabled"}
                                fullWidth
                                disabled={!slot.available}
                                onClick={() => handleBooking(slot.time)}
                            >
                                {slot.time} {slot.available ? "" : "(Booked)"}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
};
