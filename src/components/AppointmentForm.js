import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const AppointmentForm = ({ doctorName, onSuccess }) => {
  const { addAppointment } = useContext(AppContext);

  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!patientName || !email || !date || !time) {
      alert("Please fill in all fields.");
      return;
    }
    
    const newAppointment = {
      doctorName,
      patientName,
      email,
      date,
      time,
      id: Date.now(),
    };

    addAppointment(newAppointment);
    if (onSuccess) {
      onSuccess();
    }
    setPatientName("");
    setEmail("");
    setDate("");
    setTime("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 mt-6"
    >
      <h2 className="text-xl font-bold mb-4 text-blue-600">
        Confirm Appointment
      </h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Patient Name</label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Confirm Appointment
      </button>
    </form>
  );
};

export default AppointmentForm;
