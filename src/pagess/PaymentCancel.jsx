
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md max-w-lg">
        <h1 className="text-3xl font-bold">Payment Failed</h1>
        <p className="mt-2 text-lg">Oops! Your payment was not successful. Please try again or contact support if needed.</p>
        
        <div className="mt-4 flex gap-4 items-center justify-center">
          <Link 
            to="/my-appointments" 
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            View Appointments
          </Link>
          <Link 
            to="/my-appointments" 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
