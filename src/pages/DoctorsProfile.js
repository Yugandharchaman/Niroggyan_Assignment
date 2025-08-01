import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import doctors from "../data/doctorsData";
import AppointmentForm from "../components/AppointmentForm";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const DoctorProfile = () => {
  const { id } = useParams();
  const { hasAppointmentForDoctor } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [appointmentJustBooked, setAppointmentJustBooked] = useState(false);

  const doctor = doctors.find((doc) => doc.id === parseInt(id));

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!doctor) {
    return <p className="text-center text-red-500 mt-10">Doctor not found</p>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const alreadyBooked = hasAppointmentForDoctor(doctor.name);
  const handleAppointmentSuccess = () => {
    setShowSuccessPopup(true);
    setAppointmentJustBooked(true);
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="border-2 border-gray-200 bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-40 h-40 object-cover rounded-full shadow-lg"
        />
        <div>
          <h1 className="text-2xl font-bold text-blue-600">{doctor.name}</h1>
          <p className="text-lg text-gray-700">{doctor.specialization}</p>
          <p
            className={`mt-2 font-medium ${
              doctor.available ? "text-green-500" : "text-red-500"
            }`}
          >
            {doctor.available ? "Available" : "Not Available"}
          </p>
          <p className="mt-2 text-gray-600">
            <strong>Experience:</strong> {doctor.experience}
          </p>
          <p className="mt-2 text-gray-600">
            <strong>About:</strong> {doctor.about}
          </p>
          <p className="mt-2 text-gray-600">
            <strong>Contact:</strong> {doctor.contact}
          </p>
        </div>
      </div>
      {doctor.available && !alreadyBooked && !appointmentJustBooked && (
        <div className="mt-8">
          <AppointmentForm
            doctorName={doctor.name}
            onSuccess={handleAppointmentSuccess}
          />
        </div>
      )}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold text-green-600">
                Appointment Confirmed!
              </h2>
              <p className="text-gray-600 mt-2">
                Your appointment has been booked successfully.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {(alreadyBooked || appointmentJustBooked) && !showSuccessPopup && (
        <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded">
          You have booked an appointment with this doctor.
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
