import React, { useEffect } from "react";
import CreditCard from "../../components/creditCard/CreditCard";
import Footer from "../../components/footer/Footer";
import MetaData from "../../components/MetaData";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";

const BillingPage = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.newSubscription);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch]);
  return (
    <>
      <MetaData title="Billig" />
      <main>
        <div className="bill-cont">
          <div className="cc-holder">
            <CreditCard />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default BillingPage;
