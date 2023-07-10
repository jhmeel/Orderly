import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { clearErrors, getUserDetails, logoutUser } from "../../actions/userAction";
import { USER_DETAILS_RESET } from "../../constants/userConstants";
import MetaData from "../../components/MetaData";
import { useSnackbar } from "notistack";
import "./style.css";
import EmptyAvatar from "../../assets/empty_avatar.png";
import UserItem from "../../components/userItemCard/UserItem";
import Footer from "../../components/footer/Footer";
import GetToken from "../../utils/getToken";
import {
  IconContentCopy,
  IconAccountEdit,
  IconBxsBookmarks,
  IconLinkAdd,
  IconCalendarEventFill,
  IconBxEditAlt,
  IconSetting,
} from "../../assets/icons";
import { getBookmarkedArticle} from "../../actions/articleAction";
import ArticleItemHorizontal from "../../components/articleItemHorizontal/ArticleItemHorizontal";
import PageDotLoader from "../../components/Loaders/pageDotLoader/pageDotLoader";
import './style.css'


const Profile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const authToken = GetToken();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { loading:detailsLoading, user, error: detailsError } = useSelector((state) => state.userDetails);
  const [isPTabOpen, setIsPTabOpened] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [userInterest, setUserInterest] = useState([]);
  const [page, setPage] = useState(1);

  const {
    error: articleError,
    articles,
    loading: articleLoading,
  } = useSelector((state) => state.bookmarkArticle);
  useEffect(() => {
    if (detailsError) {
      enqueueSnackbar(detailsError, { variant: "error" });
      dispatch(clearErrors());

    }
    dispatch(getUserDetails(params?.username, authToken));

  }, [dispatch,/*detailsError*/, params?.username]);

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

  const referralUrl = `http://localhost:5173/signup/${user?.referralCode}`;
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
    <>
      <MetaData title="Profile" />
      <main>
        <div className="profile-contaiiner">
          <div className="profile-user-item">
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
             {user?.username && <li onClick={showConfirmation}>
                <iconSwitchAccountIcon className="u-ul-icon" /> &nbsp; Logout
              </li>} 
              <li className="ref-url">
                ReferralUrl&nbsp;|&nbsp;{referralUrl.slice(0,(referralUrl.length/2))}
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
        <img loading="lazy" src={user?.avatar||EmptyAvatar} />
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
        <span className="modal-username">{user?.username}</span>

        <div className="usr-conn">
          Connections&nbsp;<span>0</span>
        </div>
        <div className="user-bio-segment">
          About
          <p className="user-bio">{user?.bio}</p>
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
        {articleLoading ? <PageDotLoader/> :
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
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Profile;
