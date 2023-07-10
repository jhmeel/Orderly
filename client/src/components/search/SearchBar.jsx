
import React, { useEffect, useState } from 'react';
import {IconBxSearchAlt,IconDotsVertical} from '../../assets/icons'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import './style.css'


const SearchBar = ({searchHandler}) => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();
  const [showSettings, setShowSettings] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
  const toggleSettings = () => {
    setShowSettings(prevShowSettings => !prevShowSettings);
  };

  const handleSettingSelect = (selectedOption) => {
    setShowSettings(false);
   
  };

   
  const handleOnChange = (e)=>{
    setSearchValue(e.target.value)
  }
 const Search = ()=>{
   if(searchValue.trim() === ''){
    enqueueSnackbar('Invalid search input', { variant: "error" });
    return
   }
   const query = encodeURIComponent(searchValue.trim())

   navigate({
    pathname: '/blog/search',
    search: `?query=${query}`,
  })

 
 }
  return (
    <div className="group">
  <IconBxSearchAlt  className="search-icon" onClick={Search}/>
  <input placeholder="Search" title='search' type="text" className="input" onChange={handleOnChange}/>
</div>
  )
      }

export default SearchBar;



