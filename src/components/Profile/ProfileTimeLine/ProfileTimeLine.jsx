import React from "react";
import { connect } from "react-redux";
import CreatePost from "./CreatePost";
import AllPost from "./AllPost";
import {Link} from 'react-router-dom'

function ProfileTimeLine({ profile, user }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  let allImgs = [];

  if (profile) {
    console.log(profile.uploadedImages.flat(1), "PHOTOOOOO");
    allImgs = profile.uploadedImages.flat(1).slice(0, 9)
  }
  console.log(allImgs, "TOAN BO HINH")


  return (
    <>
      {profile && user ? (
        <div className="container">
          <CreatePost></CreatePost>
          <div className="row">
            {/* Main Content */}
            <div className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
              <div id="newsfeed-items-grid">
                {/* News Feed Form  */}
                <CreatePost
                  modalIsOpen={modalIsOpen}
                  setIsOpen={setIsOpen}
                ></CreatePost>

                {user._id === profile.userId._id || profile.friendList.map(elm => elm._id).includes(user._id) ? (
                  <>
                    <div className="new-post-wrapper">
                      <div className="new-post-content">
                        <div className="new-post-header">
                          <div style={{
                            backgroundImage:
                              "url(" +
                              `${user.avatar}` +
                              ")",
                          }} className="avatar-wrapper">

                          </div>
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
                      {
                        !user ? <>
                          <div style={{ textAlign: "center" }} className="login-to-continue">
                            <div className="login-to-continue-content">
                              <h2>
                                {profile.userId ? profile.userId.firstName +
                                  " " +
                                  profile.userId.lastName : ""}{" "}
                          joined BNET
                        </h2>
                              <p>
                                To connect with{" "}
                                {profile.userId ? profile.userId.firstName +
                                  " " +
                                  profile.userId.lastName : ""}
                          , register to BNET today.{" "}
                              </p>
                              <button className="btn btn-success btn-md-2">Register</button>
                            </div>
                          </div>

                        </>
                          : <>
                            <AllPost></AllPost>
                          </>
                      }

                    </>
                  )}

                {/* ... end News Feed Form  */}
              </div>
            </div>
            {/* ... end Main Content */}
            {/* Left Sidebar */}
            <div className="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">
              <div className="ui-block">
                <div className="ui-block-title">
                  <h6 className="title">Profile Intro</h6>
                </div>
                <div className="ui-block-content">
                  {/* W-Personal-Info */}
                  <ul className="widget w-personal-info item-block">
                    <li>
                      <span className="title">About Me:</span>
                      <span className="text">{profile.aboutMe}</span>
                    </li>
                    <li>
                      <span className="title">Favourite TV Shows:</span>
                      <span className="text">
                        {profile.allHobbies ? profile.allHobbies.favoriteTVShow : ""}
                      </span>
                    </li>
                    <li>
                      <span className="title">
                        Favourite Music Bands / Artists:
                      </span>
                      <span className="text">
                        {profile.allHobbies ? profile.allHobbies.favoriteMusicBand : ""}
                      </span>
                    </li>
                  </ul>
                  {/* .. end W-Personal-Info */}
                  {/* W-Socials */}
                  <div className="widget w-socials">
                    <h6 className="title">Other Social Networks:</h6>
                    <a href="#" className="social-item bg-facebook">
                      <i className="fab fa-facebook-f" aria-hidden="true" />
                      Facebook
                    </a>
                    <a href="#" className="social-item bg-twitter">
                      <i className="fab fa-twitter" aria-hidden="true" />
                      Twitter
                    </a>
                    <a href="#" className="social-item bg-github">
                      <i className="fab fa-github"></i>
                      Github
                    </a>
                  </div>
                  {/* ... end W-Socials */}
                </div>
              </div>
            </div>
            {/* ... end Left Sidebar */}
            {/* Right Sidebar */}
            <div className="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12">
              <div className="ui-block">
                <div className="ui-block-title">
                  <h6 className="title">Last Photos</h6>
                </div>
                <div className="ui-block-content">
                  {/* W-Latest-Photo */}
                  <ul className="widget w-last-photo js-zoom-gallery">
                    {
                      allImgs.map(img => (
                        <li>
                          <a href="">
                            <img async src={img.imgLink} alt="photo" />
                          </a>
                        </li>
                      ))
                    }

                  </ul>
                  {/* .. end W-Latest-Photo */}
                </div>
              </div>

              <div className="ui-block">
                <div className="ui-block-title">
                  <h6 className="title">Friends ({profile.friendList.length})</h6>
                </div>
                <div className="ui-block-content">
                  {/* W-Faved-Page */}
                  <ul className="widget w-faved-page js-zoom-gallery">
                    {
                      profile.friendList.map(friend => (
                        <li>
                          <Link to={`/profile/${friend._id}/timeline`}>
                            <img async src={friend.avatar} alt="user" />
                          </Link>
                        </li>
                      ))
                    }
{/* 
                    <li className="all-users">
                      <a href="#">+2</a>
                    </li> */}
                  </ul>
                  {/* .. end W-Faved-Page */}
                </div>
              </div>


            </div>
            {/* ... end Right Sidebar */}
          </div>
        </div>
      ) : (
          ""
        )}
    </>
  );
}
const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(ProfileTimeLine);
