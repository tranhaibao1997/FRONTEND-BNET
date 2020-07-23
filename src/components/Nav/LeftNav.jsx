import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";

function LeftNav({ auth }) {
  // let [currentProfileId, setCurrentProfileId] = useState(null)
  // useEffect(() => {
  //     getCurrentProfileId()

  // })
  // async function getCurrentProfileId() {
  //     let res = await Axios("https://localhost:5000/api/profile/me")
  //     setCurrentProfileId()
  // }

  return (
    <div>
      {auth.isAuthenticated ? (
        <div className="fixed-sidebar-left sidebar--small" id="sidebar-left">
          <Link to="02-ProfilePage.html" className="logo"></Link>
          <div
            className="mCustomScrollbar ps ps--theme_default ps--active-x"
            data-mcs-theme="dark"
            data-ps-id="cd64d3ba-7e2a-e0d7-3940-f14c6fcdd2e0"
          >
            <ul className="left-menu">
            
              <li>
                <Link to="#" className="js-sidebar-open">
                  <svg
                    className="olymp-menu-icon left-menu-icon"
                    data-toggle="tooltip"
                    data-placement="right"
                    data-original-title="OPEN MENU"
                  >
                    <use xlinkto="#olymp-menu-icon" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link to="/newsfeed">
                  <i className="far fa-newspaper"></i>
                </Link>
              </li>
              <li>
                <Link to={`/profile/${auth.user ?auth.user._id :""}/about`}>
                  <i className="fas fa-user"></i>
                </Link>
              </li>
              <li>
                <Link to={`/profile/${auth.user ?auth.user._id :""}/photos`}>
                  <i className="far fa-images"></i>
                </Link>
              </li>
              <li>
                <Link to={`/profile/${auth.user ?auth.user._id :""}/friend`}>
                  <i className="fas fa-user-friends"></i>
                </Link>
              </li>
              <li>
                <Link to={`/profile/${auth.user ?auth.user._id :""}/timeline`}>
                  <i className="fab fa-facebook-messenger"></i>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/personal">
                  <i className="fas fa-users-cog"></i>
                </Link>
              </li>
              <li>
                <Link to={`/`}>
                <i className="fas fa-globe-asia"></i>
                </Link>
              </li>
            </ul>
            <div
              className="ps__scrollbar-x-rail"
              style={{ width: "70px", left: "0px", bottom: "0px" }}
            >
              <div
                className="ps__scrollbar-x"
                tabIndex={0}
                style={{ left: "0px", width: "64px" }}
              />
            </div>
            <div
              className="ps__scrollbar-y-rail"
              style={{ top: "0px", right: "0px" }}
            >
              <div
                className="ps__scrollbar-y"
                tabIndex={0}
                style={{ top: "0px", height: "0px" }}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(LeftNav);
