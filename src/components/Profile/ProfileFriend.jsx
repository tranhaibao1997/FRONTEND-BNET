import React from "react";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Moment from "react-moment";
function ProfileFriend({ profile, user }) {
  let wallId = useParams().id;

  function addFriend() {}

  return (
    <>
      {profile ? (
        <div className="container">
          <div className="row">
            <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="ui-block responsive-flex">
                <div className="ui-block-title">
                  <div className="h6 title">
                    {profile.userId.firstName}’s Friends (
                    {profile.friendList.length})
                  </div>
                  <form className="w-search">
                    <div className="form-group with-button is-empty">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Search Friends..."
                      />
                      <button>
                        <svg className="olymp-magnifying-glass-icon">
                          <use xlinkHref="#olymp-magnifying-glass-icon" />
                        </svg>
                      </button>
                      <span className="material-input" />
                    </div>
                  </form>
                  <a href="#" className="more">
                    <svg className="olymp-three-dots-icon">
                      <use xlinkHref="#olymp-three-dots-icon" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="row">
                
                 
                    {/* Friend Item */}
                    {profile.friendList.map((friend) => (
                      <>
                      <div className="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="ui-block">
                      <Link to={`/profile/${friend._id}/timeline`}>
                          <div style={{height:"auto",minHeight:"0px"}} className="friend-item">
                            <div className="friend-header-thumb">
                              <img
                                style={{ maxWidth: "100%",height:"75px" }}
                                src={friend.banner}
                                alt="friend"
                              />
                            </div>
                            <div className="friend-item-content">
                            
                              <div className="friend-avatar">
                                <div className="author-thumb">
                                  <img
                                    style={{ maxWidth: "100%" }}
                                    src={friend.avatar}
                                    alt="author"
                                  />
                                </div>
                                <div className="author-content">
                                  <a href="#" className="h5 author-name">
                                    {friend.firstName + " " + friend.lastName}
                                  </a>
                                  <div
                                    style={{ color: "#515365" }}
                                    className="country"
                                  >
                                    Joined At:{" "}
                                    {
                                      <Moment
                                        format="DD/MM/YYYY"
                                        date={friend.createdAt}
                                      ></Moment>
                                    }
                                  </div>
                                </div>
                              </div>
                              <div
                                className="swiper-container"
                                data-slide="fade"
                              >
                                <div className="swiper-wrapper">
                                  <div className="swiper-slide">
                                    <div
                                      className="control-block-button"
                                      data-swiper-parallax={-100}
                                    >
                                      {profile.userId._id == user._id ? (
                                        <>
                                          <div className="buttons">
                                            <button
                                              style={{ marginRight: "10px" }}
                                              type="button"
                                              className="btn btn-danger"
                                            >
                                              Unfriend
                                            </button>
                                            <button
                                              type="button"
                                              className="btn btn-success"
                                            >
                                              Send Messages
                                            </button>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <a
                                            onClick={() => addFriend(wallId)}
                                            href="#"
                                            className="btn btn-control bg-blue"
                                          >
                                            <svg className="olymp-happy-face-icon">
                                              <use xlinkHref="#olymp-happy-face-icon" />
                                            </svg>
                                          </a>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                {/* If we need pagination */}
                                <div className="swiper-pagination" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    
                      </div>
                        
                      </>
                    ))}
                    {/* ... end Friend Item */}{" "}
                  
                
              </div>
            </div>
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

export default connect(mapStateToProps, {})(ProfileFriend);
