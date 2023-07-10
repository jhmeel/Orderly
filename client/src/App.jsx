import React, { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/header/Header";
import TriuneLoader from "./components/Loaders/loaderTriune/TriuneLoader";
import PrivateRoute from "./utils/PrivateRoute";

const Home = lazy(() => import("./pages/home/Home"));
const NotFound = lazy(() => import("./pages/Notfound/Notfound"));
const Signup = lazy(() => import("./pages/auth/signup/Signup"));
const Login = lazy(() => import("./pages/auth/login/Login"));
const ForgotPassword = lazy(() => import("./pages/Auth/forgot/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/Auth/reset/ResetPassword"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const EditProfile = lazy(() => import("./pages/profile/edit/EditProfile"));
const AboutPage = lazy(() => import("./pages/aboutPage/AboutPage"));
const HelpPage = lazy(() => import("./pages/helpPage/HelpPage"));
const PrivacyPolicyPage = lazy(() =>
  import("./pages/privacyPolicyPage/PrivacyPolicyPage")
);
const ContactUsPage = lazy(() => import("./pages/contactusPage/ContactUsPage"));
const BillingPage = lazy(() => import("./pages/billingPage/BillingPage"));
const TermsOfService = lazy(() =>
  import("./pages/termsOfServicePage/TermsOfService")
);
const Dashboard = lazy(() => import("./pages/AdminDashboard/Dashboard"));

const App = () => {
 
  const user = useSelector((state) => state.user);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <>
      <Suspense
        fallback={
          <div>
            <TriuneLoader />
          </div>
        }
      >
        {![
          "/login",
          "/signup",
          "/password/forgot",
          "/password/reset/:token",
        ].includes(pathname) && <Header />}

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signup/:refCode" element={<Signup />} />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />

          <Route
            exact
            path="/profile/:username"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/edit-profile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
         
          <Route exact path="/terms-of-service" element={<TermsOfService />} />
          <Route
            exact
            path="/subscription"
            element={
              <PrivateRoute>
                <BillingPage />
              </PrivateRoute>
            }
          />
         
          <Route
            exact
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
