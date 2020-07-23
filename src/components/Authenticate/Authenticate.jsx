import React from "react";

import Register from "./Register";
import Login from "./Login";

export default function Authenticate() {
    let [loginActive, setLoginActive] = React.useState(true);
  return (
    <div className="landing-page">
      <div className="content-bg-wrap"></div>
      <div className="header-spacer--standard" />
      <div className="container">
        <div className="row display-flex">
          <div className="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="landing-content">
              <h1>Welcome to the Biggest Social Network in the World</h1>
              <p>
                We are the best and biggest social network with 5 billion active
                users all around the world. Share you thoughts, write blog
                posts, show your favourite music via Stopify, earn badges and
                much more!
              </p>
              <a href="#" className="btn btn-md btn-border c-white">
                Register Now!
              </a>
            </div>
          </div>
          <div className="col col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">
            {/* Login-Registration Form  */}
            <div className="registration-login-form">
              {/* Nav tabs */}
              <ul className="nav nav-tabs" role="tablist">
                <li onClick={() => setLoginActive(true)} className="nav-item">
                  <a
                    className={loginActive ? "nav-link active" : "nav-link"}
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                  >
                    <svg className="olymp-login-icon">
                      <use xlinkHref="#olymp-login-icon" />
                    </svg>
                  </a>
                </li>
                <li onClick={() => setLoginActive(false)} className="nav-item">
                  <a
                    className={loginActive ? "nav-link " : "nav-link active"}
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                  >
                    <svg className="olymp-register-icon">
                      <use xlinkHref="#olymp-register-icon" />
                    </svg>
                  </a>
                </li>
              </ul>
              {/* Tab panes */}
              <div className="tab-content">
                <div
                  className={loginActive ? "tab-pane " : "tab-pane active"}
                  id="home"
                  role="tabpanel"
                  data-mh="log-tab"
                >
                    <Register></Register>
                </div>
                
                <div
                  className={loginActive ? "tab-pane active" : "tab-pane"}
                  id="profile"
                  role="tabpanel"
                  data-mh="log-tab"
                >
                  <Login></Login>
                </div>
              </div>
            </div>
            {/* ... end Login-Registration Form  */}{" "}
          </div>
        </div>
      </div>
      {/* Window-popup Restore Password */}
      <div
        className="modal fade"
        id="restore-password"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="restore-password"
        aria-hidden="true"
      >
        <div
          className="modal-dialog window-popup restore-password-popup"
          role="document"
        >
          <div className="modal-content">
            <a
              href="#"
              className="close icon-close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <svg className="olymp-close-icon">
                <use xlinkHref="#olymp-close-icon" />
              </svg>
            </a>
            <div className="modal-header">
              <h6 className="title">Restore your Password</h6>
            </div>
            <div className="modal-body">
              <form method="get">
                <p>
                  Enter your email and click the send code button. You’ll
                  receive a code in your email. Please use that code below to
                  change the old password for a new one.
                </p>
                <div className="form-group label-floating">
                  <label className="control-label">Your Email</label>
                  <input
                    className="form-control"
                    placeholder
                    type="email"
                    defaultValue="james-spiegel@yourmail.com"
                  />
                </div>
                <button className="btn btn-purple btn-lg full-width">
                  Send me the Code
                </button>
                <div className="form-group label-floating">
                  <label className="control-label">Enter the Code</label>
                  <input
                    className="form-control"
                    placeholder
                    type="text"
                    defaultValue
                  />
                </div>
                <div className="form-group label-floating">
                  <label className="control-label">Your New Password</label>
                  <input
                    className="form-control"
                    placeholder
                    type="password"
                    defaultValue="olympus"
                  />
                </div>
                <button className="btn btn-primary btn-lg full-width">
                  Change your Password!
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* ... end Window-popup Restore Password */}
    </div>
  );
}


