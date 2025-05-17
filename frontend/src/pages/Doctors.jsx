import { useState } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Searchbar from "../components/Searchbar";
import { useNavigate } from "react-router-dom";

const sriLankanDoctors = [
  {
    name: "Dr. Nadeesha Jayawardena",
    specialization: "Cardiologist",
    hospital: "Nawaloka Hospital",
    location: "Colombo",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Dr. Harsha Senanayake",
    specialization: "Dermatologist",
    hospital: "Asiri Surgical Hospital",
    location: "Kandy",
    image: "https://images.unsplash.com/photo-1603398938378-e57b9099c48e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Dr. Anuradha Perera",
    specialization: "Pediatrician",
    hospital: "Lady Ridgeway Hospital",
    location: "Colombo",
    image: "https://images.unsplash.com/photo-1579684453423-99e1e9b9e03c?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Dr. Thisara Gunasekara",
    specialization: "Neurologist",
    hospital: "Teaching Hospital Karapitiya",
    location: "Galle",
    image: "https://images.unsplash.com/photo-1588776814546-d063f9f40e3b?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Dr. Sanduni Fernando",
    specialization: "Psychiatrist",
    hospital: "National Hospital Colombo",
    location: "Colombo",
    image: "https://images.unsplash.com/photo-1579154203451-0f58b690f5f9?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Dr. Rajitha Karunaratne",
    specialization: "Orthopedic Surgeon",
    hospital: "Durdans Hospital",
    location: "Matara",
    image: "https://images.unsplash.com/photo-1622253692010-3334cdbaad05?auto=format&fit=crop&w=400&q=80",
  },
];


export const Doctors = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading] = useState(false);
  const [error] = useState(null);

  const filteredDoctors = sriLankanDoctors.filter(
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
        <Searchbar onSearch={setSearchQuery} />
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