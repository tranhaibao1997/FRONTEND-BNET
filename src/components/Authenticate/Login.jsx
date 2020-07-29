import React from "react";
import { connect } from "react-redux";
import { login, loginFacebook } from "../../actions/auth";
import { Link, Redirect } from "react-router-dom";

function Login({ isAuthenticated, login, loginFacebook }) {
  let [loginForm, setLoginForm] = React.useState({
    email: "",
    password: "",
  });
  let { email, password } = loginForm;
  function onChangeLogin(e) {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  }
  function loginSubmit(e) {
    
    e.preventDefault();
    login(email, password);
  }
  if (isAuthenticated) {
    console.log("CHAY ZO DAYYYYY");
    return <Redirect to="/dashboard/personal"></Redirect>;
  }
  return (
    <>
      <div className="title h6">Login to your BNet Account
      <p>Test account </p>
      <p>email: taylorswift@gmail.com </p>
      <p>password:123456 </p>
      </div>
   

      <form className="content" type="submit" onSubmit={(e) => loginSubmit(e)}>
        <div className="row">
          <div className="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="form-group label-floating">
              <label className="control-label">Your Email</label>
              <input
                className="form-control"
                placeholder
                type="email"
                name="email"
                value={email}
                onChange={(e) => onChangeLogin(e)}
              />
            </div>
            <div className="form-group label-floating">
              <label className="control-label">Your Password</label>
              <input
                className="form-control"
                placeholder
                type="password"
                name="password"
                value={password}
                onChange={(e) => onChangeLogin(e)}
              />
            </div>
            <div className="remember">
              <div className="checkbox">
                <label>
                  <input name="optionsCheckboxes" type="checkbox" />
                  Remember Me
                </label>
              </div>
              <a
                href="#"
                className="forgot"
                data-toggle="modal"
                data-target="#restore-password"
              >
                Forgot my Password
              </a>
            </div>
            <button type="submit" className="btn btn-lg btn-primary full-width">
              Login
            </button>
            <div className="or" />
            <a
              href="https://bnet-backend.herokuapp.com/api/auth/facebook/login"
              className="btn btn-lg bg-facebook full-width btn-icon-left"
            >
              <i className="fab fa-facebook-f" aria-hidden="true" />
              Login with Facebook
            </a>
            <a
              href="https://bnet-backend.herokuapp.com/api/auth/gmail/login"
              className="btn btn-lg bg-google full-width btn-icon-left"
            >
              <i className="fab fa-google" aria-hidden="true" />
              Login with Gmail
            </a>
            <p>
              Don’t you have an account? <a href="#">Register Now!</a> it’s
              really simple and you can start enjoing all the benefits!
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login, loginFacebook })(Login);
