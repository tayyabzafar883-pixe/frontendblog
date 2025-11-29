import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../Context.jsx/Contextt";
import { toast } from "react-toastify";

export default function Nav() {
  const navigate = useNavigate();
  const { setUser, userData, setData } = useContext(Context);

  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [showProfileDesktop, setShowProfileDesktop] = useState(false); // desktop dropdown
  const [showProfileMobile, setShowProfileMobile] = useState(false); // mobile dropdown

  // logout function
  const logout = async () => {
    try {
      let resp = await fetch("http://localhost:3000/user/logout", {
        credentials: "include",
      });
      let jresp = await resp.json();
      if (jresp.success) {
        navigate("/login");
      } else {
        toast.error(jresp.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // upload image function
  const uploadimg = async (e) => {
    try {
      let formdata = new FormData();
      formdata.append("blog", e.target.files[0]);
      let resp = await fetch("http://localhost:3000/user/userImg", {
        method: "PUT",
        credentials: "include",
        body: formdata,
      });
      let jresp = await resp.json();
      if (jresp.success) {
        setData({ img: jresp.userImg.img, name: jresp.userImg.name });
        setShowProfileDesktop(false);
        setShowProfileMobile(false);
      } else if (jresp.message === "invalid") {
        navigate("/login");
      } else {
        toast.error(jresp.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <nav className="bg-white text-black px-6 py-4 shadow-md fixed top-0 w-full z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to={"/home"}>
          <h1 className="text-2xl font-bold">MyBLOG</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/home" className="hover:text-gray-600">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-600">
            About
          </Link>

          {/* Desktop Profile Dropdown */}
          <div className="relative">
            {userData.img ? (
              <img
                onClick={() => setShowProfileDesktop(!showProfileDesktop)}
                className="w-8 h-8 rounded-full cursor-pointer"
                src={userData.img}
                alt="Profile"
              />
            ) : (
              <p
                onClick={() => setShowProfileDesktop(!showProfileDesktop)}
                className="w-8 h-8 rounded-full cursor-pointer text-center bg-amber-300"
              >
                {userData.name.slice(0, 1)}
              </p>
            )}

            {showProfileDesktop && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md flex flex-col text-sm">
                <Link
                  onClick={() => setShowProfileDesktop(false)}
                  to="/user"
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  User Blog
                </Link>
                <button
                  onClick={logout}
                  className="text-left px-4 py-2 hover:bg-gray-100 w-full"
                >
                  Logout
                </button>
                <label
                  className="text-left px-4 py-2 hover:bg-gray-100 w-full"
                  htmlFor="desktopImg"
                >
                  Update Profile
                </label>
                <input
                  onChange={uploadimg}
                  id="desktopImg"
                  className="hidden"
                  type="file"
                />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-2 px-2 pb-4 border-t border-gray-200">
          <Link
            to="/home"
            onClick={() => setIsOpen(false)}
            className="hover:text-gray-600"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="hover:text-gray-600"
          >
            About
          </Link>

          {/* Mobile Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMobile(!showProfileMobile)}
              className="flex items-center space-x-2"
            >
              {userData.img ? (
                <img
                  className="w-8 h-8 rounded-full"
                  src={userData.img}
                  alt="Profile"
                />
              ) : (
                <p className="w-8 h-8 rounded-full text-center bg-amber-300">
                  {userData.name.slice(0, 1)}
                </p>
              )}
              <span className="text-sm">Profile</span>
            </button>

            {showProfileMobile && (
              <div className="mt-2 w-full bg-white shadow-lg rounded-md flex flex-col text-sm">
                <Link
                  onClick={() => {
                    setShowProfileMobile(false);
                    setIsOpen(false);
                  }}
                  to="/user"
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  User Blog
                </Link>
                <button
                  onClick={logout}
                  className="text-left px-4 py-2 hover:bg-gray-100 w-full"
                >
                  Logout
                </button>
                <label
                  className="text-left px-4 py-2 hover:bg-gray-100 w-full"
                  htmlFor="mobileImg"
                >
                  Update Profile
                </label>
                <input
                  onChange={uploadimg}
                  id="mobileImg"
                  className="hidden"
                  type="file"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
