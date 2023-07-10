import React from 'react'
import { useState, useEffect } from 'react';
import PageDotLoader from '../../../components/Loaders/pageDotLoader/pageDotLoader';
import { useSnackbar } from 'notistack';
import MetaData from '../../../components/MetaData';
import fcabal from "../../../assets/logo/fcabal.png";
import { clearErrors, forgotPassword } from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

import './style.css'

const ForgotPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector((state) => state.forgotPassword);

  const [formData, setFormData] = useState({
    email: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(formData.email));
  

  }

  
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
        dispatch(clearErrors());
    }
    if (message) {
      enqueueSnackbar(message, { variant: "info" });
      setFormData({email:''})
    }
}, [dispatch, error, message]);
  return (
    <>
     <MetaData title='Forgot Password'/>
    <div className='forgotten-page'>
    <div className='forgot-container'>
    <div className="logo_container">
          <img className="reset-fcabal-logo" src={fcabal} alt="frontierscabal" />
        </div>
      <div className="title_container">
      <p className="title">Reset Password</p>
      <span className="subtitle">Please enter the email address associated with your account and we will email you a link to reset your
                  password.</span>
    </div>
    <br/>
       <form className="form-control"  onSubmit={handleSubmit}>
    <input title='email' name="email" required="true" type="email" placeholder='John@gmail.com' value={formData.email} onChange={handleChange} disabled={loading}/>
    <label>
        <span style={{transitionDelay:"350ms"}}>E</span>
        <span style={{transitionDelay:"300ms"}}>-</span>
        <span style={{transitionDelay:"50ms"}}>M</span>
        <span style={{transitionDelay:"00ms"}}>A</span>
        <span style={{transitionDelay:"50ms"}}>I</span>
        <span style={{transitionDelay:"00ms"}}>L:</span>
    </label>
    
    <button title="Proceed" type="submit" className="proceed" disabled={loading}>{loading?<PageDotLoader/>:<>Proceed</> }</button>
</form>
    </div>
    </div>
  
    </>
   
  )
}

export default ForgotPassword





