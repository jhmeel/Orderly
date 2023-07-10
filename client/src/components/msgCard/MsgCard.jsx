
import React from 'react'
import {Link} from 'react-router-dom'
import './style.css'

const MsgCard = ({title, paragraph, btnText, link}) => {
  return (
    <div className="m-card">
  <div className="m-content">
    <p className="m-heading">{title}
    </p>
    <p className="m-para">
     {paragraph}
    </p>
    <Link to={link}><button className="m-btn">{btnText}</button></Link>
  </div>
</div>



  )
}

export default MsgCard