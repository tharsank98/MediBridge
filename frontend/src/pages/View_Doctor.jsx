import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Grid, Box, CircularProgress } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ArrowBack } from "@mui/icons-material";

// Dummy data
const sriLankanDoctors = [
    {
        name: "Dr. Nadeesha Jayawardena",
        specialization: "Cardiologist",
        hospital: "Nawaloka Hospital",
        location: "Colombo",
        image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
        degree: "MBBS, MD (Cardiology)",
        experience: 15,
        bio: "Dr. Nadeesha is a highly experienced cardiologist with a strong track record of patient care in both public and private hospitals.",
        schedule: ["04:30 PM", "05:00 PM"],
    },
    {
        name: "Dr. Harsha Senanayake",
        specialization: "Dermatologist",
        hospital: "Asiri Surgical Hospital",
        location: "Kandy",
        image: "https://images.unsplash.com/photo-1603398938378-e57b9099c48e?auto=format&fit=crop&w=400&q=80",
        degree: "MBBS, MD (Dermatology)",
        experience: 10,
        bio: "Expert in treating chronic skin conditions with a modern approach and advanced dermatological techniques.",
        schedule: ["04:00 PM"],
    },
    {
        name: "Dr. Anuradha Perera",
        specialization: "Pediatrician",
        hospital: "Lady Ridgeway Hospital",
        location: "Colombo",
        image: "https://images.unsplash.com/photo-1579684453423-99e1e9b9e03c?auto=format&fit=crop&w=400&q=80",
        degree: "MBBS, DCH",
        experience: 8,
        bio: "Child health specialist with a gentle approach to pediatric care and immunization services.",
        schedule: [],
    },
    {
        name: "Dr. Thisara Gunasekara",
        specialization: "Neurologist",
        hospital: "Teaching Hospital Karapitiya",
        location: "Galle",
        image: "https://images.unsplash.com/photo-1588776814546-d063f9f40e3b?auto=format&fit=crop&w=400&q=80",
        degree: "MBBS, MD (Neurology)",
        experience: 12,
        bio: "Focuses on neurological disorders with experience in stroke and epilepsy treatment.",
        schedule: ["05:30 PM"],
    },
    {
        name: "Dr. Sanduni Fernando",
        specialization: "Psychiatrist",
        hospital: "National Hospital Colombo",
        location: "Colombo",
        image: "https://images.unsplash.com/photo-1579154203451-0f58b690f5f9?auto=format&fit=crop&w=400&q=80",
        degree: "MBBS, MD (Psychiatry)",
        experience: 9,
        bio: "Specialist in mental health, stress management, and therapy with a compassionate approach.",
        schedule: ["04:00 PM", "05:00 PM"],
    },
    {
        name: "Dr. Rajitha Karunaratne",
        specialization: "Orthopedic Surgeon",
        hospital: "Durdans Hospital",
        location: "Matara",
        image: "https://images.unsplash.com/photo-1622253692010-3334cdbaad05?auto=format&fit=crop&w=400&q=80",
        degree: "MBBS, MS (Ortho)",
        experience: 14,
        bio: "Orthopedic surgeon with a focus on minimally invasive joint and bone surgeries.",
        schedule: ["04:30 PM"],
    },
];

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
        const fetchDoctorDetails = () => {
            const decodedName = decodeURIComponent(doctorName);
            const foundDoctor = sriLankanDoctors.find((doc) => doc.name === decodedName);
            if (foundDoctor) {
                setDoctor(foundDoctor);
                generateAvailableTimes(foundDoctor.schedule || []);
            } else {
                setError("Doctor not found.");
            }
            setLoading(false);
        };

        const generateAvailableTimes = (schedule) => {
            const availableSlots = [];
            let currentTime = new Date();
            currentTime.setHours(16, 0, 0, 0); // Start at 4:00 PM

            for (let i = 0; i < 8; i++) {
                const slotTime = new Date(currentTime);
                const slotTimeString = slotTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                });

                availableSlots.push({
                    time: slotTimeString,
                    available: !schedule.includes(slotTimeString),
                });

                currentTime.setMinutes(currentTime.getMinutes() + 30); // 30 min interval
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
                },
            });
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    if (loading) return <CircularProgress />;
    if (error) return <div>{error}</div>;

    return (
        <div className="container p-6">
            <Button
                startIcon={<ArrowBack />}
                onClick={handleGoBack}
                style={{ marginBottom: "20px" }}
            />

            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Box
                        component="img"
                        src={doctor.image}
                        alt={doctor.name}
                        sx={{ width: "100%", borderRadius: "8px" }}
                    />
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
                <Typography variant="h5" gutterBottom>
                    Consultation Information
                </Typography>
                <Typography variant="body1">Location: {doctor.location}</Typography>

                <Typography variant="h6" gutterBottom className="mt-4">
                    Select Date for Appointment
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        disablePast
                    />
                </LocalizationProvider>

                <Typography variant="h6" gutterBottom className="mt-4">
                    Available Time Slots
                </Typography>
                <Grid container spacing={2} sx={{ rowGap: "20px" }}>
                    {availableTimes.map((slot, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={2}
                            key={index}
                            className="flex justify-center"
                        >
                            <Button
                                variant="contained"
                                size="small"
                                color={slot.available ? "primary" : "inherit"}
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
