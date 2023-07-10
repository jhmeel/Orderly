
import React from 'react'
import './style.css'

const ToggleTheme = () => {
  return (
    <div className="toggle-switch">
    <label className="switch-label">
      <input type="checkbox" className="checkbox"/>
      <span className="slider"></span>
    </label>
  </div>  
  
  
  )
}

export default ToggleTheme