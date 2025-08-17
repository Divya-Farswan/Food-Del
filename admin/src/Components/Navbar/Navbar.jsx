import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="" />
      <button className="logout-btn">Log Out</button>
    </div>
  )
}

export default Navbar;

