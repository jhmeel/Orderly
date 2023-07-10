import React from "react";
import MetaData from "../../components/MetaData";
import { Link } from "react-router-dom";
import "./style.css";

const Notfound = () => {
  return (
    <>
      <MetaData title="Notfound" />
      <main>
        <div className="not-found">
          <h1 className="srry">Sorry, this page isn't available.</h1>
          <p className="m-info">
            The link you followed may be broken, or the page may have been
            removed.
          </p>
          <Link to="/" className="g-home">
            Go to Home
          </Link>
        </div>
      </main>
    </>
  );
};

export default Notfound;
