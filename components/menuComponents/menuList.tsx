import React, { ReactNode, useCallback, useEffect, useState } from "react";
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
import { useMenuContext } from "@/context/menucontext";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import CustomPaginationActionsTable from "../table";

const MenuList: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { action } = router.query;
  const axiosInstance = createAxiosInstance(router);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const { updateMenu, setIsModify, isModify } = useMenuContext();
  const [menuList, setMenuList] = useState<Menu[]>([]);
  const [deleteErrrorMessage, setdeleteErrorMessage] = useState("");

  const fetchMenuList = useCallback(async () => {
    const session: any | Session = await getSession();
    const currentUser = session?.user;
    console.log(currentUser.id);
    try {
      setisLoading(true);
      const response = await axiosInstance.get(
        `/menu/user/${currentUser.id}${
          searchText.length > 0 ? `?search=${searchText}` : ""
        }`
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
    fetchMenuList().finally(() => setisLoading(false));
  }, [fetchMenuList]);

  const toggleMenuAvailability = async (
    menuId: string,
    newAvailability: boolean
  ) => {
    try {
      await axiosInstance.patch(`/menu/${menuId}/availability`, {
        available: newAvailability,
      });
      setMenuList((prevMenuList) =>
        prevMenuList.map((menu) => {
          if (menu._id === menuId) {
            return { ...menu, available: newAvailability };
          }
          return menu;
        })
      );
      Toast.fire({
        icon: "success",
        title: `Food ${newAvailability ? "Enabled" : "Disabled"}`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Error ${newAvailability ? "Enabling Menu" : "Disabling Menu"}`,
      });
    }
  };
  useEffect(() => {
    if (action === "new") {
      setIsModify(false);
    }
  }, [action]);
  useEffect(() => {
    if (action === "edit") {
      setIsModify(true);
    }
  }, [action]);

  const handleEdit = (menu: Menu) => {
    router.push("/admin/dashboard/menus?action=edit");
    updateMenu(menu);
  };

  return (
    <div className="bg-gray-100">
      <Nav
        text="Menu"
        widget={
          <button
            onClick={() => {
              router.push("/admin/dashboard/menus?action=new");
            }}
            className="bg-[#DD2F6E] hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded-lg lg:px-6 lg:py-3 cursor-pointer text-sm md:text-base lg:text-lg"
          >
            ➕ Add Menu
          </button>
        }
      />
      <Sidebar>
        <div>
          <SearchBar
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            value={searchText}
          />
          {isLoading ? (
            <center className="flex items-center justify-center mt-[10%]">
              <ClipLoader size={50} />
            </center>
          ) : (
            <div className="flex flex-col">
              {menuList.map((menu) => (
                <MenuTile
                  key={menu._id}
                  name={menu.name}
                  price={menu.price}
                  image={menu.image}
                  measure={menu.measure}
                  toggleValue={menu.available}
                  toggleOnChange={() =>
                    toggleMenuAvailability(menu._id, !menu.available)
                  }
                  editOnClicked={() => {
                    handleEdit(menu);
                  }}
                  deleteOnClicked={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!",
                    }).then(async () => {
                      try {
                        const response = await axiosInstance.delete(
                          `/menu/${menu._id}`
                        );
                        Swal.fire({
                          title: "Deleted!",
                          text: "Your file has been deleted.",
                          icon: "success",
                        });
                        router.reload();
                      } catch (error: any) {
                        const errorMessage = error.response.data.message;
                        setdeleteErrorMessage(errorMessage);
                        Swal.fire({
                          title: "Delete Error",
                          text: `${errorMessage}`,
                          icon: "error",
                        });
                      }
                    });
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <main>{children}</main>
      </Sidebar>
    </div>
  );
};

export default MenuList;
