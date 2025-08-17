import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className='footer' id='footer'>
      <div className="footer-content">

        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>Savor every bite with Tomato Food! Indulge in fresh, mouthwatering flavors delivered right to your doorstep. From local favorites to international cuisines, we bring deliciousness with speed and care. Enjoy hassle-free ordering, secure payments, and fast delivery. Stay connected, stay satisfied, and let us handle your cravings.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
          </div>
        </div>

        <div className="footer-content-centre">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-152-154-4852</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>

      </div>
      <hr />
      <p className="footer-copyright">Copyright © {currentYear} Tomato.com - All right Reserved.</p>
    </div>
  )
}

export default Footer
