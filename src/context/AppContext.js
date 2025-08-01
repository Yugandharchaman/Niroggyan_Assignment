import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const savedAppointments = JSON.parse(localStorage.getItem("appointments"));
    if (savedAppointments) {
      setAppointments(savedAppointments);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  const hasAppointmentForDoctor = (doctorName) => {
    return appointments.some((appt) => appt.doctorName === doctorName);
  };

  return (
    <AppContext.Provider
      value={{ appointments, addAppointment, setAppointments, hasAppointmentForDoctor }}
    >
      {children}
    </AppContext.Provider>
  );
};
