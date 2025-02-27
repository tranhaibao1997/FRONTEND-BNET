import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {logout} from '../../actions/auth'

function Navbar({ isAuthenticated, user,logout }) {
  return (
    <div>
      {/* Header-BP */}
      <header
        className={isAuthenticated ? "header" : "header header--logout"}
        id="site-header"
      >
        <div className="page-title">
          <h6>BNET</h6>
        </div>
        <div className="header-content-wrapper">
          <Link to="/" className="link-find-friend">
            Find Friends Around
          </Link>
          {isAuthenticated && user ? (
            <div className="control-block">
             
              <div className="author-page author vcard inline-items more">
                <div className="author-thumb">
                  <img
                    style={{ width: "35px", height: "35px" }}
                    alt="author"
                    src={user.avatar}
                    className="avatar"
                  />
                  <span className="icon-status online" />
                  <div className="more-dropdown more-with-triangle">
                    <div className="mCustomScrollbar" data-mcs-theme="dark">
                      <div className="ui-block-title ui-block-title-small">
                        <h6 className="title">Your Account</h6>
                      </div>
                      <ul className="account-settings">
                        <li>
                          <Link to="/dashboard/personal">
                            <svg className="olymp-menu-icon">
                              <use xlinkHref="#olymp-menu-icon" />
                            </svg>
                            <span>Profile Settings</span>
                          </Link>
                        </li>

                        <li>
                          <Link onClick={logout} >
                            <svg className="olymp-logout-icon">
                              <use xlinkHref="#olymp-logout-icon" />
                            </svg>
                            <span>Log Out</span>
                          </Link>
                        </li>
                      </ul>


                    </div>
                  </div>
                </div>
                <Link to={`/profile/${user._id}/timeline`} className="author-name fn">
                  <div className="author-title">
                    {user.firstName} {user.lastName}
                    <svg className="olymp-dropdown-arrow-icon">
                      <use xlinkHref="#olymp-dropdown-arrow-icon" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
              <div className="form--login-logout">
                <Link to="/login" className="btn btn-primary btn-md-2">
                  Login
                 <div className="ripple-container" />
                </Link>
                <Link to="/login" style={{marginLeft:"10px"}} className="btn btn-success btn-md-2">
                  Register
                  <div className="ripple-container" />
                </Link>
               
              </div>
            )}
        </div>
      </header>
      {/* ... end Header-BP */}
      {/* Responsive Header-BP */}
      <header className="header header-responsive" id="site-header-responsive">
        {/* Google Tag Manager */}
        {/* End Google Tag Manager */}
        <div className="header-content-wrapper">
          <ul className="nav nav-tabs mobile-app-tabs" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#request"
                role="tab"
              >
                <div className="control-icon has-items">
                  <svg className="olymp-happy-face-icon">
                    <use xlinkHref="#olymp-happy-face-icon" />
                  </svg>
                  <div className="label-avatar bg-blue">6</div>
                </div>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#chat" role="tab">
                <div className="control-icon has-items">
                  <svg className="olymp-chat---messages-icon">
                    <use xlinkHref="#olymp-chat---messages-icon" />
                  </svg>
                  <div className="label-avatar bg-purple">2</div>
                </div>
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#search"
                role="tab"
              >
                <svg className="olymp-magnifying-glass-icon">
                  <use xlinkHref="#olymp-magnifying-glass-icon" />
                </svg>
                <svg className="olymp-close-icon">
                  <use xlinkHref="#olymp-close-icon" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
        {/* Tab panes */}
        <div className="tab-content tab-content-responsive">
          <div className="tab-pane " id="request" role="tabpanel">
            <div className="mCustomScrollbar" data-mcs-theme="dark">
              <div className="ui-block-title ui-block-title-small">
                <h6 className="title">FRIEND REQUESTS</h6>
                <a href="#">Find Friends</a>
                <a href="#">Settings</a>
              </div>
              <ul className="notification-list friend-requests">
                <li>
                  <div className="author-thumb">
                    <img src="/img/avatar55-sm.jpg" alt="author" />
                  </div>
                  <div className="notification-event">
                    <a href="#" className="h6 notification-friend">
                      Tamara Romanoff
                    </a>
                    <span className="chat-message-item">
                      Mutual Friend: Sarah Hetfield
                    </span>
                  </div>
                  <span className="notification-icon">
                    <a href="#" className="accept-request">
                      <span className="icon-add without-text">
                        <svg className="olymp-happy-face-icon">
                          <use xlinkHref="#olymp-happy-face-icon" />
                        </svg>
                      </span>
                    </a>
                    <a href="#" className="accept-request request-del">
                      <span className="icon-minus">
                        <svg className="olymp-happy-face-icon">
                          <use xlinkHref="#olymp-happy-face-icon" />
                        </svg>
                      </span>
                    </a>
                  </span>
                  <div className="more">
                    <svg className="olymp-three-dots-icon">
                      <use xlinkHref="#olymp-three-dots-icon" />
                    </svg>
                  </div>
                </li>
                <li>
                  <div className="author-thumb">
                    <img src="/img/avatar56-sm.jpg" alt="author" />
                  </div>
                  <div className="notification-event">
                    <a href="#" className="h6 notification-friend">
                      Tony Stevens
                    </a>
                    <span className="chat-message-item">
                      4 Friends in Common
                    </span>
                  </div>
                  <span className="notification-icon">
                    <a href="#" className="accept-request">
                      <span className="icon-add without-text">
                        <svg className="olymp-happy-face-icon">
                          <use xlinkHref="#olymp-happy-face-icon" />
                        </svg>
                      </span>
                    </a>
                    <a href="#" className="accept-request request-del">
                      <span className="icon-minus">
                        <svg className="olymp-happy-face-icon">
                          <use xlinkHref="#olymp-happy-face-icon" />
                        </svg>
                      </span>
                    </a>
                  </span>
                  <div className="more">
                    <svg className="olymp-three-dots-icon">
                      <use xlinkHref="#olymp-three-dots-icon" />
                    </svg>
                  </div>
                </li>
                <li className="accepted">
                  <div className="author-thumb">
                    <img src="/img/avatar57-sm.jpg" alt="author" />
                  </div>
                  <div className="notification-event">
                    You and{" "}
                    <a href="#" className="h6 notification-friend">
                      Mary Jane Stark
                    </a>{" "}
                    just became friends. Write on{" "}
                    <a href="#" className="notification-link">
                      her wall
                    </a>
                    .
                  </div>
                  <span className="notification-icon">
                    <svg className="olymp-happy-face-icon">
                      <use xlinkHref="#olymp-happy-face-icon" />
                    </svg>
                  </span>
                  <div className="more">
                    <svg className="olymp-three-dots-icon">
                      <use xlinkHref="#olymp-three-dots-icon" />
                    </svg>
                    <svg className="olymp-little-delete">
                      <use xlinkHref="#olymp-little-delete" />
                    </svg>
                  </div>
                </li>
                <li>
                  <div className="author-thumb">
                    <img src="/img/avatar58-sm.jpg" alt="author" />
                  </div>
                  <div className="notification-event">
                    <a href="#" className="h6 notification-friend">
                      Stagg Clothing
                    </a>
                    <span className="chat-message-item">
                      9 Friends in Common
                    </span>
                  </div>
                  <span className="notification-icon">
                    <a href="#" className="accept-request">
                      <span className="icon-add without-text">
                        <svg className="olymp-happy-face-icon">
                          <use xlinkHref="#olymp-happy-face-icon" />
                        </svg>
                      </span>
                    </a>
                    <a href="#" className="accept-request request-del">
                      <span className="icon-minus">
                        <svg className="olymp-happy-face-icon">
                          <use xlinkHref="#olymp-happy-face-icon" />
                        </svg>
                      </span>
                    </a>
                  </span>
                  <div className="more">
                    <svg className="olymp-three-dots-icon">
                      <use xlinkHref="#olymp-three-dots-icon" />
                    </svg>
                  </div>
                </li>
              </ul>
              <a href="#" className="view-all bg-blue">
                Check all your Events
              </a>
            </div>
          </div>
          <div className="tab-pane " id="chat" role="tabpanel">
            <div className="mCustomScrollbar" data-mcs-theme="dark">
              <div className="ui-block-title ui-block-title-small">
                <h6 className="title">Chat / Messages</h6>
                <a href="#">Mark all as read</a>
                <a href="#">Settings</a>
              </div>
              <ul className="notification-list chat-message">
                <li className="message-unread">
                  <div className="author-thumb">
                    <img src="/img/avatar59-sm.jpg" alt="author" />
                  </div>
                  <div className="notification-event">
                    <a href="#" className="h6 notification-friend">
                      Diana Jameson
                    </a>
                    <span className="chat-message-item">
                      Hi James! It’s Diana, I just wanted to let you know that
                      we have to reschedule...
                    </span>
                    <span className="notification-date">
                      <time
                        className="entry-date updated"
                        dateTime="2004-07-24T18:18"
                      >
                        4 hours ago
                      </time>
                    </span>
                  </div>
                  <span className="notification-icon">
                    <svg className="olymp-chat---messages-icon">
                      <use xlinkHref="#olymp-chat---messages-icon" />
                    </svg>
                  </span>
                  <div className="more">
                    <svg className="olymp-three-dots-icon">
                      <use xlinkHref="#olymp-three-dots-icon" />
                    </svg>
                  </div>
                </li>
                <li>
                  <div className="author-thumb">
                    <img src="/img/avatar60-sm.jpg" alt="author" />
                  </div>
                  <div className="notification-event">
                    <a href="#" className="h6 notification-friend">
                      Jake Parker
                    </a>
                    <span className="chat-message-item">
                      Great, I’ll see you tomorrow!.
                    </span>
                    <span className="notification-date">
                      <time
                        className="entry-date updated"
                        dateTime="2004-07-24T18:18"
                      >
                        4 hours ago
                      </time>
                    </span>
                  </div>
                  <span className="notification-icon">
                    <svg className="olymp-chat---messages-icon">
                      <use xlinkHref="#olymp-chat---messages-icon" />
                    </svg>
                  </span>
                  <div className="more">
                    <svg className="olymp-three-dots-icon">
                      <use xlinkHref="#olymp-three-dots-icon" />
                    </svg>
                  </div>
                </li>
                <li>
                  <div className="author-thumb">
                    <img src="/img/avatar61-sm.jpg" alt="author" />
                  </div>
                  <div className="notification-event">
                    <a href="#" className="h6 notification-friend">
                      Elaine Dreyfuss
                    </a>
                    <span className="chat-message-item">
                      We’ll have to check that at the office and see if the
                      client is on board with...
                    </span>
                    <span className="notification-date">
                      <time
                        className="entry-date updated"
                        dateTime="2004-07-24T18:18"
                      >
                        Yesterday at 9:56pm
                      </time>
                    </span>
                  </div>
                  <span className="notification-icon">
                    <svg className="olymp-chat---messages-icon">
                      <use xlinkHref="#olymp-chat---messages-icon" />
                    </svg>
                  </span>
                  <div className="more">
                    <svg className="olymp-three-dots-icon">
                      <use xlinkHref="#olymp-three-dots-icon" />
                    </svg>
                  </div>
                </li>
                <li className="chat-group">
                  <div className="author-thumb">
                    <img src="/img/avatar11-sm.jpg" alt="author" />
                    <img src="/img/avatar12-sm.jpg" alt="author" />
                    <img src="/img/avatar13-sm.jpg" alt="author" />
                    <img src="/img/avatar10-sm.jpg" alt="author" />
                  </div>
                  <div className="notification-event">
                    <a href="#" className="h6 notification-friend">
                      You, Faye, Ed &amp; Jet +3
                    </a>
                    <span className="last-message-author">Ed:</span>
                    <span className="chat-message-item">
                      Yeah! Seems fine by me!
                    </span>
                    <span className="notification-date">
                      <time
                        className="entry-date updated"
                        dateTime="2004-07-24T18:18"
                      >
                        March 16th at 10:23am
                      </time>
                    </span>
                  </div>
                  <span className="notification-icon">
                    <svg className="olymp-chat---messages-icon">
                      <use xlinkHref="#olymp-chat---messages-icon" />
                    </svg>
                  </span>
                  <div className="more">
                    <svg className="olymp-three-dots-icon">
                      <use xlinkHref="#olymp-three-dots-icon" />
                    </svg>
                  </div>
                </li>
              </ul>
              <a href="#" className="view-all bg-purple">
                View All Messages
              </a>
            </div>
          </div>
          <div className="tab-pane " id="notification" role="tabpanel">
            <div className="mCustomScrollbar" data-mcs-theme="dark">
              <div className="ui-block-title ui-block-title-small">
                <h6 className="title">Notifications</h6>
                <a href="#">Mark all as read</a>
                <a href="#">Settings</a>
              </div>
              <ul className="notification-list">
                <li>
                  <div className="author-thumb">
                    <img src="/img/avatar62-sm.jpg" alt="author" />
                  </div>
                  <div className="notification-event">
                    <div>
                      <a href="#" className="h6 notification-friend">
                        Mathilda Brinker
                      </a>{" "}
                      commented on your new{" "}
                      <a href="#" className="notification-link">
                        profile status
                      </a>
                      .
                    </div>
                    <span className="notification-date">
                      <time
                        className="entry-date updated"
                        dateTime="2004-07-24T18:18"
                      >
                        4 hours ago
                      </time>
                    </span>
                  </div>
                  <span className="notification-icon">
                    <svg className="olymp-comments-post-icon">
                      <use xlinkHref="#olymp-comments-post-icon" />
                    </svg>
                  </span>
                  <div className="more">
                    <svg className="olymp-three-dots-icon">
                      <use xlinkHref="#olymp-three-dots-icon" />
                    </svg>
                    <svg className="olymp-little-delete">
                      <use xlinkHref="#olymp-little-delete" />
                    </svg>
                  </div>
                </li>
                <li className="un-read">
                  <div className="author-thumb">
                    <img src="/img/avatar63-sm.jpg" alt="author" />
                  </div>
                  <div className="notification-event">
                    <div>
                      You and{" "}
                      <a href="#" className="h6 notification-friend">
                        Nicholas Grissom
                      </a>{" "}
                      just became friends. Write on{" "}
                      <a href="#" className="notification-link">
                        his wall
                      </a>
                      .
                    </div>
                    <span className="notification-date">
                      <time
                        className="entry-date updated"
                        dateTime="2004-07-24T18:18"
                      >
                        9 hours ago
                      </time>
                    </span>
                  </div>
                  <span className="notification-icon">
                    <svg className="olymp-happy-face-icon">
                      <use xlinkHref="#olymp-happy-face-icon" />
                    </svg>
                  </span>
                  <div className="more">
                    <svg className="olymp-three-dots-icon">
                      <use xlinkHref="#olymp-three-dots-icon" />
                    </svg>
                    <svg className="olymp-little-delete">
                      <use xlinkHref="#olymp-little-delete" />
                    </svg>
                  </div>
                </li>
                <li className="with-comment-photo">
                  <div className="author-thumb">
                    <img src="/img/avatar64-sm.jpg" alt="author" />
                  </div>
                  <div className="notification-event">
                    <div>
                      <a href="#" className="h6 notification-friend">
                        Sarah Hetfield
                      </a>{" "}
                      commented on your{" "}
                      <a href="#" className="notification-link">
                        photo
                      </a>
                      .
                    </div>
                    <span className="notification-date">
                      <time
                        className="entry-date updated"
                        dateTime="2004-07-24T18:18"
                      >
                        Yesterday at 5:32am
                      </time>
                    </span>
                  </div>
                  <span className="notification-icon">
                    <svg className="olymp-comments-post-icon">
                      <use xlinkHref="#olymp-comments-post-icon" />
                    </svg>
                  </span>
                  <div className="comment-photo">
                    <img src="/img/comment-photo1.jpg" alt="photo" />
                    <span>
                      “She looks incredible in that outfit! We should see
                      each...”
                    </span>
                  </div>
                  <div className="more">
                    <svg className="olymp-three-dots-icon">
                      <use xlinkHref="#olymp-three-dots-icon" />
                    </svg>
                    <svg className="olymp-little-delete">
                      <use xlinkHref="#olymp-little-delete" />
                    </svg>
                  </div>
                </li>
                <li>
                  <div className="author-thumb">
                    <img src="/img/avatar65-sm.jpg" alt="author" />
                  </div>
                  <div className="notification-event">
                    <div>
                      <a href="#" className="h6 notification-friend">
                        Green Goo Rock
                      </a>{" "}
                      invited you to attend to his event Goo in{" "}
                      <a href="#" className="notification-link">
                        Gotham Bar
                      </a>
                      .
                    </div>
                    <span className="notification-date">
                      <time
                        className="entry-date updated"
                        dateTime="2004-07-24T18:18"
                      >
                        March 5th at 6:43pm
                      </time>
                    </span>
                  </div>
                  <span className="notification-icon">
                    <svg className="olymp-happy-face-icon">
                      <use xlinkHref="#olymp-happy-face-icon" />
                    </svg>
                  </span>
                  <div className="more">
                    <svg className="olymp-three-dots-icon">
                      <use xlinkHref="#olymp-three-dots-icon" />
                    </svg>
                    <svg className="olymp-little-delete">
                      <use xlinkHref="#olymp-little-delete" />
                    </svg>
                  </div>
                </li>
                <li>
                  <div className="author-thumb">
                    <img src="/img/avatar66-sm.jpg" alt="author" />
                  </div>
                  <div className="notification-event">
                    <div>
                      <a href="#" className="h6 notification-friend">
                        James Summers
                      </a>{" "}
                      commented on your new{" "}
                      <a href="#" className="notification-link">
                        profile status
                      </a>
                      .
                    </div>
                    <span className="notification-date">
                      <time
                        className="entry-date updated"
                        dateTime="2004-07-24T18:18"
                      >
                        March 2nd at 8:29pm
                      </time>
                    </span>
                  </div>
                  <span className="notification-icon">
                    <svg className="olymp-heart-icon">
                      <use xlinkHref="#olymp-heart-icon" />
                    </svg>
                  </span>
                  <div className="more">
                    <svg className="olymp-three-dots-icon">
                      <use xlinkHref="#olymp-three-dots-icon" />
                    </svg>
                    <svg className="olymp-little-delete">
                      <use xlinkHref="#olymp-little-delete" />
                    </svg>
                  </div>
                </li>
              </ul>
              <a href="#" className="view-all bg-primary">
                View All Notifications
              </a>
            </div>
          </div>
          <div className="tab-pane " id="search" role="tabpanel">
            <form className="search-bar w-search notification-list friend-requests">
              <div className="form-group with-button">
                <input
                  className="form-control js-user-search"
                  placeholder="Search here people or pages..."
                  type="text"
                />
              </div>
            </form>
          </div>
        </div>
        {/* ... end  Tab panes */}
      </header>
      {/* ... end Responsive Header-BP */}
      {/* <div className="header-spacer" /> */}
    </div>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {logout})(Navbar);
