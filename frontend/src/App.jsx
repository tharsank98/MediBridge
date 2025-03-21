import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Doctors } from "./pages/Doctors";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { PharmacySelection } from "./pages/PharmacySelection";
import { MedicinesList } from "./pages/MedicinesList";
import { Footer } from "./components/Footer";
import { MyProfile } from "./pages/MyProfile";
import { ToastContainer } from "react-toastify";
import { UserProvider, useUser } from "./context/UserContext";
import ForgotPassword from "./pages/ForgotPassword";
import { Login } from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

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
        <Route path="/pharmacy" element={<PharmacySelection />} />
        <Route path="/pharmacy/:pharmacyName" element={<MedicinesList />} />
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