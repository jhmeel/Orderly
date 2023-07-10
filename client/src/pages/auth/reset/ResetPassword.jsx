import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import MetaData from '../../../components/MetaData';
import { clearErrors, resetPassword } from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import fcabal from '../../../assets/logo/fcabal.png'
import './style.css'
import PageDotLoader from '../../../components/Loaders/pageDotLoader/pageDotLoader';

const ResetPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
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

        if (formData.newPassword.length < 8) {
            enqueueSnackbar("Password length must be atleast 8 characters", { variant: "error" });
            return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
         enqueueSnackbar("Password Doesn't Match", { variant: "error" });
            return;
        }
        dispatch(resetPassword(params.token, formData.newPassword));
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Password Updated Successfully", { variant: "success" });
            navigate("/login")
        }
    }, [dispatch, error, success, navigate]);

    return (
        <>
        <MetaData title='Reset password'/>
          <main>
              
            <form onSubmit={handleSubmit} className='r-form_container'>

                <div className='r-input_cont'>
                    <div className='r-logo_holder'>
              <img src={fcabal} alt='fcabal'/>
                    </div>
                <label htmlFor='password'>New password*</label>
                <input type='password' title='New password'  value={formData.newPassword} name='newPassword' required={true} onChange={handleChange} disabled={loading}/>
                </div>
                <div className='r-input_cont'>
                <label htmlFor='password'>Confirm password*</label>
                <input type='password' title='Confirm password'  value={formData.confirmPassword} name='confirmPassword'  required={true} onChange={handleChange} disabled={loading}/>
                </div>
                <button className='reset_btn' disabled={loading}>{loading?<PageDotLoader/>: "Reset"}</button>
            </form>
          </main>
        </>
    )
}

export default ResetPassword