import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Drawer from './components/Drawer'


function Layout() {
  return (
    <>
        <Drawer>
          <Header />
          <Outlet />
          <Footer />
        </Drawer>
    </>
  )
}

export default Layout