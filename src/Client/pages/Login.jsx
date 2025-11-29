import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../Context.jsx/Contextt";
import { toast } from "react-toastify";

export default function Login() {
  let { setUser, setData } = useContext(Context);
  let navi = useNavigate();

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [error, setError] = useState({});
  let [message, setMessage] = useState('');

  let submit = async (e) => {
    e.preventDefault();
    let errorObj = {};
    if (email === '') {
      errorObj.email = 'Please fill this field first';
    }
    if (password === '') {
      errorObj.password = 'Please fill this field first';
    }
    setError(errorObj);

    if (Object.keys(errorObj).length === 0) {
      try {
        let resp = await fetch(` https://blog-backend-6kdu.vercel.app/user/login`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ email, password })
        });

        let jresp = await resp.json();
        console.log(jresp);

        if (!jresp.success) {
          setMessage(jresp.message);
        } else {
          navi('/home');
          setUser(jresp.email);
          setData({ img: jresp.img, name: jresp.name, idd: jresp.id });
          console.log(jresp.id, 'login id');
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur-md w-full max-w-md rounded-2xl shadow-2xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-red-500">{error.email}</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-red-500">{error.password}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg shadow-lg transition duration-300"
          >
            Login
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <p className="text-center text-red-500">{message}</p>

        {/* Signup Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <Link className="text-purple-600 font-medium hover:underline" to={'/'}>
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
