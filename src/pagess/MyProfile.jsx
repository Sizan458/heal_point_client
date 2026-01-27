import { useContext, useEffect, useState } from "react";

import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";


const MyProfile = () => {
  const{userData,setUserData,token, backendUrl,   loadUserProfileData}=useContext(AppContext)
  //for editing profile
  const [isEditing, setIsEditing] = useState(false);
  const[image,setImage]=useState(false)
  const navigate = useNavigate();
   // Redirect to login if no token
   useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  //edit profile function
  const updateUserProfile = async() => {
   try {
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("phone", userData.phone);
    formData.append("address", JSON.stringify(userData.address));
    formData.append("gender", userData.gender);
    formData.append("dob", userData.dob);
    image && formData.append("image", image);
    //update user profile data in database
    const { data } = await axios.post(backendUrl + "/api/user/update-profile", formData, {
      headers: {
        token,
      },
    });
    if (data.success) {
      toast.success(data.message);
      setIsEditing(false);
      await loadUserProfileData();
      setIsEditing(false);
      setImage(false);
    }
    
   } catch (error) {
    console.log(error);
        toast.error(error.response?.data?.message || "An unexpected error occurred");
   }
  }
  return userData && (
    <div className="max-w-lg flex flex-col gap-4 text-sm ">
      {
        isEditing?
        <label htmlFor="image">
        <div className="inline-block relative cursor-pointer">
        <img src={image?URL.createObjectURL(image):userData.image} alt="" className="w-36 rounded opacity-75"/>
        <img src={image?"":assets.upload_icon} alt="" className="w-10 absolute bottom-12 right-12"/>
        </div>
        <input type="file" id="image" onChange={(e)=>setImage(e.target.files[0])} hidden/>

        </label>
        :  <img src={userData.image} alt="" className="w-36" />
      }
    
      {isEditing ? (
        <input
          type="text"
          onChange={(e) =>
            setUserData((pre) => ({ ...pre, name: e.target.value }))
          }
          value={userData.name}
          className="bg-blue-100 text-3xl font-medium max-w-60 mt-4 outline-primary"
        />
      ) : (
        <p className="text-3xl font-medium text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}
      <hr className="bg-zinc-400 h-[1px] border-none" />
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone:</p>
          {isEditing ? (
            <input
              type="text"
              onChange={(e) =>
                setUserData((pre) => ({ ...pre, phone: e.target.value }))
              }
              value={userData.phone}
              className="outline-primary bg-blue-100 max-w-52"
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}
          <p className="font-medium">Address:</p>
          {isEditing ? (
            <p>
              <input
                type="text"
                onChange={(e) =>
                  setUserData((prv) => ({
                    ...prv,
                    address: { ...prv.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line1}
                className="outline-primary bg-blue-100 max-w-52"
              />
              <br />
              <input
                type="text"
                onChange={(e) =>
                  setUserData((prv) => ({
                    ...prv,
                    address: { ...prv.address, line2: e.target.value },
                  }))
                }
                value={userData.address.line2}
                className="outline-primary bg-blue-100 max-w-52"
              />
            </p>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1} <br /> {userData.address.line2}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender :</p>
          {isEditing ? (
            <select
              onChange={(e) =>
                setUserData((pre) => ({ ...pre, gender: e.target.value }))
              }
              value={userData.gender}
              className="outline-primary bg-blue-100 max-w-20"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          ) : (
            <p className="text-gray-600">{userData.gender}</p>
          )}
          <p className="font-medium">Birthday:</p>
          {isEditing ? (
            <input
              type="date"
              onChange={(e) =>
                setUserData((pre) => ({ ...pre, dob: e.target.value }))
              }
              value={userData.dob}
              className="outline-primary bg-blue-100 max-w-28"
            />
          ) : (
            <p className="text-gray-600">{userData.dob}</p>
          )}
        </div>
      </div>
      <div className="mt-10">
        {isEditing ? (
          <button
            onClick={updateUserProfile}
            className="border border-primary px-8 py-2  rounded-full hover:bg-primary hover:text-white transition-all "
          >
            Save Profile
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="border border-primary px-8 py-2  rounded-full hover:bg-primary hover:text-white transition-all "
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
