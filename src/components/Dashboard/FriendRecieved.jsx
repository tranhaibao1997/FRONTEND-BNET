import React from "react";
import { connect } from "react-redux";
import { deleteFriendRequest } from "../../actions/profile";

function FriendRecieved({ profile, deleteFriendRequest }) {
  return (
    <div>
      <div className="ui-block">
        <div className="ui-block-title">
          <h6 className="title">Friend Requests Recieved ({profile.friendRequestPending.length})</h6>
        </div>
        {/* Notification List Frien Requests */}
        <ul className="notification-list friend-requests">
          {profile
            ? profile.friendRequestPending.map((friendRQ) => {
                return (
                  <li>
                    <div className="author-thumb">
                      <img
                        style={{ maxWidth: "100%" }}
                        src={friendRQ.avatar}
                        alt="author"
                      />
                    </div>
                    <div className="notification-event">
                      <a href="#" className="h6 notification-friend">
                        {friendRQ.firstName} {friendRQ.lastName}
                      </a>
                    </div>
                    <span className="notification-icon">
                      <a href="#" className="accept-request">
                                            <span className="icon-add">
                                            <i style={{fontSize:"22px"}} className="fas fa-user"></i>
                                            </span>
                        Accept Friend Request
                      </a>
                      <a
                        style={{
                          backgroundColor: "crimson",
                          color: "white",
                          cursor: "pointer",
                        }}
                        onClick={() => deleteFriendRequest(friendRQ._id)}
                        className="accept-request request-del"
                      >
                        <span
                          style={{ marginRight: "10px" }}
                          className="icon-minus"
                        >
                          <i
                            style={{ fontSize: "22px" }}
                            className="fas fa-user"
                          ></i>
                        </span>
                        Remove Friend Request
                      </a>
                    </span>
                  </li>
                );
              })
            : ""}
        </ul>
        {/* ... end Notification List Frien Requests */}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  profile: state.profile.profile,
});

export default connect(mapStateToProps, { deleteFriendRequest })(
  FriendRecieved
);
