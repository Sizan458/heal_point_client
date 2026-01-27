/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const navigate = useNavigate();
  const { specialty } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const applyFilter = () => {
    if (specialty) {
      const filteredDoc = doctors.filter((doc) => doc.specialty === specialty);
      setFilterDoc(filteredDoc);
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, specialty]);
  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5 ">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-1 px-3 border rounded text-sm  transition-all duration-300 sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          } `}
        >
          Filters
        </button>
        <div
          className={` flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() =>
              specialty === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded  transition-all cursor-pointer  duration-300 ${
              specialty === "General physician"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              specialty === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded  transition-all cursor-pointer ${
              specialty === "Gynecologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              specialty === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded  transition-all cursor-pointer ${
              specialty === "Dermatologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              specialty === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded  transition-all cursor-pointer ${
              specialty === "Pediatricians" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              specialty === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded  transition-all cursor-pointer ${
              specialty === "Neurologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              specialty === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded  transition-all cursor-pointer ${
              specialty === "Gastroenterologist"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            Gastroenterologist
          </p>
        </div>
        <div className="w-full grid  grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4  gap-y-6">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              className=" border border-blue-200 rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500"
              onClick={() => navigate(`/appointment/${item._id}`)}
            >
              <img src={item.image} alt={item.name} className="bg-blue-50" />
              <div className="p-4">
              <div className={`flex items-center gap-2 text-center text-sm ${item.available ? "text-green-500" : "text-gray-500"} `}>
                <p className={`w-2 h-2 ${item.available ? "bg-green-500 " : "bg-gray-500"} rounded-full`}></p>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
