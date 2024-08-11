import React, { useEffect, useState } from "react";
import { clearAllUserErrors, login } from "../store/slices/userSlice";
import { useDispatch,useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("role",role)
    data.append("email",email)
    data.append("password",password)
    dispatch(login(data))
  };

  useEffect(() => {
    if(isAuthenticated)
    {
      navigate("/")
    }
    if(error){
        toast.error(error,{
          position:"bottom-right",
          autoClose:1000
        })
        dispatch(clearAllUserErrors())
    }
  }, [isAuthenticated,dispatch,error,message])
  

  return (
    <div className="mt-14 min-h-[92vh] flex flex-col justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-100 shadow-lg">
        <h2 className="text-3xl text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="role" className="block text-sm">
              Role:
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full block p-2 border bg-white border-gray-300 rounded-md"
            >
              <option value="">Select Role</option>
              <option value="Employer">Employer</option>
              <option value="Job Seeker">Job Seeker</option>
            </select>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full block p-2 border bg-white border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full block p-2 border bg-white border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-primary rounded-md hover:bg-black hover:text-white hover:transition-colors"
          >
            Login
          </button>
          <button
            type="submit"
            onClick={()=>navigate("/register")}
            className="w-full px-4 py-2  text-primary border-primary border-[2px] rounded-md hover:bg-black hover:text-white hover:transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
