import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router";


const Login = () => {
  //state for register or login
  const [state, setState] = useState("Sign Up");
  //login state from
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  //login backend function state
  const { token, setToken, backendUrl } = useContext(AppContext);
  //navigate hook
  const navigate = useNavigate();


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl+'/api/user/register', {
          name,
          email,
          password,
        })

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success(data.message);
          setState("Login");
        }
          
        
      }else {
        const { data } = await axios.post(backendUrl+'/api/user/login', {
          email,
          password,
        })

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred");
    }
  };
  useEffect(() => {
   if(token){
     navigate('/');
   }
  }, [token,navigate])
  
  return (
    <form
      action=""
      onSubmit={onSubmit}
      className="min-h-[80vh] flex items-center"
    >
      <div className="flex flex-col gap-3  m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-900 text-sm shadow-xl border-primary">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "login"} to book appointment
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full border border-zinc-300 outline-primary p-2 mt-1"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full border border-zinc-300 outline-primary p-2 mt-1"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full border border-zinc-300 outline-primary p-2 mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white  w-full py-2 rounded-md text-base"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login here{" "}
            </span>
          </p>
        ) : (
          <p>
            Don&apos;t have an account?
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
