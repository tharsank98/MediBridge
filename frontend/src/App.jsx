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
import ProtectedRoute from "./components/ProtectedRoute";
import { DoctorConsult } from "./pages/Doctor_Consult";
import { MedicineOrder } from "./pages/Medicine_Order";
import { ViewDoctor } from "./pages/View_Doctor";
// import { View_Pharmacy } from "./pages/View_Pharmacy";
// import { Registration } from "./pages/Registration";
// import { Login } from "./pages/Login";

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
        <Route path="/doctor" element={<ProtectedRoute element={<Doctors />} />} />
        <Route path="/doctor_consult" element={<ProtectedRoute element={<DoctorConsult />} />} />
        <Route path="/doctor/:doctorName" element={<ViewDoctor />} />
        <Route path="/pharmacy" element={<ProtectedRoute element={<Pharmacy />} />} />
        {/* <Route path="/view_pharmacy/:pharmacyName" component={View_Pharmacy} /> */}
        <Route path="/order/:medicineName" element={<MedicineOrder />} />
        <Route path="/contact" element={<ProtectedRoute element={<Contact />} />} />
        <Route path="/myprofile" element={<ProtectedRoute element={<MyProfile />} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} /> */}
      </Routes>
      {user && <Footer />}
    </>
  );
};

export default App;
