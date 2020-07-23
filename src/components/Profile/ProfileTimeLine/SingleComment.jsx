import React from 'react';
import Emoji from "react-emoji-render";
import Moment from "react-moment";
import {connect} from 'react-redux'
import {deleteComment} from '../../../actions/post'
import { Link } from 'react-router-dom';

function SingleComment({ cmt, user,deleteComment,post }) {
  console.log(cmt, user)
  return (
    <div>
      <li className="comment-item">
        <div className="post__author author vcard inline-items">
          <img src={cmt.avatar} alt="author" />
          <div className="author-date">
            <a className="h6 post__author-name fn" href="#">
              {cmt.name}
            </a>
            <div className="post__date">
              <time className="published" >
                <Moment date={cmt.date} fromNow></Moment>
              </time>
            </div>
          </div>
          <a href="#" className="more">
            <svg className="olymp-three-dots-icon">
              <use xlinkHref="#olymp-three-dots-icon" />
            </svg>
          </a>
        </div>
        <p>
          <p>{<Emoji text={cmt.text} />}</p>

        </p>
        <a href="#" className="post-add-icon inline-items">
          <svg className="olymp-heart-icon">
            <use xlinkHref="#olymp-heart-icon" />
          </svg>
          <span>{cmt.likes.length}</span>
        </a>
        <a href="#" className="reply">
          Reply
            </a>
        {
          user._id == cmt.user ?
            <Link onClick={()=>deleteComment(post._id,cmt._id)} className="delete" style={{ marginLeft: "20px" }}>
              Delete
                </Link>
            : ""
        }

      </li>
    </div>
  );
}
const mapStateToProps=(state)=>({

})

export default connect(mapStateToProps,{deleteComment})(SingleComment);