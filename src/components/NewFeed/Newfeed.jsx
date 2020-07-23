import React from "react";
import { connect } from "react-redux";
import CreatePost from "../Profile/ProfileTimeLine/CreatePost";
import AllPost from "../Profile/ProfileTimeLine/AllPost";
import { StoreContext } from "../../ThemeContext";
import {getCurrentProfile} from "../../actions/profile"
import { getNewsFeed } from "../../actions/post";
import WeatherSection from './WeatherSection'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Newfeed({ profile, user,getCurrentProfile,getNewsFeed }) {
  React.useEffect(() => {
    getCurrentProfile()
    getNewsFeed()
  
  }, [])
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  
  let { navBarAppear } = React.useContext(StoreContext);
  navBarAppear[1](true);
  return (
    <>
    <div style={{ height: "90px" }}></div>
    {
      profile && user
      ? <div className="container">
      <div className="row">
        {/* Main Content */}
        <main className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
          <div id="newsfeed-items-grid">
            {/* News Feed Form  */}
            
            <CreatePost
              modalIsOpen={modalIsOpen}
              setIsOpen={setIsOpen}
            ></CreatePost>

            {user._id === profile.userId._id ||
            profile.friendList.map((elm) => elm._id).includes(user._id) ? (
              <>
                <div className="new-post-wrapper">
                  <div className="new-post-content">
                    <div className="new-post-header">
                      <div
                        style={{
                          backgroundImage: "url(" + `${user.avatar}` + ")",
                        }}
                        className="avatar-wrapper"
                      ></div>
                      <div onClick={openModal} className="new-post-input">
                        <span style={{ fontSize: "15px" }}>
                          {user._id === profile.userId._id
                            ? " What are you thinking ?"
                            : "Write something for your friend !!!"}
                        </span>
                      </div>
                    </div>
                    {/* <div className="new-post-bottom"></div> */}
                  </div>
                </div>
                <AllPost></AllPost>
              </>
            ) : (
              <>
                {!user ? (
                  <>
                    <div
                      style={{ textAlign: "center" }}
                      className="login-to-continue"
                    >
                      <div className="login-to-continue-content">
                        <h2>
                          {profile.userId
                            ? profile.userId.firstName +
                              " " +
                              profile.userId.lastName
                            : ""}{" "}
                          joined BNET
                        </h2>
                        <p>
                          To connect with{" "}
                          {profile.userId
                            ? profile.userId.firstName +
                              " " +
                              profile.userId.lastName
                            : ""}
                          , register to BNET today.{" "}
                        </p>
                        <button className="btn btn-success btn-md-2">
                          Register
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <AllPost></AllPost>
                  </>
                )}
              </>
            )}

            {/* ... end News Feed Form  */}
          </div>
        </main>
        {/* ... end Main Content */}
        {/* Left Sidebar */}
        <aside className="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">
        <WeatherSection user={user}></WeatherSection>
   
          <div className="ui-block">
            <div className="ui-block-title">
              <h6 className="title">Pages You May Like</h6>
              <a href="#" className="more">
                <svg className="olymp-three-dots-icon">
                  <use xlinkHref="#olymp-three-dots-icon" />
                </svg>
              </a>
            </div>
            {/* W-Friend-Pages-Added */}
            <ul className="widget w-friend-pages-added notification-list friend-requests">
              <li className="inline-items">
                <div className="author-thumb">
                  <img src="img/avatar41-sm.jpg" alt="author" />
                </div>
                <div className="notification-event">
                  <a href="#" className="h6 notification-friend">
                    The Marina Bar
                  </a>
                  <span className="chat-message-item">Restaurant / Bar</span>
                </div>
                <span
                  className="notification-icon"
                  data-toggle="tooltip"
                  data-placement="top"
                  data-original-title="ADD TO YOUR FAVS"
                >
                  <a href="#">
                    <svg className="olymp-star-icon">
                      <use xlinkHref="#olymp-star-icon" />
                    </svg>
                  </a>
                </span>
              </li>
              <li className="inline-items">
                <div className="author-thumb">
                  <img src="img/avatar42-sm.jpg" alt="author" />
                </div>
                <div className="notification-event">
                  <a href="#" className="h6 notification-friend">
                    Tapronus Rock
                  </a>
                  <span className="chat-message-item">Rock Band</span>
                </div>
                <span
                  className="notification-icon"
                  data-toggle="tooltip"
                  data-placement="top"
                  data-original-title="ADD TO YOUR FAVS"
                >
                  <a href="#">
                    <svg className="olymp-star-icon">
                      <use xlinkHref="#olymp-star-icon" />
                    </svg>
                  </a>
                </span>
              </li>
              <li className="inline-items">
                <div className="author-thumb">
                  <img src="img/avatar43-sm.jpg" alt="author" />
                </div>
                <div className="notification-event">
                  <a href="#" className="h6 notification-friend">
                    Pixel Digital Design
                  </a>
                  <span className="chat-message-item">Company</span>
                </div>
                <span
                  className="notification-icon"
                  data-toggle="tooltip"
                  data-placement="top"
                  data-original-title="ADD TO YOUR FAVS"
                >
                  <a href="#">
                    <svg className="olymp-star-icon">
                      <use xlinkHref="#olymp-star-icon" />
                    </svg>
                  </a>
                </span>
              </li>
              <li className="inline-items">
                <div className="author-thumb">
                  <img src="img/avatar44-sm.jpg" alt="author" />
                </div>
                <div className="notification-event">
                  <a href="#" className="h6 notification-friend">
                    Thompson’s Custom Clothing Boutique
                  </a>
                  <span className="chat-message-item">Clothing Store</span>
                </div>
                <span
                  className="notification-icon"
                  data-toggle="tooltip"
                  data-placement="top"
                  data-original-title="ADD TO YOUR FAVS"
                >
                  <a href="#">
                    <svg className="olymp-star-icon">
                      <use xlinkHref="#olymp-star-icon" />
                    </svg>
                  </a>
                </span>
              </li>
              <li className="inline-items">
                <div className="author-thumb">
                  <img src="img/avatar45-sm.jpg" alt="author" />
                </div>
                <div className="notification-event">
                  <a href="#" className="h6 notification-friend">
                    Crimson Agency
                  </a>
                  <span className="chat-message-item">Company</span>
                </div>
                <span
                  className="notification-icon"
                  data-toggle="tooltip"
                  data-placement="top"
                  data-original-title="ADD TO YOUR FAVS"
                >
                  <a href="#">
                    <svg className="olymp-star-icon">
                      <use xlinkHref="#olymp-star-icon" />
                    </svg>
                  </a>
                </span>
              </li>
              <li className="inline-items">
                <div className="author-thumb">
                  <img src="img/avatar46-sm.jpg" alt="author" />
                </div>
                <div className="notification-event">
                  <a href="#" className="h6 notification-friend">
                    Mannequin Angel
                  </a>
                  <span className="chat-message-item">Clothing Store</span>
                </div>
                <span
                  className="notification-icon"
                  data-toggle="tooltip"
                  data-placement="top"
                  data-original-title="ADD TO YOUR FAVS"
                >
                  <a href="#">
                    <svg className="olymp-star-icon">
                      <use xlinkHref="#olymp-star-icon" />
                    </svg>
                  </a>
                </span>
              </li>
            </ul>
            {/* .. end W-Friend-Pages-Added */}
          </div>
        </aside>
        {/* ... end Left Sidebar */}
        {/* Right Sidebar */}
        <aside className="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12">
              <div className="ui-block">
            {/* W-Calendar */}
            <Calendar
          // onChange={this.onChange}
          value={new Date()}
        />
            {/* ... end W-Calendar */}{" "}
          </div>
       
          <div className="ui-block">
            {/* W-Action */}
            <div className="widget w-action">
              <img src="img/logo.png" alt="Olympus" />
              <div className="content">
                <h4 className="title">OLYMPUS</h4>
                <span>THE BEST SOCIAL NETWORK THEME IS HERE!</span>
                <a
                  href="01-LandingPage.html"
                  className="btn btn-bg-secondary btn-md"
                >
                  Register Now!
                </a>
              </div>
            </div>
            {/* ... end W-Action */}
          </div>
        </aside>
        {/* ... end Right Sidebar */}
      </div>
    </div> :""

    }
      
     
    </>
  );
}
const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  user: state.auth.user,
});

export default connect(mapStateToProps, {getCurrentProfile,getNewsFeed})(Newfeed);
