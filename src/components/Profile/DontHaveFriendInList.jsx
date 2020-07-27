import React from "react";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  addToFriendRequest,
  deleteFriendRequest,
  getProfileById,
  acceptFriendRequest,
  deleteFriendRequestPending
} from "../../actions/profile";
import { Link, useParams } from "react-router-dom";

function DontHaveFriendInList({
  profile,
  user,
  getCurrentProfile,
  addToFriendRequest,
  deleteFriendRequest,
  getProfileById,
  acceptFriendRequest,
  deleteFriendRequestPending
}) {
  return (
    <div>
      {
        //if chua ai dung gi nhau
        profile.friendRequestPending.filter(
          (friendId) => friendId._id == user._id
        ).length == 0 &&
        profile.friendRequestSent.filter((friendId) => friendId._id == user._id)
          .length == 0 ? (
          <Link
            onClick={() => addToFriendRequest(profile.userId._id)}
            to={`/profile/${profile.userId._id}/timeline`}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="btn btn-control bg-blue my-friend-route-btn "
          >
            <i style={{ marginRight: "10px" }} class="fas fa-user-plus"></i>
            <span>Send Friend Request</span>
          </Link>
        ) : profile.friendRequestPending.filter(
            (friendId) => friendId._id == user._id
          ).length > 0 ? (
          <Link
            onClick={() => deleteFriendRequest(profile.userId._id, "client")}
            to={`/profile/${profile.userId._id}/timeline`}
            style={{ background: "crimson" }}
            className="btn btn-control my-friend-route-btn cancle-request "
          >
            <i style={{ marginRight: "10px" }} class="fas fa-user-times"></i>{" "}
            <span>Cancle Friend Request</span>
          </Link>
        ) : profile.friendRequestSent.filter(
            (friendId) => friendId._id == user._id
          ).length > 0 ? (
          <>
            <div className="buttons">
              <button
                onClick={() =>
                  deleteFriendRequestPending(profile.userId._id, "client")
                }
                style={{ marginRight: "10px" }}
                type="button"
                class="btn btn-danger"
              >
                Delete Friend Request
              </button>
              <button
                onClick={() =>
                  acceptFriendRequest(profile.userId._id, "client")
                }
                type="button"
                class="btn btn-primary"
              >
                Accept Friend Request
              </button>
            </div>
            {/* <Link
              onClick={() => acceptFriendRequest(profile.userId._id, "client")}
              to={`/profile/${profile.userId._id}/timeline`}
              style={{ background: "crimson" }}
              className="btn btn-control my-friend-route-btn accept-request "
            >
              <i style={{ marginRight: "10px" }} class="fas fa-user-plus"></i>{" "}
              <span>Accept Friend Request</span>
            </Link>
            <Link
              onClick={() => deleteFriendRequest(profile.userId._id, "client")}
              to={`/profile/${profile.userId._id}/timeline`}
              style={{ background: "crimson" }}
              className="btn btn-control my-friend-route-btn accept-request "
            >
              <i style={{ marginRight: "10px" }} class="fas fa-user-plus"></i>{" "}
              <span>Remove Friend Request</span>
            </Link> */}
          </>
        ) : (
          ""
        )
      }
      {/* {
        //if loggin user have this wallID on list
        profile.friendRequestPending.filter(
          (friendId) => friendId._id == user._id
        ).length > 0 ? (
          <>
            <Link
              onClick={() => deleteFriendRequest(profile.userId._id)}
              to={`/profile/${profile.userId._id}/timeline`}
              style={{ background: "crimson" }}
              className="btn btn-control my-friend-route-btn cancle-request "
            >
              <i style={{ marginRight: "10px" }} class="fas fa-user-times"></i>{" "}
              <span>Accpet Friend Request</span>
            </Link>
          </>
        ) : profile.friendRequestSent.filter(
            (friendId) => friendId._id == user._id
          ).length > 0 ? (
          <Link
            onClick={() => addToFriendRequest(profile.userId._id)}
            to={`/profile/${profile.userId._id}/timeline`}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="btn btn-control bg-blue my-friend-route-btn "
          >
            <i style={{ marginRight: "10px" }} class="fas fa-user-plus"></i>
            <span>Cancle Friend Request</span>
          </Link>
        ) : (
          <Link
            onClick={() => addToFriendRequest(profile.userId._id)}
            to={`/profile/${profile.userId._id}/timeline`}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="btn btn-control bg-blue my-friend-route-btn add-friend-btn"
          >
            <i style={{ marginRight: "10px" }} class="fas fa-user-plus"></i>
            <span>Add Friend Request</span>
          </Link>
        )
      } */}
    </div>
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
  acceptFriendRequest,
  deleteFriendRequestPending
})(DontHaveFriendInList);
