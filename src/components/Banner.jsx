import { useNavigate } from "react-router"
import { assets } from "../assets/assets"


const Banner = () => {
    const navigate = useNavigate()
  return (
    <div className="flex bg-primary rounded-lg px-6 my-20  sm:px-14 md:mx-10 lg:px-12">
        {/*----left----- */}
        <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl  sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
         <p>Book Appointment</p>
         <p className="mt-4">With 100+ Trusted Doctors</p>
        </div>
        <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className="bg-white text-sm  sm:text-base  text-gray-600 px-8 py-3 rounded-full mt-6  hover:scale-105 transition-all duration-300">Create account</button>
        </div>
        {/*----right----- */}
        <div className="hidden relative md:block md:w-1/2 lg:w-[370px]">
            <img src={assets.appointment_img} alt="" className="w-full absolute bottom-0 md:left-[51.2px]  right-0 max-w-md lg:"  />
        </div>
        </div>
  )
}

export default Banner