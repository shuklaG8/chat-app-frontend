import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    profilePhoto: "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, profilePhoto: reader.result }));
      };
    }
  };

  const navigate = useNavigate();

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success(res.data.message);
        navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
      profilePhoto: "",
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-8 py-2 rounded-2xl border border-pink-500/20 bg-[#1b0b2e]/70 backdrop-blur-xl shadow-[0_0_40px_rgba(236,72,153,0.15)]">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Signup
        </h1>

        <form onSubmit={onSubmitHandler}>
          <div className="mb-5">
            <label className="block text-pink-100 mb-2 font-medium">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={user.fullName}
              onChange={(e) =>
                setUser({ ...user, fullName: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-[#2b1646]/80 border border-pink-400/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition"
            />
          </div>

          <div className="mb-5">
            <label className="block text-pink-100 mb-2 font-medium">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={user.username}
              onChange={(e) =>
                setUser({ ...user, username: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-[#2b1646]/80 border border-pink-400/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition"
            />
          </div>

          <div className="mb-5">
            <label className="block text-pink-100 mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-[#2b1646]/80 border border-pink-400/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition"
            />
          </div>

          <div className="mb-5">
            <label className="block text-pink-100 mb-2 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-[#2b1646]/80 border border-pink-400/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition"
            />
          </div>

          <div className="flex gap-6 mb-6 text-pink-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                className="accent-pink-500"
              />
              Male
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                className="accent-pink-500"
              />
              Female
            </label>
          </div>

          <div className="mb-5">
            <label className="block text-pink-100 mb-2 font-medium">
              Profile Photo <span className="text-sm font-normal text-pink-200/50">(Optional)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-pink-100 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-pink-600 file:text-white hover:file:bg-pink-700 transition cursor-pointer border border-pink-400/20 bg-[#2b1646]/80 rounded-xl"
            />
          </div>

          <p className="text-center text-gray-300 mb-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-400 hover:text-pink-300 hover:underline"
            >
              Login
            </Link>
          </p>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-linear-to-r from-pink-600 via-fuchsia-600 to-purple-700 text-white font-semibold hover:scale-[1.02] transition duration-200 shadow-lg shadow-pink-500/20 cursor-pointer"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;