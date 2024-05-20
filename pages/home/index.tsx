import { useRouter } from "next/router";
import React from "react";
import { Irish_Grover, Itim } from 'next/font/google'

const irish_grover = Irish_Grover({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-irish-grover',
  weight: "400"
})
const itim = Itim({
  weight: "400",
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-itim',

})
const HomePage = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-200 h-screen w-screen">
      <div className="h-full overflow-auto">
        <nav className="bg-[#DD2F6E] sm:px-10 md:px-20 py-6 sm:py-8 lg:py-10 flex justify-between shadow-lg h-[10vh] flex-row items-center">
          <div className="max-w-xs mx-auto relative flex items-center">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full py-2 pl-20 pr-20 border border-gray-300 rounded-md bg-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => router.push("/auth/login")}
          >
            <h1 className="text-white">
              Register or Login as a<br />
              VENDOR →
            </h1>
          </div>
        </nav>
        <h1 className="text-black">Available Restaurants in Cotonou</h1>
        <div className="flex flex-col bg-white rounded-md h-[25vh] w-[15vw] ml-5">
          <img
            src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
            alt=""
            className="h-[12vh] rounded-tl-md rounded-tr-md object-cover"
          />
          <h3 className={`${itim.variable}`}>RICE, BEANS TYPE mIX</h3>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
