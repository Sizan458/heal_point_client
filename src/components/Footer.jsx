import { NavLink } from "react-router";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* ---- Left Section ----- */}
        <div>
          <img src={assets.logo} alt="logo" className="mb-5 w-40" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
           Our Doctor Appointment System is designed to simplify healthcare access by allowing patients to book, manage, and track their appointments online. With an easy-to-use interface, patients can search for doctors by specialty, view availability, and schedule visits at their convenience. The system also provides secure online payment, appointment cancellation, and real-time updates, ensuring a smooth and reliable healthcare experience for both patients and doctors.
          </p>
        </div>

        {/* ---- Center Section (Company Links) ----- */}
        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <NavLink to="/" className="hover:text-primary hover:underline cursor-pointer">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-primary hover:underline cursor-pointer">
                About us
              </NavLink>
            </li>
            <li>
              <NavLink to="/privacy-policy" className="hover:text-primary hover:underline cursor-pointer">
                Privacy policy
              </NavLink>
            </li>
          </ul>
        </div>

        {/* ---- Right Section (Contact Info) ----- */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+19708072822</li>
            <li>lejat54958@amcret.com</li>
          </ul>
        </div>
      </div>

      {/* ---- Footer Copyright Section ----- */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025 @ Sizan.dev - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
