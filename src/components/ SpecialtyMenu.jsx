import { Link } from "react-router"
import {specialtyData } from "../assets/assets"

const SpecialtyMenu = () => {
  return (
    <div id="specialty" className="flex flex-col  items-center gap-4 py-16 text-gray-800">
       <h1 className="text-3xl font-medium">Find by Specialty
       </h1>
       <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
       <div className="flex sm:justify-center gap-4 pt-5 w-full  overflow-scroll ">
        {specialtyData.map((item, index) => (
          <Link onClick={()=>scrollTo(0,0)} to={`/doctors/${item.specialty}`} key={index} className=" flex flex-col items-center text-xs  cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500">
            <img src={item.image} alt={item.specialty} className="w-16 sm:w-24 mb-2"/>
            <p>{item.specialty}</p>
          </Link>
        ))}
       </div>
      </div>
  )
}

export default SpecialtyMenu