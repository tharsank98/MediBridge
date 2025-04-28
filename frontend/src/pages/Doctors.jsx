import { useState, useEffect } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getAllDoctors } from "../api/doctorAPI";
import Searchbar from "../components/Searchbar";
import { useNavigate } from "react-router-dom";

export const Doctors = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoctors = async () => {
    try {
      const response = await getAllDoctors();
      console.log("Doctors fetched:", response);
      setDoctors(response);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching doctors:", error);
      setError("Failed to fetch doctors. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

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

      <div className="flex gap-4 mb-6">
        <Searchbar onSearch={(query) => setSearchQuery(query)} />
      </div>

      {loading && <CircularProgress />}

      {error && (
        <Typography color="error" className="mb-4">
          {error}
        </Typography>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && !error && filteredDoctors.length === 0 && (
          <Typography>No doctors found.</Typography>
        )}

        {!loading &&
          !error &&
          filteredDoctors.map((doctor, index) => (
            <Card
              key={index}
              className="p-4 shadow-md cursor-pointer"
              onClick={() => navigate(`/doctor/${encodeURIComponent(doctor.name)}`)}
            >
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
              <div className="flex justify-end mt-4">
                <ArrowForwardIcon sx={{ fontSize: 30, color: "#3cbece" }} />
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};
