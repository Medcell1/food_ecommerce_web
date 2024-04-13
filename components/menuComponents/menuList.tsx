import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../sidebar";
import { Nav } from "./nav";
import SearchBar from "../searchbar";
import MenuTile from "./menutile";
import { useRouter } from "next/router";
import MenuFormModal, { Menu } from "./menuFormModal";
import createAxiosInstance from "@/axiosConfig";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import { Toast } from "@/constants/toastConfig";

const MenuList = () => {
  const router = useRouter();
  const axiosInstance = createAxiosInstance(router);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [menuList, setMenuList] = useState<Menu[]>([]);
  
  const fetchMenuList = useCallback(async () => {
    try {
      setisLoading(true);
      const response = await axiosInstance.get(
        `/menu${searchText.length > 0 ? `?search=${searchText}` : ""}`
      );
      const data: Menu[] = response.data;
      setMenuList(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Error Fetching Menu: ${error} `,
      });
    } finally {
      setisLoading(false);
    }
  }, [searchText]);

  useEffect(() => {
    fetchMenuList().finally(()=> setisLoading(false));
  }, [fetchMenuList]);

  const toggleMenuAvailability = async (menuId: string, newAvailability: boolean) => {
    try {
      await axiosInstance.patch(`/menu/${menuId}/availability`, { available: newAvailability });
      setMenuList(prevMenuList => prevMenuList.map(menu => {
        if (menu._id === menuId) {
          return { ...menu, available: newAvailability };
        }
        return menu;
      }));
      Toast.fire({
        icon: "success",
        title: `Food ${newAvailability ? "Enabled" : "Disabled"}`
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Error ${newAvailability ? "Enabling Menu" : "Disabling Menu"}`,
      });
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-100">
      <Nav
        text="Menu"
        widget={
          <button
            onClick={() => {
              setIsModalOpen(true);
              router.push("/dashboard/menus?action=new");
            }}
            className="bg-[#DD2F6E] hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded-lg lg:px-6 lg:py-3 cursor-pointer text-sm md:text-base lg:text-lg"
          >
            ➕ Add Menus
          </button>
        }
      />
      <Sidebar>
        <div>``
          <SearchBar
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            value={searchText}
          />
          {isLoading ? <ClipLoader /> : <div className="flex flex-col">
            {menuList.map((menu)=> (
              <MenuTile
                key={menu._id}
                name={menu.name}
                price={menu.price}
                image={menu.image}
                measure={menu.measure}
                toggleValue={menu.available}
                toggleOnChange={() => toggleMenuAvailability(menu._id, !menu.available)}
              />
            ))}
          </div>}
        </div>
        <MenuFormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            router.back();
          }}
        />
      </Sidebar>
    </div>
  );
};

export default MenuList;
