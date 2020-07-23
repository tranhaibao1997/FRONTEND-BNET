import React from "react";
import Emoji from "react-emoji-render";
import Moment from "react-moment";
import Modal from "react-modal";
import Slider from "react-slick";
import { connect } from "react-redux";
import { likePost, addComment, deletePost } from "../../../actions/post";
import CommentBox from "./CommentBox";
import SingleComment from "./SingleComment";
import EditPost from "./EditPost";
import { Link } from "react-router-dom";

function SinglePost({ post, user, likePost, deletePost }) {
  //code modal Post Detail
  function openModal() {
    setIsOpen(true);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1000,
      width: "1100px",
      height: "600px",
      padding: "0px",
      overflow: "auto",
    },
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  //code modal Post Detail

  const [editModalIsOpen, setEditIsOpen] = React.useState(false);

  let [appear, setAppear] = React.useState(false);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  console.log(post);

  return (
    <>
      <EditPost
        editModalIsOpen={editModalIsOpen}
        setEditIsOpen={setEditIsOpen}
        post={post}
      ></EditPost>
      {/* THIS IS DETAIL POST MODAL */}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-content">
          <a
            href="#"
            className="close icon-close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <svg className="olymp-close-icon">
              <use xlinkHref="#olymp-close-icon" />
            </svg>
          </a>
          <div className="modal-body">
            <div className="open-photo-thumb">
              <Slider {...settings}>
                {post.postImg
                  ? post.postImg.map((imgObj) => (
                      <div>
                        <img
                          width={"100%"}
                          height={"100%"}
                          src={imgObj.imgLink}
                          alt={imgObj.imgLink}
                        ></img>
                      </div>
                    ))
                  : post.images.map((img) => (
                      <div>
                        <img
                          width={"100%"}
                          height={"100%"}
                          src={img}
                          alt={img}
                        ></img>
                      </div>
                    ))}
              </Slider>
            </div>
            <div className="open-photo-content">
              <article className="hentry post">
                <div className="post__author author vcard inline-items">
                  <img
                    src={
                      post.author
                        ? post.author.avatar
                          ? post.author.avatar
                          : user.avatar
                        : post.avatar
                    }
                    alt="author123"
                  />
                  <div>
                    <div
                      style={{ display: "inline-flex" }}
                      className="author-date"
                    >
                      <Link
                        className="h6 post__author-name fn"
                        to={`/profile/${
                          post.author._id ? post.author._id : post.author
                        }/timeline`}
                      >
                        {post.author && post.author.lastName
                          ? post.author.firstName + " " + post.author.lastName
                          : post.name}
                      </Link>
                      {post.peopleTag.length > 0 ? (
                        <div className="friend-tags">
                          - With
                          {post.peopleTag.map((tag, index) => (
                            <>
                              {index == 0 ? (
                                <Link
                                  target="_blank"
                                  to={`/profile/${tag._id}/timeline`}
                                >
                                  {" "}
                                  {tag.firstName}
                                </Link>
                              ) : (
                                <Link
                                  target="_blank"
                                  to={`/profile/${tag._id}/timeline`}
                                >
                                  {" "}
                                  , {tag.firstName}
                                </Link>
                              )}
                            </>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                      {post.checkIn && (
                        <span>
                          - At <Link>{post.checkIn}</Link>
                        </span>
                      )}

                      {post.author._id && post.onWall._id ? (
                        <>
                          {post.author._id.toString() !==
                          post.onWall._id.toString() ? (
                            <div style={{ display: "contents" }}>
                              <span>{""}</span>
                              <i
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                className="fas fa-long-arrow-alt-right"
                              ></i>
                              <Link
                                className="h6 post__author-name fn"
                                to={`/profile/${post.onWall._id}/timeline`}
                              >
                                <span>{""}</span>
                                {post.wallOwner}
                              </Link>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      ) : (
                        <>
                          {post.author !== post.onWall ? (
                            <div style={{ display: "contents" }}>
                              <span>{""}</span>
                              <i class="fas fa-long-arrow-alt-right"></i>
                              <a
                                className="h6 post__author-name fn"
                                href="02-ProfilePage.html"
                              >
                                <span>{""}</span>
                                {post.wallOwner}
                              </a>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      )}
                    </div>
                    <div className="post__date">
                      <time className="published" dateTime="2017-03-24T18:18">
                        <Moment date={post.date} fromNow></Moment>
                      </time>
                    </div>
                  </div>
                  {post.author ? (
                    post.author._id == user._id || post.author == user._id ? (
                      <div className="more">
                        <svg className="olymp-three-dots-icon">
                          <use xlinkHref="#olymp-three-dots-icon" />
                        </svg>
                        <ul className="more-dropdown">
                          <li>
                            <a
                              className="edit-delete-post-btn"
                              onClick={() => setEditIsOpen(true)}
                            >
                              Edit Post
                            </a>
                          </li>
                          <li>
                            <a
                              className="edit-delete-post-btn"
                              onClick={() => deletePost(post._id)}
                            >
                              Delete Post
                            </a>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
                <p>{<Emoji text={post.text} />}</p>
                <div
                  style={{ maxHeight: "400px", overflow: "auto" }}
                  className="post-content"
                >
                  
                </div>
                <div
                  style={{ marginBottom: "8px" }}
                  className="post-additional-info inline-items"
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      style={{ marginRight: "3px" }}
                      className="olymp-heart-icon  my-like-icon"
                    >
                      <use xlinkHref="#olymp-heart-icon" />
                    </svg>
                    <span>{post.likes.length || 0} people liked this post</span>
                  </div>

                  <div>
                    <span style={{ marginRight: "14px" }}>
                      {post.comments.length} comment
                    </span>
                    <span>1 share</span>
                  </div>
                </div>

                <div className="post-additional-info inline-items">
                  <a
                    onClick={() => likePost(post._id)}
                    style={{ cursor: "pointer" }}
                    className={
                      post.likes.filter((like) => like._id == user._id).length >
                      0
                        ? "post-add-icon inline-items liked "
                        : "post-add-icon inline-items"
                    }
                  >
                    <svg
                      style={{ marginRight: "3px" }}
                      className={
                        post.likes.filter((like) => like._id == user._id)
                          .length > 0
                          ? "olymp-heart-icon liked "
                          : ""
                      }
                    >
                      <use xlinkHref="#olymp-heart-icon" />
                    </svg>
                    <span>Like</span>
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => setAppear(true)}
                    className="post-add-icon inline-items"
                  >
                    <svg className="olymp-speech-balloon-icon">
                      <use xlinkHref="#olymp-speech-balloon-icon" />
                    </svg>
                    <span style={{ color: "#888da8" }}>Comment</span>
                  </a>
                  <a href="#" className="post-add-icon inline-items">
                    <svg className="olymp-share-icon">
                      <use xlinkHref="#olymp-share-icon" />
                    </svg>
                    <span style={{ color: "#888da8" }}>Share</span>
                  </a>
                </div>
                {/* <div className="control-block-button post-control-button">
                      <a href="#" className="btn btn-control">
                        <svg className="olymp-like-post-icon">
                          <use xlinkHref="#olymp-like-post-icon" />
                        </svg>
                      </a>
                      <a href="#" className="btn btn-control">
                        <svg className="olymp-comments-post-icon">
                          <use xlinkHref="#olymp-comments-post-icon" />
                        </svg>
                      </a>
                      <a href="#" className="btn btn-control">
                        <svg className="olymp-share-icon">
                          <use xlinkHref="#olymp-share-icon" />
                        </svg>
                      </a>
                    </div> */}
              </article>
              {/* .. end Post */}
              {/* Comments */}
              <ul
                className={appear ? "comments-list" : "comments-list disappear"}
              >
                {post.comments.map((cmt) => (
                  <SingleComment
                    cmt={cmt}
                    user={user}
                    post={post}
                  ></SingleComment>
                ))}
              </ul>
              {/* ... end Comments
        <a href="#" className="more-comments">
          View more comments <span>+</span>
        </a>
        {/* Comment Form  */}
              <CommentBox postId={post._id} setAppear={setAppear}></CommentBox>
              {/* ... end Comment Form  */}{" "}
            </div>
          </div>
        </div>
      </Modal>
      {/* THIS IS DETAIL POST MODAL */}

      <div className="ui-block">
        {/* Post */}
        <article className="hentry post">
          <div className="post__author author vcard inline-items">
            <img
              src={
                post.author
                  ? post.author.avatar
                    ? post.author.avatar
                    : user.avatar
                  : post.avatar
              }
              alt="author123"
            />
            <div>
              <div style={{ display: "inline-flex" }} className="author-date">
                <Link
                  className="h6 post__author-name fn"
                  to={`/profile/${
                    post.author._id ? post.author._id : post.author
                  }/timeline`}
                >
                  {post.author && post.author.lastName
                    ? post.author.firstName + " " + post.author.lastName
                    : post.name}
                </Link>
                {post.peopleTag.length > 0 ? (
                  <div className="friend-tags">
                    - With
                    {post.peopleTag.map((tag, index) => (
                      <>
                        {index == 0 ? (
                          <Link
                            target="_blank"
                            to={`/profile/${tag._id}/timeline`}
                          >
                            {" "}
                            {tag.firstName}
                          </Link>
                        ) : (
                          <Link
                            target="_blank"
                            to={`/profile/${tag._id}/timeline`}
                          >
                            {" "}
                            , {tag.firstName}
                          </Link>
                        )}
                      </>
                    ))}
                  </div>
                ) : (
                  ""
                )}
                {post.checkIn && (
                  <span>
                    - At <Link>{post.checkIn}</Link>
                  </span>
                )}

                {post.author._id && post.onWall._id ? (
                  <>
                    {post.author._id.toString() !==
                    post.onWall._id.toString() ? (
                      <div style={{ display: "contents" }}>
                        <span>{""}</span>
                        <i
                          style={{ display: "flex", alignItems: "center" }}
                          className="fas fa-long-arrow-alt-right"
                        ></i>
                        <Link
                          className="h6 post__author-name fn"
                          to={`/profile/${post.onWall._id}/timeline`}
                        >
                          <span>{""}</span>
                          {post.wallOwner}
                        </Link>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <>
                    {post.author !== post.onWall ? (
                      <div style={{ display: "contents" }}>
                        <span>{""}</span>
                        <i class="fas fa-long-arrow-alt-right"></i>
                        <a
                          className="h6 post__author-name fn"
                          href="02-ProfilePage.html"
                        >
                          <span>{""}</span>
                          {post.wallOwner}
                        </a>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
              <div className="post__date">
                <time className="published" dateTime="2017-03-24T18:18">
                  <Moment date={post.date} fromNow></Moment>
                </time>
              </div>
            </div>
            {post.author ? (
              post.author._id == user._id || post.author == user._id ? (
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-dropdown">
                    <li>
                      <a
                        className="edit-delete-post-btn"
                        onClick={() => setEditIsOpen(true)}
                      >
                        Edit Post
                      </a>
                    </li>
                    <li>
                      <a
                        className="edit-delete-post-btn"
                        onClick={() => deletePost(post._id)}
                      >
                        Delete Post
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
          <p>{<Emoji text={post.text} />}</p>
          <div
            style={{ maxHeight: "400px", overflow: "auto" }}
            className="post-content"
          >
            {post.postImg
              ? post.postImg.map((imgObj) => (
                  <img
                    async
                    onClick={openModal}
                    style={{ marginTop: "20px", cursor: "pointer" }}
                    src={imgObj.imgLink}
                    alt={imgObj.imgLink}
                  ></img>
                ))
              : post.images.map((img) => (
                  <img
                    async
                    onClick={openModal}
                    style={{ marginTop: "20px", cursor: "pointer" }}
                    src={img}
                    alt={img}
                  ></img>
                ))}
          </div>
          <div
            style={{ marginBottom: "8px",position:"relative" }}
            className="post-additional-info inline-items"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <svg
                style={{ marginRight: "3px" }}
                className="olymp-heart-icon  my-like-icon"
              >
                <use xlinkHref="#olymp-heart-icon" />
              </svg>
              <span>{post.likes.length || 0} people liked this post</span>
            </div>
            <ul className="like-people-list">
              <li>Bao,</li>
              <li>Bao,</li>
              <li>Bao,</li>
              <li>Bao,</li>
            </ul>

            <div>
              <span style={{ marginRight: "14px" }}>
                {post.comments.length} comment
              </span>
              <span>1 share</span>
            </div>
          </div>

          <div className="post-additional-info inline-items">
            <a
              onClick={() => likePost(post._id)}
              style={{ cursor: "pointer" }}
              className={
                post.likes.filter((like) => like._id == user._id).length > 0
                  ? "post-add-icon inline-items liked "
                  : "post-add-icon inline-items"
              }
            >
              <svg
                style={{ marginRight: "3px" }}
                className={
                  post.likes.filter((like) => like._id == user._id).length > 0
                    ? "olymp-heart-icon liked "
                    : ""
                }
              >
                <use xlinkHref="#olymp-heart-icon" />
              </svg>
              <span>Like</span>
            </a>
            <a
              style={{ cursor: "pointer" }}
              onClick={() => setAppear(true)}
              className="post-add-icon inline-items"
            >
              <svg className="olymp-speech-balloon-icon">
                <use xlinkHref="#olymp-speech-balloon-icon" />
              </svg>
              <span style={{ color: "#888da8" }}>Comment</span>
            </a>
            <a href="#" className="post-add-icon inline-items">
              <svg className="olymp-share-icon">
                <use xlinkHref="#olymp-share-icon" />
              </svg>
              <span style={{ color: "#888da8" }}>Share</span>
            </a>
          </div>
          {/* <div className="control-block-button post-control-button">
                      <a href="#" className="btn btn-control">
                        <svg className="olymp-like-post-icon">
                          <use xlinkHref="#olymp-like-post-icon" />
                        </svg>
                      </a>
                      <a href="#" className="btn btn-control">
                        <svg className="olymp-comments-post-icon">
                          <use xlinkHref="#olymp-comments-post-icon" />
                        </svg>
                      </a>
                      <a href="#" className="btn btn-control">
                        <svg className="olymp-share-icon">
                          <use xlinkHref="#olymp-share-icon" />
                        </svg>
                      </a>
                    </div> */}
        </article>
        {/* .. end Post */}
        {/* Comments */}
        <ul className={appear ? "comments-list" : "comments-list disappear"}>
          {post.comments.map((cmt) => (
            <SingleComment cmt={cmt} user={user} post={post}></SingleComment>
          ))}
        </ul>
        {/* ... end Comments
        <a href="#" className="more-comments">
          View more comments <span>+</span>
        </a>
        {/* Comment Form  */}
        <CommentBox postId={post._id} setAppear={setAppear}></CommentBox>
        {/* ... end Comment Form  */}{" "}
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { likePost, addComment, deletePost })(
  SinglePost
);
