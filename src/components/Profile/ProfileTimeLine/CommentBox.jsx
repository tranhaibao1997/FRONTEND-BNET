import React, { useState } from 'react';
import { connect } from 'react-redux'
import { addComment } from '../../../actions/post'


function CommentBox({ user, postId, addComment,setAppear }) {
    let [commentText, setCommentText] = useState("")
    // let [images, setImages] = useState([]);

    function postComment() {
        addComment(postId, { text: commentText })
        setCommentText("")
        setAppear(true)
        
    }


    return (
        <div>
            <form className="comment-form inline-items">
                <div className="post__author author vcard inline-items">
                    <img src={user ? user.avatar : ""} alt="author" />
                    <div className="form-group with-icon-right ">
                        <textarea
                            className="form-control"
                            placeholder="Add your comment..."
                            value={commentText}
                            onChange={(e) => {
                                setCommentText(e.target.value)
                            }}
                            onKeyPress={e => e.key == "Enter" ? postComment() : ""}
                        />
                        {/* <ul className="comment-box-img">
                            {images.map((img) => {
                                return <img src={URL.createObjectURL(img)}></img>;
                            })}
                        </ul> */}

                        <div className="add-options-message">
                            <label htmlFor="file-upload" className="custom-file-upload">
                                <i
                                    style={{ color: "rgba(69,189,98,1)" }}
                                    className="far fa-images"
                                ></i>
                            </label>
                            {/* <input
                                style={{ display: "none" }}
                                id="file-upload"
                                onChange={(e) => setImages(Object.values(e.target.files))}
                                type="file"
                                multiple
                            /> */}
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}
const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps, { addComment })(CommentBox);