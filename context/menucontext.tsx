import { Menu } from "@/components/menuComponents/menuFormModal";
import React, { ReactNode, createContext, useContext, useState } from "react";
interface MenuContextType {
    isModify: boolean;
    selectedMenu: Menu | null;
    updateMenu: (menu: Menu | null) => void;
    setIsModify: React.Dispatch<React.SetStateAction<boolean>>;
  }
  const MenuContext = createContext<MenuContextType | null>(null);
  export const MenuContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
    const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
    const [isModify, setIsModify] = useState(false);
    const updateMenu = (menu: Menu | null) => {
        setSelectedMenu(menu);
    }
  return <MenuContext.Provider value={{isModify, selectedMenu, updateMenu, setIsModify}}>{children}</MenuContext.Provider>;
};
export const useMenuContext = () => {
    const context = useContext(MenuContext);
    if(!context) {
        throw new Error('useMenuContext must be used within a useMenuProvider')
    }
    return context;
}