import MenuList from "@/components/menuComponents/menuList";
import React, { ReactElement } from "react";
import Layout from "../layout";
import { useRouter } from "next/router";
import { MenuForm } from "./menuForm";

const MenuPages = () => {
  const router = useRouter();
  return (
    <>
    <MenuList/>
    </>
  );
};
MenuPages.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default MenuPages;
