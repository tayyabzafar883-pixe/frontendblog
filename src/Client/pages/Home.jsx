import BlogCard from "../Components/BlogCard";
import HeroSection from "../Components/HeroSection";
import SideBar from "../Components/SideBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 mt-24">
      
      <HeroSection />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mt-10 px-4 items-start">

        <SideBar />

        <div className=" md:col-span-3 grid-cols-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <BlogCard />
        </div>

      </div>
    </div>
  );
}

