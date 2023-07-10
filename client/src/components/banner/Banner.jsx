import React from 'react'
import { useState, useEffect } from 'react'
import './style.css'
import {IconArrowRight } from '../../assets/icons'
const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);
const images = ["Get access to over 90K pastquestions, with answers powered by GPT",
"Read inspiring articles which span series of categories - including finance, personal dev, tech, science and more...",
"Stay updated with events happening around the student network",
]
useEffect(()=>{
  const interval = setInterval(() =>{
    setCurrentImage((currentImage + 1) % images.length)
  },3000)
  return () => clearInterval(interval)
},[currentImage])

 const handleNextClick = () => {
   setCurrentImage((currentImage + 1) % images.length);
 };

  return (
    <div className="banner">
    <a className="item1">
     <p>Welcome to the frontiers zone,<br/>where you will -</p>
     <p className="small">{images[currentImage]}</p>
     <div className="go-corner">
       <div className="go-arrow" title='Next'>
         <IconArrowRight className="b-arrow-right" onClick={handleNextClick}/>
       </div>
     </div>
   </a>
 </div>
  )
}

export default Banner



