import React, { useState, useEffect } from "react";
import doctorsData from "../data/doctorsData";
import DoctorCard from "../components/DoctorCard";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [search, setSearch] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const results = doctorsData.filter((doctor) =>
        doctor.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredDoctors(results);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="pt-15 px-4 md:px-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-center md:text-left">
          Find a Doctor 🔎
        </h1>
        <div className="w-full md:w-1/3">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <span className="loading-dots">
            <span className="dot bg-blue-500"></span>
            <span className="dot bg-blue-500"></span>
            <span className="dot bg-blue-500"></span>
          </span>
        </div>
      ) : filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-10 text-center">
          <img
            src="/images/no-doctor.jpg"
            alt="No doctors found"
            className="w-48 h-48 sm:w-64 sm:h-64 object-contain mb-4"
          />
          <p className="text-gray-500 text-base sm:text-lg">
            No doctors found matching your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
