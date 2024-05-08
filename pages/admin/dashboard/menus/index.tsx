import MenuList from "@/components/menuComponents/menuList";
import React, { ReactElement } from "react";
import Layout from "../layout";
import { useRouter } from "next/router";
import { MenuForm } from "./menuForm";
import { MenuContextProvider, useMenuContext } from "@/context/menucontext";
import MenuFormModal from "@/components/menuComponents/menuFormModal";

const MenuPages = () => {
  const router = useRouter();
  const {action} = router.query;
  return (
    <div className="">
    <MenuContextProvider>
    <MenuList>
    <MenuFormModal
          isOpen={action == "new" || action === "edit"}
          onClose={() => {
            router.back();
          }}
        />
        <div className="h-[100vh]"></div>
    </MenuList>

    </MenuContextProvider>
    </div>
  );
};
MenuPages.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default MenuPages;
