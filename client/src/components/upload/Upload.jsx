import React,{useRef, useState} from 'react'
import { IconCloud, IconDeleteForeverOutline, IconFile } from '../../assets/icons'
import './style.css'

const upload = () => {
  const [file, setFile] = useState('');
  const [content, setContent] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [readTime, setReadTime] = useState(null);
  const deleteSelectedFile =  ()=>{
    setFile('')
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setContent(event.target.result);

        // Calculate the read time
        // const { text } = readingTime(event.target.result);
        // setReadTime(text);
      };

      reader.readAsText(file);
    }
  };



  return (
    <div className="u-container"> 
  <div className="u-header"> 
    <IconCloud/> <p>Upload Markdown File!</p>
  </div> 
  <label htmlFor="file-input" className="u-footer"> 
  <>
  <IconFile className="u-file-icon"/>
    <p className='u-file-name'>{file && file.name? file.name :'selected a file'}</p> 
  </>
  </label> 
  <IconDeleteForeverOutline className="u-delete-icon" fill='royalblue'  height='26px' width='26px' onClick={deleteSelectedFile}/>
    
  <input type="file" id='file-input' accept=".md" onChange={handleFileChange} />
</div>

  )
}

export default upload

