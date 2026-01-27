/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "../context/AppContext";

const specialtiesList = [
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

const Doctors = () => {
  const navigate = useNavigate();
  const { specialty } = useParams();
  const { doctors, getDoctorsData } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch doctors on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      await getDoctorsData();
      setLoading(false);
    };
    fetchDoctors();
  }, []);

  // Apply filter whenever doctors or specialty changes
  useEffect(() => {
    if (!doctors || doctors.length === 0) {
      setFilterDoc([]);
      return;
    }
    if (specialty) {
      setFilterDoc(doctors.filter((doc) => doc.specialty === specialty));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, specialty]);

  // Navigate based on selected specialty
  const handleSpecialtyClick = (spec) => {
    navigate(spec === specialty ? "/doctors" : `/doctors/${spec}`);
  };

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Filter Button for Mobile */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-1 px-3 border rounded text-sm transition-all duration-300 sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
        >
          Filters
        </button>

        {/* Filter Sidebar */}
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          {specialtiesList.map((spec) => (
            <p
              key={spec}
              onClick={() => handleSpecialtyClick(spec)}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-300 ${
                specialty === spec ? "bg-indigo-100 text-black" : ""
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctors Grid */}
        {loading ? (
          <p className="text-gray-500 mt-4">Loading doctors...</p>
        ) : filterDoc.length === 0 ? (
          <p className="text-gray-500 mt-4">No doctors found for this specialty.</p>
        ) : (
          <div className="w-full grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 gap-y-6">
            {filterDoc.map((item) => (
              <div
                key={item._id}
                className="border border-blue-200 rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                onClick={() => navigate(`/appointment/${item._id}`)}
              >
                <img
                  src={item.image || "/default-doctor.png"}
                  alt={item.name}
                  className="bg-blue-50 w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div
                    className={`flex items-center gap-2 text-center text-sm ${
                      item.available ? "text-green-500" : "text-gray-500"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.available ? "bg-green-500" : "bg-gray-500"
                      }`}
                    ></span>
                    <p>{item.available ? "Available" : "Not Available"}</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                  <p className="text-gray-600 text-sm">{item.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
