import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Doctors } from "./pages/Doctors";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { Pharmacy } from "./pages/Pharmacy";
import { Footer } from "./components/Footer";
import { MyProfile } from "./pages/MyProfile";
import { ToastContainer } from "react-toastify";
import { UserProvider, useUser } from "./context/UserContext";
import ForgotPassword from "./pages/ForgotPassword";
import { Login } from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { DoctorConsult } from "./pages/Doctor_Consult";
import { MedicineOrder } from "./pages/Medicine_Order";

function App() {
  return (
    <UserProvider>
      <Router>
        <ToastContainer position="bottom-right" />
        <AppContent />
      </Router>
    </UserProvider>
  );
}

const AppContent = () => {
  const { user } = useUser();

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/doctors" element={<ProtectedRoute element={<Doctors />} />} />
        <Route path="/consult/:doctorName" element={<DoctorConsult />} />
        <Route path="/pharmacy" element={<ProtectedRoute element={<Pharmacy />} />} />
        <Route path="/order/:medicineName" element={<MedicineOrder />} />
        <Route path="/contact" element={<ProtectedRoute element={<Contact />} />} />
        <Route path="/myprofile" element={<ProtectedRoute element={<MyProfile />} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {user && <Footer />}
    </>
  );
};

export default App;