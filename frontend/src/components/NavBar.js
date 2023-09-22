import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavBar = () => {
  return (
    <nav>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/profile'>Your Profile</NavLink>
      <NavLink to='/fuel'>Fuel Request Form</NavLink>
      <NavLink to='/display'>Fuel Request History</NavLink>
    </nav>
  )
}
