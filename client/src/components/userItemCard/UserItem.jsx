import React from "react";
import { useState, useEffect } from "react";
import {
  IconContentCopy,
  IconAccountEdit,
  IconBxsBookmarks,
  IconLinkAdd,
  IconCalendarEventFill,
  IconBxEditAlt,
  IconSetting,
} from "../../assets/icons";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { logoutUser } from "../../actions/userAction";
import { getBookmarkedArticle, clearErrors } from "../../actions/articleAction";
import "./style.css";
import ArticleItemHorizontal from "../articleItemHorizontal/ArticleItemHorizontal";
import PageDotLoader from "../Loaders/pageDotLoader/pageDotLoader";

const UserItem = ({ avatar, username, bio, referralCode }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPTabOpen, setIsPTabOpened] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [userInterest, setUserInterest] = useState([]);
  const [page, setPage] = useState(1);

  const {
    error: articleError,
    articles,
    loading,
  } = useSelector((state) => state.bookmarkArticle);
  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("BookmarkedArticles="));
    if (cookieValue) {
      const savedArticles = JSON.parse(cookieValue.split("=")[1]);
      setBookmarkedIds(
        Object.keys(savedArticles).filter(
          (article) => savedArticles[article]._id
        )
      );
    }
  }, []);

  useEffect(() => {
    if (articleError) {
      enqueueSnackbar(articleError, { variant: "error" });
      dispatch(clearErrors());
    }
    const debounceTimeout = setTimeout(()=>{
      if (bookmarkedIds.length) {
        dispatch(getBookmarkedArticle(bookmarkedIds, page));
      }
    },[300])
   return ()=> clearTimeout(debounceTimeout)
  }, [articleError, dispatch]);

  useEffect(() => {
    const interests = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("Interests="));
    if (interests) {
      const parsedInterest = JSON.parse(interests.split("=")[1]);
      setUserInterest(
        Object.keys(parsedInterest).filter((int) => parsedInterest[int])
      );
    }
  }, []);
  const togglePTab = () => {
    setIsPTabOpened(!isPTabOpen);
  };

  const handleClick = (to) => {
    togglePTab();
    navigate(to);
  };

  const handleFriendInvite = () => {};

  const handleConnection = () => {};

  const referralUrl = `http://localhost:5173/signup/${referralCode}`;
  const copyCode = () => {
    if (referralUrl) {
      navigator.clipboard.writeText(referralUrl);
      enqueueSnackbar("ReferralUrl copied!", { variant: "info" });
      togglePTab()
    }
    return;
  };

  const showConfirmation = () => {
    togglePTab();
    enqueueSnackbar("Are you sure you want to log out?", {
      variant: "info",
      persist: true,
      action: (key) => (
        <>
          <button className="snackbar-btn" onClick={()=>logout()}>
            Yes
          </button>
          <button className="snackbar-btn" onClick={() => closeSnackbar()}>
            No
          </button>
        </>
      ),
    });
  };

  const logout = () => {
    closeSnackbar();
    dispatch(logoutUser());
    enqueueSnackbar("Logout Successfully", { variant: "success" });
    navigate('/login')
  };
  return (
    <div className="user-card">
      <div className="user-card-header">
        <span className="u-setting" title="Setting" onClick={togglePTab}>
          <IconSetting />
        </span>
        {isPTabOpen && (
          <div className="u-nav-tab">
            <ul id="u-ul">
              <li onClick={() => handleClick("/edit-profile")}>
                <IconAccountEdit className="u-ul-icon" />
                &nbsp;&nbsp; Edit profile
              </li>
              <li onClick={() => handleClick("/bookmarks")}>
                <IconBxsBookmarks className="u-ul-icon" />
                &nbsp;&nbsp; Bookmarked Articles
              </li>
              <li onClick={() => handleClick("/sub-history")}>
                <IconCalendarEventFill className="u-ul-icon" />
                &nbsp;&nbsp;Subscription History
              </li>
              <li onClick={handleFriendInvite}>
                <IconLinkAdd className="u-ul-icon" />
                &nbsp;&nbsp; Invite a friend
              </li>
             {username && <li onClick={showConfirmation}>
                <iconSwitchAccountIcon className="u-ul-icon" /> &nbsp; Logout
              </li>} 
              <li className="ref-url">
                ReferralUrl&nbsp;|&nbsp;{referralCode && referralUrl.slice(0,(referralUrl.length/2))}
                &nbsp;&nbsp;&nbsp;
                <span title="Copy" onClick={copyCode}>
                  <IconContentCopy className="ref-copy-icon" fill="#fff" />
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="user-card-img">
        <img loading="lazy" src={avatar} />
        <span className="u-edit-prof" title="Edit">
          <IconAccountEdit
            fill="#ccc"
            height="22px"
            width="22px"
            onClick={() => handleClick("/edit-profile")}
          />
        </span>
      </div>
      <div className="user-card-info">
        <span className="modal-username">{username}</span>

        <div className="usr-conn">
          Connections&nbsp;<span>0</span>
        </div>
        <div className="user-bio-segment">
          About
          <p className="user-bio">{bio}</p>
        </div>
      </div>
      <div className="user-interest-segment">
        <div className="user-interest-header">
          <span>Interests</span>
          <span
            title="Manage interest"
            className="manage-interest"
            onClick={() => navigate("/personalize")}
          >
            Manage
            <IconBxEditAlt fill="#ccc" height="20px" width="20px" />
          </span>
        </div>
        <div className="user-interest-holder">
          {userInterest.map((int, _) => (
            <div
             key={int} className="user-interest-item"
              onClick={() => navigate("/bookmarks")}
            >
              {int}
            </div>
          ))}
        </div>
      </div>

      <div className="reading-list-segment">
        <span>Reading List</span>
        <div className="u-reading-list">
        {loading ? <PageDotLoader/> :
            articles?
                  articles.map((art, i) => (
                  <ArticleItemHorizontal
                    id={art._id}
                    title={art.title}
                    image={art.image}
                    caption={`${art.content.slice(0, 90)}...`}
                    category={art.category}
                    postedBy={art.postedBy}
                    date={art.createdAt}
                    readDuration={art.content}
                    key={i}
                  />
                ))
              : Array(10).fill(null).map((it, i)=>(
                <ArticleItemHorizontal key={i}/>
              ))}

        </div>
      </div>
    </div>
  );
};

export default UserItem;
