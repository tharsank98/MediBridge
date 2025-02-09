// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Doctors } from "./pages/Doctors";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Pharmacy } from "./pages/Pharmacy";
import { Footer } from "./components/Footer";
import { MyProfile } from "./pages/MyProfile";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext";
// import { Login } from "./pages/Login";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };

  return (
    <UserProvider>
      <Router>
        <ToastContainer />
        {/* {isLoggedIn ? (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/pharmacy" element={<Pharmacy />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/myprofile" element={<MyProfile />} />
            </Routes>
            <Footer />
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )} */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/MyProfile" element={<MyProfile />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;

