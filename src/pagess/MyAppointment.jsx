import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";

const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [myAppointments, setMyAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // 🔹 Search state
  const [currentPage, setCurrentPage] = useState(1); // 🔹 Pagination state
  const appointmentsPerPage = 5; // 🔹 Change how many per page
  const navigate = useNavigate();

  // Format date
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  // Fetch appointments
  const getMyAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } });
      if (data.success) {
        setMyAppointments(data.data.reverse());
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred");
    }
  };

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getMyAppointments();
        getDoctorsData();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An unexpected error occurred");
    }
  };

  // Handle online payment
  const OnlinePayment = async (appointmentId) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/stripe-payment`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success && data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        toast.error("Failed to initiate payment.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getMyAppointments();
    } else {
      navigate("/login");
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  // 🔹 Filter appointments by search term
  const filteredAppointments = myAppointments.filter((doc) => {
    const search = searchTerm.toLowerCase();
    return (
      doc.docData.name.toLowerCase().includes(search) ||
      doc.docData.specialty.toLowerCase().includes(search) ||
      slotDateFormat(doc.slotDate).toLowerCase().includes(search)
    );
  });

  // 🔹 Pagination logic
  const indexOfLast = currentPage * appointmentsPerPage;
  const indexOfFirst = indexOfLast - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  return (
    token && (
      <div>
        <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointments</p>

        {/* 🔹 Search Box */}
        <input
          type="text"
          placeholder="Search by doctor, specialty or date..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset page when searching
          }}
          className="w-full p-2 border rounded mb-4"
        />

        {/* 🔹 Appointments List */}
        <div>
          {currentAppointments.length > 0 ? (
            currentAppointments.map((doc, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-400"
              >
                <div>
                  <img src={doc.docData.image} alt="" className="w-32 bg-indigo-50" />
                </div>
                <div className="flex-1 text-sm text-zinc-600">
                  <p className="text-neutral-700 font-semibold">{doc.docData.name}</p>
                  <p>{doc.docData.specialty}</p>
                  <p className="text-zinc-800 font-medium mt-1">Address:</p>
                  <p className="text-xs">{doc.docData.address.line1}</p>
                  <p className="text-xs">{doc.docData.address.line2}</p>
                  <p className="text-xs mt-1">
                    <span className="text-sm text-neutral-700 font-medium">Date & Time:</span>
                    {slotDateFormat(doc.slotDate)} | {doc.slotTime}
                  </p>
                </div>
                <div className="flex flex-col gap-2 justify-end">
                  {!doc.cancelled && doc.payment && !doc.isCompleted && (
                    <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 bg-indigo-50 border rounded border-green-500">
                      Paid
                    </button>
                  )}
                  {!doc.cancelled && !doc.payment && !doc.isCompleted && (
                    <button
                      disabled={isLoading}
                      onClick={() => OnlinePayment(doc._id)}
                      className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      Pay Online
                    </button>
                  )}
                  {!doc.cancelled && !doc.isCompleted && (
                    <button
                      onClick={() => cancelAppointment(doc._id)}
                      className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      Cancel appointment
                    </button>
                  )}
                  {doc.cancelled && !doc.isCompleted && (
                    <button className="text-sm text-red-500 text-center sm:min-w-48 py-2 border rounded border-red-500">
                      Appointment cancelled
                    </button>
                  )}
                  {doc.isCompleted && (
                    <button className="text-sm text-green-500 text-center sm:min-w-48 py-2 border rounded border-green-500">
                      Completed
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-6">No appointments found</p>
          )}
        </div>

        {/* 🔹 Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-primary text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default MyAppointment;
