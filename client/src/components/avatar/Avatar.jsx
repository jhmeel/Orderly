/*
import React, { useState } from 'react';
import './styles.css';

const Avatar = () => {
  const [showLightbox, setShowLightbox] = useState(false);

  const toggleLightbox = () => {
    setShowLightbox(!showLightbox);
  };

  return (
    <div>
      <div className="strip-container">
        <div className="strip beginner-strip" />
        <div className="strip mid-strip" />
        <div className="strip elite-strip" />
      </div>
      <img
        className="avatar-image"
        src="images/avatar.jpg"
        alt="Avatar"
        onClick={toggleLightbox}
      />
      {showLightbox && (
        <div className="lightbox">
          <a href="#" className="close" onClick={toggleLightbox}>
            CLOSE
          </a>
          <div className="lightbox-content">
            <img src="images/snow.jpg" alt="Lightbox Image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
.strip-container {
  display: flex;
}

.strip {
  height: 100px;
  width: 20px;
  margin-right: 5px;
}

.beginner-strip {
  background-color: blue;
}

.mid-strip {
  background-color: green;
}

.elite-strip {
  background-color: red;
}

.avatar-image {
  max-width: 100%;
  height: auto;
}

.lightbox {
  display: table;
  position: fixed;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  transition-duration: 2s;
}

.lightbox:target {
  top: 0;
}

.lightbox-content {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  font-weight: 300;
  text-decoration: none;
  color: white;
}

img {
  max-width: 100%;
  height: auto;
}


0r


import React, { useState } from 'react';
import './styles.css';

const Avatar = () => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [stripCount, setStripCount] = useState(1);

  const toggleLightbox = () => {
    setShowLightbox(!showLightbox);
  };

  const handleStripCountChange = (count) => {
    setStripCount(count);
  };

  return (
    <div className="avatar-container">
      <div className={`strip-container strip-count-${stripCount}`}>
        {Array.from({ length: stripCount }, (_, index) => (
          <div className="strip" key={index} />
        ))}
      </div>
      <div className="diagonal-avatar" onClick={toggleLightbox}>
        <img className="avatar-image" src="images/avatar.jpg" alt="Avatar" />
      </div>
      {showLightbox && (
        <div className="lightbox">
          <a href="#" className="close" onClick={toggleLightbox}>
            CLOSE
          </a>
          <div className="lightbox-content">
            <img src="images/snow.jpg" alt="Lightbox Image" />
          </div>
        </div>
      )}
      <div className="strip-controls">
        <button onClick={() => handleStripCountChange(1)}>Beginner</button>
        <button onClick={() => handleStripCountChange(2)}>Mid</button>
        <button onClick={() => handleStripCountChange(3)}>Elite</button>
      </div>
    </div>
  );
};

export default Avatar;

.strip-container {
  display: flex;
}

.strip {
  height: 100px;
  width: 20px;
  margin-right: 5px;
  background-color: blue;
}

.strip-container.strip-count-2 .strip:nth-child(2),
.strip-container.strip-count-3 .strip:nth-child(3) {
  background-color: green;
}

.strip-container.strip-count-3 .strip:nth-child(3) {
  background-color: red;
}

.diagonal-avatar {
  transform: rotate(-45deg);
  overflow: hidden;
  width: 200px;
  height: 200px;
  position: relative;
}

.avatar-image {
  max-width: 100%;
  height: 100%;
  transform: rotate(45deg);
  object-fit: cover;
}

.lightbox {
  display: table;
  position: fixed;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  transition-duration: 2s;
}

.lightbox:target {
  top: 0;
}

.lightbox-content {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  font-weight: 300;
  text-decoration: none;
  color: white;
}

.strip-controls {
  margin-top: 10px;
}

.strip-controls button {
  margin-right: 5px;
}




*/


const roundedCorners = Buffer.from(
  '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
);

const roundedCornerResizer =
  sharp()
    .resize(200, 200)
    .composite([{
      input: roundedCorners,
      blend: 'dest-in'
    }])
    .png();

readableStream
  .pipe(roundedCornerResizer)
  .pipe(writableStream);