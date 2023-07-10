import React from "react";
import MetaData from "../../../components/MetaData";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, redirect } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import GetToken from "../../../utils/getToken";
import {
  clearErrors,
  updateProfile,
  loadUser,
} from "../../../actions/userAction";

import "./style.css";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
 const authToken = GetToken()
  const [updatedInfo, setUpdatedInfo] = useState({
    username: "",
    phonenumber: "",
    email: "",
    password: "",
    bio: "",
  });
  const [avatarPreview, setAvatarPreview] = useState();

  const { username, phonenumber, email, password, bio } = updatedInfo;
  const [avatar, setAvatar] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();
    if (updatedInfo.bio.split(" ").length > 20) {
      enqueueSnackbar("Your bio should not be more than 20 words", {
        variant: "error",
      });
      return;
    }

    dispatch(updateProfile(updatedInfo, authToken));
  };

  const handleDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);

      setAvatar(e.target.files[0]);
    }

    setUpdatedInfo({ ...updatedInfo, avatar, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (isUpdated) {
      enqueueSnackbar("profile updated!!", { variant: "success" });
      navigate(`/profile`);
    }
  }, [dispatch, user, error, isUpdated]);
  return (
    <>
      <MetaData title="Edit-Profile" />
      <div className="ed-form-container">
        <div className="ed-header">
          <h2>Edit profile</h2>
        </div>
        <form
          className="ed-form"
          onSubmit={handleUpdate}
          encType="multipart/form-data"
        >
          {avatar && (
            <img
              alt=""
              src={avatarPreview}
              width={85}
              height={85}
              loading="lazy"
              draggable={false}
            />
          )}
          <div className="ed-input-container">
            <label htmlFor="Username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              placeholder={user?.username}
              onChange={handleDataChange}
              disabled={loading}
              autoFocus
              autoComplete="off"
              required
            />
          </div>

          <div className="ed-input-container">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              autoFocus
              placeholder={user?.email}
              onChange={handleDataChange}
              disabled={loading}
              autoComplete="off"
              required
            />
          </div>
          <div className="ed-input-container">
            <label htmlFor="phonenumber">Phonenumber:</label>
            <input
              type="number"
              id="phonenumber"
              name="phonenumber"
              value={phonenumber}
              placeholder={user?.phonenumber}
              onChange={handleDataChange}
              disabled={loading}
              autoComplete="off"
              required
            />
          </div>
          <div className="ed-input-container">
            <label htmlFor="bio">Bio:</label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={bio}
              placeholder={user?.bio}
              onChange={handleDataChange}
              disabled={loading}
              required
            />
          </div>
          <div className="ed-input-container">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder=""
              onChange={handleDataChange}
              disabled={loading}
              required
            />
          </div>

          <div className="ed-input-container">
            <label className="avatar" htmlFor="avatar">
              Select new avatar
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="ed-avatar-inp"
              accept="image/*"
              onChange={handleDataChange}
              
            />
          </div>

          <button type="submit" className="update-button" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
