import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      navigate("/");
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: ""
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-2xl border border-pink-500/20 bg-[#1b0b2e]/70 backdrop-blur-xl shadow-[0_0_40px_rgba(236,72,153,0.15)]">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Login
        </h1>

        <form onSubmit={onSubmitHandler} action="">
          <div className="mb-5">
            <label className="block text-pink-100 mb-2 font-medium">
              Username
            </label>

            <input
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-xl bg-[#2b1646]/80 border border-pink-400/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-pink-100 mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-[#2b1646]/80 border border-pink-400/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition"
            />
          </div>

          <p className="text-center text-gray-300 mb-5">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-pink-400 hover:text-pink-300 hover:underline"
            >
              Signup
            </Link>
          </p>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-linear-to-r from-pink-600 via-fuchsia-600 to-purple-700 text-white font-semibold hover:scale-[1.02] transition duration-200 shadow-lg shadow-pink-500/20 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;