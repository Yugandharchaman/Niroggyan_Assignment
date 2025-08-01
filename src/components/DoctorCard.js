import React from "react";
import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white border border-blue-500 rounded-lg shadow-lg p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-blue-400"
      />
      <h2 className="text-lg font-semibold">{doctor.name}</h2>
      <p className="text-gray-600">{doctor.specialization}</p>
      <p
        className={`mt-2 font-medium ${
          doctor.available ? "text-green-500" : "text-red-500"
        }`}
      >
        {doctor.available ? "Available" : "Not Available"}
      </p>
      <Link
        to={`/doctor/${doctor.id}`}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-200"
      >
        View Profile
      </Link>
    </div>
  );
};

export default DoctorCard;
