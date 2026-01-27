import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoc from "../components/Relateddoctor";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();

  const { doctors, currencySymbol, getDoctorsData, token, backendUrl } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  //navigate hook
  const navigate = useNavigate();
  //state for doctor info
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchedDoc = async () => {
    const docInfo = await doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    //getting current date
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      //setting end time of the day with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        // For today
        const currentHour = today.getHours();
        const currentMinute = today.getMinutes();

        if (currentHour >= 21) continue; // Skip if it's past working hours

        currentDate.setHours(currentHour >= 10 ? currentHour + 1 : 10);
        currentDate.setMinutes(currentMinute > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }
      let slots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        
        let day=currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;
        const isSlotAvailable = docInfo.slots_booked[slotDate]&& docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;
     

        if (isSlotAvailable) {
          // add slots to array
        slots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        }
        
        //incrementing times by 30 min
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, slots]);
    }
  };

  //sending appointment data to backend
  const bookAppointment = async () => {
    //if token is  present
    if (!token) {
      toast.warn("Please login to book an appointment");
      return navigate("/login");
    }
    //send data to backend
    try {
      const date = docSlots[slotIndex][0].datetime;
     
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const  slotDate = day + "_" + month + "_" + year;
      console.log(slotDate);
      //send data to backend
      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        {
          docId,
          slotDate,
          slotTime,
        },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred"
      );
    }
  };

  useEffect(() => {
    fetchedDoc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docInfo]);

  return (
    docInfo && (
      <div className="overflow-x-auto">
        {/* ------doctor detail------ */}
        <div className="flex flex-col sm:flex-row gap-4  ">
          <div>
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="bg-primary w-full sm:max-w-72 rounded-lg"
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white  mx-2 mt-[-80px] sm:mx-0 sm:mt-0">
            {/* ------doctor info:name,specialty,description,address------  */}
            <p className="flex item-center gap-2 text-2xl font-medium text-gray-900">
              {" "}
              {docInfo.name}{" "}
              <img
                src={assets.verified_icon}
                alt="verified"
                className="w-5 h-5"
              />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.specialty}
              </p>
              <button className="py-0.5 px-2 border  text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            {/* --------doctor description-------- */}
            <div>
              <p className="flex items-baseline gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600 ">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>
        {/* -------Booking appointment------ */}
        <div className="sm:ml-72 sm:pl-4 font-medium text-gray-700 overflow-scroll">
          <p>Booking slots</p>
          <div className="flex items-center gap-3 overflow-x-scroll mt-4 ">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  className={`text-center py-6 min-w-16  rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : " border border-gray-200"
                  }`}
                  onClick={() => setSlotIndex(index)}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-3 max-w-full overflow-x-auto mt-4 relative group">
            {/* Left Scroll Button */}
            <button
              onClick={() =>
                (document.getElementById("scrollContainer").scrollLeft -= 200)
              }
              className="absolute left-4 z-10 bg-blue-400 text-white p-2 shadow-lg hover:bg-blue-600 transition-all duration-200 ease-in-out opacity-0 group-hover:opacity-100 rounded-full"
            >
              &lt;
            </button>

            <div
              id="scrollContainer"
              className="flex items-center gap-3 overflow-x-auto scroll-smooth"
            >
              {docSlots.length &&
                docSlots[slotIndex].map((item, index) => (
                  <p
                    onClick={() => setSlotTime(item.time)}
                    key={index}
                    className={`text-sm font-semibold flex-shrink-0 cursor-pointer px-6 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 
        ${
          item.time === slotTime
            ? "bg-primary text-white"
            : "border border-gray-300 text-gray-600"
        } 
        ${item.time === slotTime ? "shadow-lg" : ""}`}
                  >
                    {item.time.toLowerCase()}
                  </p>
                ))}
            </div>

            {/* Right Scroll Button */}
            <button
              onClick={() =>
                (document.getElementById("scrollContainer").scrollLeft += 200)
              }
              className="absolute right-4 z-10 bg-blue-400 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200 ease-in-out opacity-0 group-hover:opacity-100 "
            >
              &gt;
            </button>
          </div>
          <button
            className="bg-primary text-white text-sm px-14 py-3  rounded-full mt-10"
            onClick={bookAppointment}
          >
            Book an appointment
          </button>
        </div>
        {/* -------related doctors------ */}
        <RelatedDoc docId={docId} specialty={docInfo.specialty} />
      </div>
    )
  );
};

export default Appointment;
