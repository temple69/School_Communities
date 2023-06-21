import React from 'react'
import NavBar from './Navbar'
const Layout = ({children}) => {
  return (
    <main>
        <NavBar/>
        {children}
    </main>
  )
}

export default Layout