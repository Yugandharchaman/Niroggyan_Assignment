import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DoctorsProfile from "./pages/DoctorsProfile";
import MyAppointments from "./pages/MyAppointments";
import Navbar from "./components/Navbar";
import { AppProvider } from "./context/AppContext";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto mt-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctor/:id" element={<DoctorsProfile />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
