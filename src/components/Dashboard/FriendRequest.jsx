import React from 'react';
import { connect } from 'react-redux'
import { deleteFriendRequest } from '../../actions/profile'
import {Link} from 'react-router-dom'

function FriendRequest({ profile, deleteFriendRequest }) {
    return (
        <div>
            <div className="ui-block">
                <div className="ui-block-title">
                    <h6 className="title">Friend Requests Sent ({profile.friendRequestSent.length})</h6>

                </div>
                {/* Notification List Frien Requests */}
                <ul className="notification-list friend-requests">
                    {
                        profile ? profile.friendRequestSent.map(friendRQ => {
                            return (
                                <li>
                                    <Link to={`/profile/${friendRQ._id}/timeline`}>
                                    <div className="author-thumb">
                                        <img style={{ maxWidth: "100%" }} src={friendRQ.avatar} alt="author" />
                                    </div>
                                    </Link>
                                   
                                    <div className="notification-event">
                                        <Link to={`/profile/${friendRQ._id}/timeline`} className="h6 notification-friend">{friendRQ.firstName} {friendRQ.lastName}</Link>

                                    </div>
                                    <span className="notification-icon">
                                        {/* <a href="#" className="accept-request">
                                            <span className="icon-add">
                                            <i style={{fontSize:"22px"}} className="fas fa-user"></i>
                                            </span>
                        Accept Friend Request
                      </a> */}
                                       
                                        <button onClick={() => deleteFriendRequest(friendRQ._id,"owner")} className="btn btn-danger">Cancle Friend Request</button>
                                    </span>

                                </li>
                            )
                        }

                        ) : ""
                    }


                </ul>
                {/* ... end Notification List Frien Requests */}
            </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    profile: state.profile.profile
})

export default connect(mapStateToProps, { deleteFriendRequest })(FriendRequest);