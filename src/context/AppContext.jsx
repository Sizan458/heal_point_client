/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";


 export const AppContext = createContext(null);

 const AppContextProvider = (props) => {
    //doctors state
    const [doctors, setDoctors] = useState([]);
    //token state
    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false);
    //update profile state
    const [userData, setUserData] = useState(false);
// currency symbol
  const currencySymbol = '৳';
  //get backend url
   const backendUrl = import.meta.env.VITE_BACKEND_URL;
   
   //get all doctors
   const getDoctorsData = async () => {
       try {
        const { data } = await axios.get(backendUrl + '/api/doctor/list');
        if(data.success){
            setDoctors(data.data);
        }
       } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "An unexpected error occurred");
       }
   }
  //load user data
  const loadUserProfileData = async () => {
      try {
       const { data } = await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}});
       if(data.success){
        setUserData(data.data);

       } 
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "An unexpected error occurred");
      }
  }
  //get all doctors
   useEffect(() => {
       getDoctorsData();
   })

//get user profile data
useEffect(() => {
  if(token){
    loadUserProfileData();
  }else{
    setUserData(false);
  }  
// eslint-disable-next-line react-hooks/exhaustive-deps
},[token])
   const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData
    
}
   return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
   )
 }

 export default AppContextProvider

 