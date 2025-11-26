import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-20 px-4 text-center rounded-b-3xl shadow-lg">
        <h1 className="text-5xl font-bold mb-4">Welcome to MyBLOG</h1>
        <p className="text-lg max-w-xl mx-auto">
          Discover, read, and share amazing blogs created by passionate writers.
          Join our community and start your blogging journey today!
        </p>
        <div className="mt-8 flex justify-center">
          <p
          
            className= " w-fit bg-white text-purple-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            Get Started
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose MyBLOG?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition transform duration-300">
            <h3 className="text-xl font-semibold mb-4">Easy to Use</h3>
            <p>
              Our simple and intuitive interface allows you to create and manage blogs effortlessly.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition transform duration-300">
            <h3 className="text-xl font-semibold mb-4">Community Driven</h3>
            <p>
              Connect with writers and readers from around the world, and share your thoughts freely.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition transform duration-300">
            <h3 className="text-xl font-semibold mb-4">Responsive & Modern</h3>
            <p>
              Our platform looks beautiful on all devices, from desktop to mobile, providing seamless experience.
            </p>
          </div>
        </div>
      </section>

      {/* Creator Section */}
      <section className="bg-purple-50 py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Meet the Creator</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:shadow-xl transition duration-300">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Creator"
              className="w-32 h-32 rounded-full mb-4 shadow-md"
            />
            <h3 className="text-xl font-semibold mb-2">Tayyab Malik</h3>
            <p className="text-gray-600 text-center">
              A passionate developer & blogger building modern web applications with love and dedication.
            </p>
            <div className="flex gap-4 mt-4">
              <p
                href="https://github.com"
                target="_blank"
                className="text-gray-500 hover:text-gray-900 transition"
              >
                GitHub
              </p>
              <p
                href="https://linkedin.com"
                target="_blank"
                className="text-gray-500 hover:text-gray-900 transition"
              >
                LinkedIn
              </p>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default AboutPage;
