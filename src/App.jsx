import { Route,  Routes } from "react-router";
import Home from "./pagess/Home";
import Doctors from "./pagess/Doctors.jsx";
import Login from "./pagess/Login.jsx";
import About from "./pagess/About.jsx";
import Contact from "./pagess/Contact.jsx";
import MyProfile from "./pagess/MyProfile.jsx";
import MyAppointment from "./pagess/MyAppointment.jsx";
import Appointment from "./pagess/Appointment.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import AppointmentSuccess from "./pagess/AppointmentSuccess.jsx";
import PaymentCancel from "./pagess/PaymentCancel.jsx";
import ErrorPage from "./pagess/ErrorPage.jsx";



const App = () => {
  return <div className="mx-4 sm:mx-[10%]">
      <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/doctors" element={<Doctors/>} />
      <Route path="/doctors/:specialty" element={<Doctors/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/my-profile" element={<MyProfile/>} />
      <Route path="/my-appointments" element={<MyAppointment/>} /> 
      <Route path="/appointment/:docId" element={<Appointment/>} />
      <Route path="/payment-success" element={<AppointmentSuccess/>} />
      <Route path="/payment-cancel" element={<PaymentCancel/>} />
     
     
       {/* Catch-all 404 Route */}
       <Route path="*" element={<ErrorPage />} />
    </Routes>
    <Footer/>
    </div>;
};

export default App;
