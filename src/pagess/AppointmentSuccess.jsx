

import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const  AppointmentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
    const { backendUrl, token } = useContext(AppContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get("session_id");

    if (sessionId) {
      verifyPayment(sessionId);
    } else {
      toast.error("Invalid session ID");
      navigate("/my-appointments"); // Redirect to appointments page if no session ID
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, navigate]);

  const verifyPayment = async (sessionId) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/verify-stripe-payment?session_id=${sessionId}`,
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Payment verified successfully!");
        navigate("/my-appointments"); // Redirect to appointments page after verification
      } else {
        toast.error("Payment verification failed.");
        navigate("/my-appointments");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An unexpected error occurred");
      navigate("/my-appointments");
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
    <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-md max-w-lg">
      <svg className="w-16 h-16 text-green-500 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
      <h1 className="text-3xl font-bold">Payment Successful 🎉</h1>
      <p className="mt-2 text-lg">Verifying your payment...</p>
    </div>
  </div>
  
  );
};

export default AppointmentSuccess;