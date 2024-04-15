import MenuTextField from "@/components/menuComponents/menufield";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/router";
import React, { useState } from "react";

export const MenuForm = () => {
  const router = useRouter();
  return (
    <div className="w-[100vw] h-[100vh] bg-gray-100 flex ">
      <Sidebar>
        <div className="ml-[8vw] mt-[6vh]">
          <div className="flex flex-row items-center gap-[1vw]">
            <button
              className="h-10 md:h-[4vh] w-10 md:w-[2vw] bg-gray-300 text-black flex justify-center items-center rounded-md cursor-pointer"
              onClick={() => router.back()}
            >
              ←
            </button>
            <h1 className="font-semibold text-black ">Add New Menu Item</h1>
          </div>
          <form>
            <MenuTextField
              input={{
                id: "name",
                label: "Name",
                placeholder: "Rice,.......",
              }}
              value={""}
            />
          </form>
        </div>
      </Sidebar>
    </div>
  );
};

export default MenuForm;
