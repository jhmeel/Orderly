import React from 'react'
import fcabal from '/src/assets/logo/fcabal_white.png'
import './style.css'

const Footer = () => {
  return (
    <footer className='footer'>
        <img className='foot-logo'src={fcabal} alt="fcabal"/>
     <p className='f-copy-right'>© 2023. All rights reserved.</p>
       
  </footer>
  )
}

export default Footer