import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import Navbar from "../../components/Navbar";
import { setComparePokemon } from "../../_redux/pokemon";

import "./style.scss";

interface Props {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Navbar />
      <div className="default screen-wrap">
        <div className="two-small-red-circle">
          <div className="small-red-circle"></div>
          <div className="small-red-circle"></div>
        </div>
        <div className="screen">
          {children}
          {location.pathname !== "/" && (
            <button
              type="button"
              className="home-button"
              onClick={() => {
                dispatch(setComparePokemon([]));
                history.push("/");
              }}
            >
              <i className="fas fa-home"></i>
            </button>
          )}
        </div>
        <div className="wrap-two-item">
          <div className="wrap-big-circle">
            <div className="big-circle"></div>
          </div>
          <div className="wrap-dashes">
            <div className="dashes">
              <i className="fas fa-bars"></i>
            </div>
            <div className="dashes">
              <i className="fas fa-bars"></i>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DefaultLayout;
