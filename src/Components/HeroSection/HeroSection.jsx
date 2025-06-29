
import { FaSearch } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-500 text-white overflow-hidden flex items-center">
  <div className="w-full">
    <div className="max-w-7xl mx-auto px-6 py-16 text-center md:text-left">
      <p className="text-cyan-300 text-lg font-medium mb-2">
        Find Your Next Experience
      </p>
      <h1 className="text-4xl md:text-6xl font-bold leading-tight">
        Discover & Promote <br /> Upcoming Event
      </h1>

      {/* Search Box */}
      <div className="mt-10 flex flex-col md:flex-row bg-white rounded-xl overflow-hidden text-gray-700 shadow-lg w-full md:max-w-5xl ">
        <div className="flex items-center gap-2 p-4 border-b md:border-b-0 md:border-r w-full">
          <input type="text" placeholder="Search Event" className="w-full outline-none" />
        </div>
        <div className="flex items-center gap-2 p-4 border-b md:border-b-0 md:border-r w-full">
          <input type="text" placeholder="Search Location" className="w-full outline-none" />
        </div>
        <div className="flex items-center gap-2 p-4 w-full">
          <input type="text" placeholder="Category" className="w-full outline-none" />
        </div>
        <button className="bg-indigo-600 text-white px-6 py-4 hover:bg-indigo-700">
          <FaSearch />
        </button>
      </div>
    </div>
  </div>

  {/* Right Circles */}
  <div className="absolute right-0 top-0 flex flex-col items-center space-y-4 pr-6 pt-6">
    {/* Images as before */}
  </div>
</section>

  );
};

export default HeroSection;
