import { useState, useEffect } from "react";
import { Card, CardContent, CardActions, Typography, Button, CircularProgress } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "../api/axiosInstance";
import Searchbar from "../components/Searchbar";

export const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctors from backend API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/api/doctor/list");
        setDoctors(response.data);
      } catch (error) {
        setError("Failed to fetch doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter doctors based on search query (name or location)
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <Typography variant="h5" gutterBottom>
        Find Doctors
      </Typography>

      {/* Single Searchbar */}
      <div className="flex gap-4 mb-6">
        <Searchbar onSearch={(query) => setSearchQuery(query)} />
      </div>

      {/* Show loading spinner */}
      {loading && <CircularProgress />}

      {/* Show error message if API call fails */}
      {error && (
        <Typography color="error" className="mb-4">
          {error}
        </Typography>
      )}

      {/* Display doctor cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading &&
          !error &&
          filteredDoctors.map((doctor, index) => (
            <Card key={index} className="p-4 shadow-md">
              <CardContent>
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <Typography variant="h6" className="mt-4">
                  {doctor.name}
                </Typography>
                <Typography color="textSecondary">{doctor.specialization}</Typography>
                <Typography color="textSecondary">{doctor.hospital}</Typography>
                <Typography color="textSecondary">{doctor.location}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#3cbece" }}
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => (window.location.href = `/consult/${doctor.name}`)}
                >
                  Consult
                </Button>
              </CardActions>
            </Card>
          ))}
      </div>
    </div>
  );
};