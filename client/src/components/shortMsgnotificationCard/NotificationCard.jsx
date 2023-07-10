import React, { useState } from 'react'
import { IconRemoveFill, IconSpeaker } from '../../assets/icons'
import './style.css'
const NotificationCard = ({message}) => {
  const [isActive, setIsActive] = useState(true)
  const handleRemove =()=>{
    setIsActive(!isActive)
  }
  return (
    <>
    {isActive && (<div className="sx-m-card">
    <div className="sx-m-header">
      <span className="sx-m-icon">
       <IconSpeaker/>
      </span>
      <p className="sx-m-alert">New message!</p>
      <IconRemoveFill onClick={handleRemove} className='sx-m-remove-icon'/>
    </div>
  
    <p className="sx-message">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ea quo unde
      vel adipisci blanditiis voluptates eum. Nam, cum minima?
    </p>
  
    <div className="sx-m-actions">
      <a className="sx-m-read" href="">
        view
      </a>
  
      <a className="sx-m-mark-as-read" href="">
        Mark as Read
      </a>
    </div>
  </div>)}
</>
  
  )
}

export default NotificationCard