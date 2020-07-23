import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Personal from './Personal'
import changePassword from './changePassword'
import Hobbies from './Hobbies'
import EduAndExp from './EduAndExp'
import { useEffect } from 'react'
import AddEducation from './AddEducation'
import { StoreContext } from "../../ThemeContext";
import Account from './Account'
import { connect } from 'react-redux'
import { createEmptyProfile, getCurrentProfile } from '../../actions/profile'
import { loginFacebook } from "../../actions/auth";
import FriendRequest from './FriendRequest'
import FriendRecieved from './FriendRecieved'
import Location from './Location'
import AddExperience from './AddExperience'

function Dashboard({ profile, createEmptyProfile, getCurrentProfile, loginFacebook }) {
  useEffect(() => {
    async function loginOath() {
      const params = window.location.search.slice(1).split("&");

      console.log(params);
      let token = params.filter((elm) => elm.includes("token="))[0];
      token = token
        .split("")
        .splice(6, token.length - 1)
        .join("");
      console.log(token)
      await loginFacebook(token);
      await getCurrentProfile();
    }
    if (window.location.search.includes("token")) {
      loginOath()

    }
    getCurrentProfile()

  }, [])



  let { navBarAppear } = React.useContext(StoreContext);
  navBarAppear[1](true)
  return (
    <div>
      {/* Main Header Account */}
      <div className="main-header">
        <div className="content-bg-wrap bg-account" />
        <div className="container">
          <div className="row">
            <div className="col col-lg-8 m-auto col-md-8 col-sm-12 col-12">
              <div className="main-header-content">
                <h1>Your Account Dashboard</h1>
                <p>Welcome to your account dashboard! Here you’ll find everything you need to change your profile
                information, settings, read notifications and requests, view your latest messages, change your pasword and much
                    more! Also you can create or manage your own favourite page, have fun!</p>
              </div>
            </div>
          </div>
        </div>
        <img className="img-bottom" src="/img/account-bottom.png" alt="friends" />
      </div>
      {/* ... end Main Header Account */}
      {/* Your Account Personal Information */}
      <div className="container">
        <div className="row">

          <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
            {
              profile ? <Switch>
                <Route path={`/dashboard/personal`} component={Personal}></Route>
                <Route path={`/dashboard/changePassword`} component={changePassword}></Route>
                <Route path={`/dashboard/hobbies`} component={Hobbies}></Route>
                <Route path={`/dashboard/carrier`} component={EduAndExp}></Route>
                <Route path={`/dashboard/add-education`} component={AddEducation}></Route>
                <Route path={`/dashboard/add-experience`} component={AddExperience}></Route>
                <Route path={`/dashboard/account`} component={Account}></Route>
                <Route path={`/dashboard/location`} component={Location}></Route>
                <Route path={`/dashboard/friendRequest`} component={FriendRequest}></Route>
                <Route path={`/dashboard/friendRecieved`} component={FriendRecieved}></Route>
              </Switch> : <div style={{ textAlign: "center" }} className="login-to-continue">
                  <div className="login-to-continue-content">
                    <h2>


                    </h2>

                    <button onClick={() => createEmptyProfile()} className="btn btn-primary btn-md-2">Create Profile</button>
                  </div>
                </div>
            }


          </div>
          <div className="col col-xl-3 order-xl-1 col-lg-3 order-lg-1 col-md-12 order-md-2 col-sm-12 col-12 responsive-display-none">
            <div className="ui-block">
              {/* Your Profile  */}
              <div className="your-profile">
                <div className="ui-block-title ui-block-title-small">
                  <h6 className="title">Your PROFILE</h6>
                </div>
                <div id="accordion" role="tablist" aria-multiselectable="true">
                  <div className="card">
                    <div className="card-header" role="tab" id="headingOne">
                      <h6 className="mb-0">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          Profile Settings
                            <svg className="olymp-dropdown-arrow-icon"><use xlinkHref="#olymp-dropdown-arrow-icon" /></svg>
                        </a>
                      </h6>
                    </div>
                    <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                      <ul className="your-profile-menu">
                        <li>
                          <Link className="active" to="/dashboard/personal">Personal Information</Link>
                        </li>
                        <li>
                          <Link to="/dashboard/account">Account Settings</Link>
                        </li>
                       
                        <li>
                          <Link to="/dashboard/changePassword">Change Password</Link>
                        </li>
                        <li>
                          <Link to="/dashboard/hobbies">Hobbies and Interests</Link>
                        </li>
                        <li>
                          <Link to="/dashboard/carrier">Education and Employement</Link>
                        </li>
                        
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="ui-block-title">
                  <a href="#" className="h6 title">Notifications</a>
                  <a href="#" className="items-round-little bg-primary">8</a>
                </div>
                <div className="ui-block-title">
                  <a href="#" className="h6 title">Chat / Messages</a>
                </div>
                <div className="ui-block-title">
                  <Link to="/dashboard/friendRequest" className="h6 title">Friend Requests Sent</Link>
          <a href="#" className="items-round-little bg-blue">{profile ?profile.friendRequestSent.length :""}</a>
                </div>
                <div className="ui-block-title">
                  <Link to="/dashboard/friendRecieved" className="h6 title">Friend Requests Recieved</Link>
          <a href="#" className="items-round-little bg-blue">{profile ?profile.friendRequestPending.length :""}</a>
                </div>
                <div className="ui-block-title">
                  <Link to="/dashboard/location" className="h6 title">Friend Location</Link>
        
                </div>

              </div>
              {/* ... end Your Profile  */}
            </div>
          </div>
        </div>
      </div>
      {/* ... end Your Account Personal Information */}
    </div>
  )
}
const mapStateToProps = (state) => ({
  profile: state.profile.profile
})

export default connect(mapStateToProps, { createEmptyProfile, getCurrentProfile, loginFacebook })(Dashboard) 