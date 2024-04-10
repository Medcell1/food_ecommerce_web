import MenuList from '@/components/menuComponents/menuList';
import React, { ReactElement } from 'react'
import Layout from '../layout';

 const MenuPages = () => {
  return (
    <>
    <MenuList/>
    </>
    
  )
}
MenuPages.getLayout = function getLayout(page: ReactElement){
  return (
    <Layout>
      {page}
    </Layout>
  )
}
export default MenuPages;