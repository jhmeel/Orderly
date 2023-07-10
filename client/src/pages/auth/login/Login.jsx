import React, { useState, useEffect } from "react";
import {
  IconEyeSlashFill,
  IconEyeFill,
  IconGoogle,
  MailIcon,
  PasswordIcon,
  IconMessageReport,
  InfoIcon,
  ErrorIcon,
} from "../../../assets/icons";
import "./style.css";
import PageDotLoader from "../../../components/Loaders/pageDotLoader/pageDotLoader";
import MetaData from "../../../components/MetaData";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loginUser } from "../../../actions/userAction";
import { Link, useNavigate } from "react-router-dom";
const logo = 'orderly'
const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated, error, user, token } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    // Validate password
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6 || formData.password.length > 30) {
      errors.password = "Password should be between 6 and 30 characters";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      dispatch(loginUser(formData.email, formData.password));
    }
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    } else if (
      isAuthenticated &&
      !document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("Interests="))
    ) {
      enqueueSnackbar(`You are successfully logged in!`, { variant: "success" })
      navigate(`/personalize`);
    } else if (isAuthenticated && token) {
      navigate(`/profile/${user?.username}`);
    }
 
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <>
      <MetaData title="Login" />
      <form className="login_form_container" onSubmit={handleSubmit}>
        <div className="logo_container">
          <img className="l-logo" src={logo} alt="orderly" />
        </div>
        <p className="create-an-account">
          Do not have an account?<Link to="/signup">&nbsp;Signup</Link>
        </p>
        <div className="title_container">
          <p className="title">Login</p>
          <span className="subtitle">
           login into your account and enjoy the
            experience.
          </span>
        </div>
        <br />
        <div className="input_container">
          <label className="input_label" htmlFor="email_field">
            E-mail*
          </label>
          <input
            placeholder="name@mail.com"
            value={formData.email}
            onChange={handleChange}
            title="email"
            name="email"
            type="email"
            className="input_field"
            id="email_field"
            disabled={loading}
            autoFocus
          />
        </div>
        {formErrors.email && (
          <div className="error-message"><InfoIcon className='login-errmsg-icon'/>&nbsp;{formErrors.email}</div>
        )}
        <div className="input_container">
          <label className="input_label" htmlFor="password_field">
            Password*
          </label>
          <input
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
            title="password"
            name="password"
            type={!isPasswordVisible ? "password" : "text"}
            className="input_field"
            id="password_field"
            disabled={loading}
          />
          <span>
            {isPasswordVisible ? (
              <IconEyeSlashFill
                className="p-visibility"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <IconEyeFill
                className="p-visibility"
                onClick={togglePasswordVisibility}
              />
            )}
          </span>
        </div>
        {formErrors.password && (
          <div className="error-message"><ErrorIcon className='login-errmsg-icon'/>&nbsp;{formErrors.password}</div>
        )}
        <Link to="/password/forgot">
          <p className="pswrd-frgt">Forgotten Password?</p>
        </Link>
        <button
          title="Login In"
          type="submit"
          className="login-in_btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <PageDotLoader /> 
            </>
          ) : (
            <span>Login</span>
          )}
        </button>
        <div className="l-separator">
          <hr className="l-line" />
          <span>Or</span>
          <hr className="l-line" />
        </div>
        <button title="Login In" type="submit" className="login-in_ggl">
          <IconGoogle />
          <span>Login In with Google</span>
        </button>
        <Link to="/terms-of-service">
          <p className="note">Terms of use &amp; Conditions</p>
        </Link>
      </form>
    </>
  );
};

export default Login;
