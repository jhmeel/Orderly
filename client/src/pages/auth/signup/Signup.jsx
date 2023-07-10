import React, { useState, useEffect } from "react";
import {
  IconEyeSlashFill,
  IconEyeFill,
  IconGoogle,
  ErrorIcon,
} from "../../../assets/icons";
import MetaData from "../../../components/MetaData";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import PageDotLoader from "../../../components/Loaders/pageDotLoader/pageDotLoader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, registerUser } from "../../../actions/userAction";
import { useSnackbar } from "notistack";
const logo = "orderly";
const Signup = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const [formData, setFormData] = useState({
    username: "",
    phonenumber: "",
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

    // Validate username
    if (!formData.username) {
      errors.username = "Username is required";
    } else if (formData.username.length < 3 || formData.username.length > 20) {
      errors.username = "Username should be between 3 and 20 characters";
    }
    // Validate Phone
    if (!formData.phonenumber) {
      errors.phone = "Phone is required";
    } else if (
      formData.phonenumber.length < 11 ||
      formData.phonenumber.length > 11
    ) {
      errors.phone = "Please enter a valid Phonenumber";
    }

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
      dispatch(registerUser(formData));
    }
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      enqueueSnackbar(`You have successfully signed up!`, {
        variant: "success",
      });
      navigate("/personalize");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <>
      <MetaData title="Signup" />
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="logo_container">
          <img className="l-logo" src={logo} alt="orderly" />
        </div>
        <p className="already-have-account">
          Already have an account?<Link to="/login">&nbsp;Login</Link>
        </p>
        <div className="title_container">
          <p className="title">Create an Account</p>
          <span className="subtitle"></span>
        </div>
        <br />
        <div className="input_container">
          <label className="input_label" htmlFor="username">
            Username*
          </label>
          <input
            title="username"
            type="text"
            id="username"
            placeholder="John Doe"
            name="username"
            value={formData.username}
            className="input_field "
            autoFocus
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        {formErrors.username && (
          <div className="error-message">
            <ErrorIcon className="signup-errmsg-icon" />
            &nbsp;{formErrors.username}
          </div>
        )}
        <div className="input_container">
          <label className="input_label" htmlFor="Phone">
            Phone Number*
          </label>
          <input
            title="phone number"
            type="tel"
            id="phone"
            placeholder="080000000000"
            name="phonenumber"
            className="input_field"
            value={formData.phonenumber}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        {formErrors.phone && (
          <div className="error-message">
            <ErrorIcon className="signup-errmsg-icon" />
            &nbsp;{formErrors.phone}
          </div>
        )}
        <div className="input_container">
          <label className="input_label" htmlFor="email">
            E-mail*
          </label>
          <input
            title="email"
            type="email"
            id="email"
            placeholder="John@gmail.com"
            name="email"
            className="input_field"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        {formErrors.email && (
          <div className="error-message">
            <ErrorIcon className="signup-errmsg-icon" />
            &nbsp;{formErrors.email}
          </div>
        )}
        <div className="input_container">
          <label className="input_label" htmlFor="password">
            Password*
          </label>
          <input
            title="password"
            type={!isPasswordVisible ? "password" : "text"}
            id="password"
            name="password"
            className="input_field"
            placeholder="Input a strong password"
            value={formData.password}
            onChange={handleChange}
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
          <div className="error-message">
            <ErrorIcon className="signup-errmsg-icon" />
            &nbsp;{formErrors.password}
          </div>
        )}
        <button className="signup_btn" type="submit" disabled={loading}>
          {loading ? (
            <>
              <PageDotLoader />
            </>
          ) : (
            "Sign Up"
          )}
        </button>

        <p className="terms">
          By clicking "Signup", you agree to our{" "}
          <Link to="/privacy-policy">Privacy Policy</Link> and our
          <Link to="/terms-of-service">Terms of service.</Link>{" "}
        </p>

        <div className="s-separator">
          <hr className="s-line" />
          <span>Or</span>
          <hr className="s-line" />
        </div>
        <Link to="/api/v1/auth/google">
          <button className="signup_ggl">
            <IconGoogle width="22" height="22" className="g-icon" />
            &nbsp;Sign up With Google
          </button>
        </Link>
      </form>
    </>
  );
};

export default Signup;
