import React from "react";
import Slider from "react-slick";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DontHaveFriendInList from "../Profile/DontHaveFriendInList";
import { connect } from "react-redux";
import {
  addToFriendRequest,
  deleteFriendRequest,
  acceptFriendRequest,
  unFriend,
} from "../../actions/profile";

function ProfileCard({
  profile,
  user,
  addToFriendRequest,
  deleteFriendRequest,
  acceptFriendRequest,
  unFriend,
  currentLa,
  currentLong
}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    if (lat1 == 0 && lon1 == 0) {
      return "This user hadn't updated location"
    }
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return `${Math.floor(earthRadiusKm * c * 1000)} m away`;
  }
  return (
    <>
      <div
        className="friend-item"
        style={{ backgroundColor: "white", marginBottom: "20px" }}
      >
        <div className="friend-header-thumb">
          <img
            style={{ maxHeight: "66px" }}
            src={profile.userId.banner}
            alt="friend"
          />
        </div>
        <div className="friend-item-content">
          {/* <div className="more">
            <svg className="olymp-three-dots-icon"><use xlinkHref="#olymp-three-dots-icon" /></svg>
            <ul className="more-dropdown">
              <li>
                <a href="#">Report Profile</a>
              </li>
              <li>
                <a href="#">Block Profile</a>
              </li>
              <li>
                <a href="#">Turn Off Notifications</a>
              </li>
            </ul>
          </div> */}
          <div className="friend-avatar">
          <Link to={`/profile/${profile.userId._id}/timeline`}>
            <div style={{
              backgroundImage:
                "url(" +
                `${profile.userId ? profile.userId.avatar : ""}` +
                ")",
            }} className="author-thumb">
             
         
            </div>
            </Link>
            <div className="author-content">

              <a href="#" className="h5 author-name">
                {profile.userId.firstName + " " + profile.userId.lastName}
              </a>

              <div className="country">{profile.livesIn}</div>
            </div>
          </div>

          <Slider {...settings}>
            <div>
              <div className="swiper-slide ">
                <div className="friend-count">
                  <a href="#" className="friend-count-item">
                    <div className="h6">{profile.friendList.length}</div>
                    <div className="title">Friends</div>
                  </a>
                  <a href="#" className="friend-count-item">
                    <div className="h6">
                      {profile.uploadedImages.flat(1).length}
                    </div>
                    <div className="title">Photos</div>
                  </a>
                </div>
                <div className="buttons">
                  {!user ? (
                    <>
                      <button type="button" className="btn btn-primary">
                        Login To Add{" "}
                      </button>
                    </>
                  ) : user._id == profile.userId._id ? (
                    ""
                  ) : profile.friendList
                    .map((friend) => friend._id)
                    .includes(user._id) ? (
                          <>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              className="control-block-button"
                            >
                              <button
                                onClick={() => unFriend(profile.userId._id)}
                                style={{ marginRight: "10px" }}
                                className="btn btn-danger"
                              >
                                Unfriend
                        </button>
                              <button className="btn btn-success">Chat</button>
                            </div>
                          </>
                        ) : //if chua ai dung gi nhau
                        profile.friendRequestPending.filter(
                          (friendId) => friendId._id == user._id
                        ).length == 0 &&
                          profile.friendRequestSent.filter(
                            (friendId) => friendId._id == user._id
                          ).length == 0 ? (
                            <button
                              className="btn btn-primary"
                              onClick={() => addToFriendRequest(profile.userId._id)}
                            >
                              Add Friend
                            </button>
                          ) : profile.friendRequestPending.filter(
                            (friendId) => friendId._id == user._id
                          ).length > 0 ? (
                              <button
                                onClick={() => deleteFriendRequest(profile.userId._id, "client")}
                                className="btn btn-danger "
                              >
                                Cancle Friend Request
                              </button>
                            ) : profile.friendRequestSent.filter(
                              (friendId) => friendId._id == user._id
                            ).length > 0 ? (
                                <button
                                  onClick={() => acceptFriendRequest(profile.userId._id, "client")}
                                  className="btn btn-primary"
                                >
                                  Accept Friend Request{" "}
                                </button>
                              ) : (
                                ""
                              )}

                </div>
                <span style={{ fontWeight: "bold", color: "#ff5e3a", marginBottom: "20px" }}>
                  {distanceInKmBetweenEarthCoordinates(Number(profile.userId.location.latitude), Number(profile.userId.location.longtitude), currentLa, currentLong)}</span>
              </div>
            </div>
            <div>
              <div className="swiper-slide ">
                <p style={{ textAlign: "center" }} className="friend-about">
                  {profile.aboutMe}
                </p>
                <div className="friend-since">
                  <span>Joined At:</span>
                  <div className="h6">
                    <Moment date={profile.joinDay} fromNow></Moment>
                  </div>
                </div>

              </div>
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  addToFriendRequest,
  deleteFriendRequest,
  acceptFriendRequest,
  unFriend,
})(ProfileCard);
