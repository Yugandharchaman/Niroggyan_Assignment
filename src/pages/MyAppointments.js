import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { TrashIcon } from "@heroicons/react/24/solid";

const MyAppointments = () => {
  const { appointments, setAppointments } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      const savedAppointments = JSON.parse(localStorage.getItem("appointments"));
      if (savedAppointments) {
        setAppointments(savedAppointments);
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setAppointments]);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const deleteAppointment = (index) => {
    const updated = appointments.filter((_, i) => i !== index);
    setAppointments(updated);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">My Appointments</h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <span className="loading-dots">
            <span className="dot bg-blue-500"></span>
            <span className="dot bg-blue-500"></span>
            <span className="dot bg-blue-500"></span>
          </span>
        </div>
      ) : appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <img
            src="/images/NoAppointements.jpg"
            alt="No appointments"
            className="w-64 h-64 object-contain mb-4"
          />
          <p className="text-gray-500 text-lg">No appointments booked yet.</p>
        </div>
      ) : (

        <div className="grid gap-4 md:grid-cols-2">
          <AnimatePresence>
            {appointments.map((appt, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg rounded-lg p-4 border-l-4 border-blue-500 relative"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => deleteAppointment(index)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>

                <h2 className="text-lg font-bold text-blue-700">
                  {appt.doctorName}
                </h2>
                <p className="text-gray-600">Patient: {appt.patientName}</p>
                <p className="text-gray-600">Email: {appt.email}</p>
                <p className="text-gray-600">
                  Date: <span className="font-semibold">{appt.date}</span>
                </p>
                <p className="text-gray-600">
                  Time: <span className="font-semibold">{appt.time}</span>
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
