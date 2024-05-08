import { useRouter } from "next/router";
import React from "react";

const HomePage = () => {
  const router = useRouter();
  return (
    <div>
      <nav className="bg-[#DD2F6E] sm:px-10 md:px-20 py-6 sm:py-8 lg:py-10 flex justify-between shadow-lg h-[10vh]">
        <div className="flex flex-row items-center justify-stretch">
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
              className="block w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md bg-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div onClick={() => router.push("/auth/login")}>
            <h1 className="text-white">
              Register or Login as a<br />
              VENDOR →
            </h1>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HomePage;
