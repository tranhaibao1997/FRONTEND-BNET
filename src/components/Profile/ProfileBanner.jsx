import React from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  addToFriendRequest,
  deleteFriendRequest,
  getProfileById,
  unFriend,
} from "../../actions/profile";
import { useEffect } from "react";
import { useState } from "react";
import DontHaveFriendInList from "./DontHaveFriendInList";

function ProfileBanner({
  user,
  profile,
  id,
  addToFriendRequest,
  deleteFriendRequest,
  getProfileById,
  unFriend,
}) {
  let onWallId = useParams().id;
  let [tab, setTab] = useState("");
  useEffect(() => {
    getProfileById(onWallId);
    if (window.location.pathname.includes("timeline")) {
      setTab("timeline");
    }
    if (window.location.pathname.includes("about")) {
      setTab("about");
    }
    if (window.location.pathname.includes("friend")) {
      setTab("friend");
    }
    if (window.location.pathname.includes("photos")) {
      setTab("photos");
    }
    if (window.location.pathname.includes("videos")) {
      setTab("videos");
    }
  }, [window.location.pathname, onWallId]);

  console.log(tab, "This is my tab name");

  return (
    <>
      {profile ? (
        <div>
          <div className="container">
            <div className="row">
              <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="ui-block">
                  <div className="top-header">
                    <div className="top-header-thumb">
                      <img
                        src={profile.userId ? profile.userId.banner : ""}
                        style={{ height: "420px" }}
                        alt="nature"
                      />
                    </div>
                    <div className="profile-section">
                      <div className="row">
                        <div className="col col-lg-5 col-md-5 col-sm-12 col-12">
                          <ul className="profile-menu">
                            <li>
                              <Link
                                onClick={() => setTab("timeline")}
                                to={`/profile/${id}/timeline`}
                                className={tab == "timeline" ? "active" : ""}
                              >
                                Timeline
                              </Link>
                            </li>
                            <li>
                              <Link
                                onClick={() => setTab("about")}
                                to={`/profile/${id}/about`}
                                className={tab == "about" ? "active" : ""}
                              >
                                About
                              </Link>
                            </li>
                            <li>
                              <Link
                                onClick={() => setTab("friends")}
                                to={`/profile/${id}/friend`}
                                className={tab == "friend" ? "active" : ""}
                              >
                                Friends
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="col col-lg-5 ml-auto col-md-5 col-sm-12 col-12">
                          <ul className="profile-menu">
                            <li>
                              <Link
                                onClick={() => setTab("photos")}
                                to={`/profile/${id}/photos`}
                                className={tab == "photos" ? "active" : ""}
                              >
                                Photos
                              </Link>
                            </li>
                            <li>
                              <a
                                onClick={() => setTab("videos")}
                                href="09-ProfilePage-Videos.html"
                                className={tab == "videos" ? "active" : ""}
                              >
                                Videos
                              </a>
                            </li>
                            <li>
                              <div className="more">
                                <svg className="olymp-three-dots-icon">
                                  <use xlinkHref="#olymp-three-dots-icon" />
                                </svg>
                                <ul className="more-dropdown more-with-triangle">
                                  <li>
                                    <a href="#">Report Profile</a>
                                  </li>
                                  <li>
                                    <a href="#">Block Profile</a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div
                        style={{ display: "flex" }}
                        className="control-block-button"
                      >
                        {user && profile.userId ? (
                          <>
                            {profile.userId._id === user._id ? (
                              <>
                                <div className="btn btn-control bg-primary more">
                                  <svg className="olymp-settings-icon">
                                    <use xlinkHref="#olymp-settings-icon" />
                                  </svg>
                                  <ul className="more-dropdown more-with-triangle triangle-bottom-right">
                                    <li>
                                      <a
                                        href="#"
                                        data-toggle="modal"
                                        data-target="#update-header-photo"
                                      >
                                        Update Profile Photo
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="#"
                                        data-toggle="modal"
                                        data-target="#update-header-photo"
                                      >
                                        Update Header Photo
                                      </a>
                                    </li>
                                    <li>
                                      <a href="29-YourAccount-AccountSettings.html">
                                        Account Settings
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </>
                            ) : (
                              //nếu đang trong profile ng ta
                              <>
                                {profile.friendList.filter(
                                  (friend) => friend._id == user._id
                                ).length > 0 ? (
                                  //neu wallId nay trong friendlist
                                  <>
                                    <div className="buttons">
                                      <button
                                        onClick={() =>
                                          unFriend(profile.userId._id)
                                        }
                                        style={{ marginRight: "10px" }}
                                        type="button"
                                        class="btn btn-danger"
                                      >
                                        Unfriend
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-success"
                                      >
                                        Send Messages
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  //neu wallId nay khong co trong friend list

                                  <DontHaveFriendInList></DontHaveFriendInList>
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="top-header-author">
                      <div
                        async
                        style={{
                          backgroundImage:
                            "url(" +
                            `${profile.userId ? profile.userId.avatar : ""}` +
                            ")",
                        }}
                        className="author-thumb"
                      >
                        {/* <img src={profile.userId.avatar} style={{ borderRadius: "50$ !important", maxWidth: "100%" }} alt="author" /> */}
                      </div>
                      <div className="author-content">
                        <a
                          href="02-ProfilePage.html"
                          className="h4 author-name"
                        >
                          {profile.userId ? profile.userId.firstName : ""}{" "}
                          {profile.userId ? profile.userId.lastName : ""}
                        </a>
                        <div className="country">{profile.birthPlace}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "loading"
      )}
    </>
  );
}
const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  addToFriendRequest,
  deleteFriendRequest,
  getProfileById,
  unFriend,
})(ProfileBanner);
