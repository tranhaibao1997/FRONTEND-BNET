import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { connect } from "react-redux";
import { updatePost } from "../../../actions/post";
import { useState } from "react";
import Emoji from "react-emoji-render";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";
import {StoreContext} from '../../../ThemeContext'

function EditPost({
  editModalIsOpen,
  setEditIsOpen,
  user,
  updatePost,
  profile,
  posts
}) {
  let { editModal, editPostId } = React.useContext(StoreContext);
  let [post, setPost] = React.useState(null);

  console.log(editModal,editPostId)

  async function getPostbyId(id) {
    if(id)
    {
      let post =posts.find(post => post._id===id)
      // setPost(posts.find(post => post._id===id)[0])
      setPost(post)
      setLocation(post.checkIn)
      setTagArray(post.peopleTag)
      setPostBodyText(post.text)
      setTextLength(post.text.length)
      setOldImages(post.postImg)
    }
      
    
    // let res = await Axios.get(
    //   `https://bnet-backend.herokuapp.com/api/post/single/${id}`
    // );
    // setPost(res.data.data);
    // if(res.data.data)
    // {
    //   setLocation(res.data.data.checkIn)
    //   setTagArray(res.data.data.peopleTag)
    //   setPostBodyText(res.data.data.text)
    //   setTextLength(res.data.data.text.length)
    //   setOldImages(res.data.data.postImg)
    // }
   
  }
  React.useEffect(() => {
    getPostbyId(editPostId[0]);
  }, [editPostId[0]]);


  console.log(post, "POST FROM EDIT")

  let [nearbyLocation, setNearbyLocation] = React.useState(null);
  let [location, setLocation] = React.useState(null);
  // let [state, setState] = React.useState({});
  let [tagArray, setTagArray] = React.useState([]);
  // let [tagArrayStr, setTagArrayStr] = React.useState("");
  let [friend, setFriend] = React.useState(null);
  function onSelect(selectedList, selectedItem) {
    console.log(selectedList);
    setTagArray(selectedList);
  } // Function will trigger on select event

  function onRemove(selectedList, selectedItem) {
    setTagArray(selectedList);
  } //
  let wallId = useParams().id;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1000,
      width: "500px",
      padding: "0px",
    },
  };

  function deleteNewImgInPost(index) {
    let imgList = [...newImages];
    imgList.splice(index, 1);
    setNewImages(imgList);
  }
  function deleteOldImgInPost(index) {
    let imgList = [...oldImages];
    imgList.splice(index, 1);
    setOldImages(imgList);
  }

  let [newImages, setNewImages] = useState([]);
  let [oldImages, setOldImages] = useState([]);
  let [textLength, setTextLength] = useState(0);
  let [postBodyText, setPostBodyText] = useState("");
  console.log(newImages, oldImages);

  async function getImgLink() {
    let imageLinks = [];
    let foo = newImages.map(async (img) => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Client-ID 6d47acf7b0cf6a3");

      var formdata = new FormData();
      formdata.append("image", img);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      let res = await fetch(
        "https://cors-anywhere.herokuapp.com/https://api.imgur.com/3/upload",
        requestOptions
      );
      let data = await res.json();
      return data.data.link;
    });
    const bar = await Promise.all(foo);
    return bar;
  }

  // console.log(images, "IMAGESSS");

  console.log(editModal[0],"QUYET DINH MODAL BAT HAY K")
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    editModal[1](false)
  }

  async function editPost() {
    let newImageLinks = await getImgLink();
    let oldImageLinks = oldImages.map((img) => img.imgLink);
    let allImages = newImageLinks.concat(oldImageLinks);

    // console.log(imageLinks);
    let newPost = {
      text: postBodyText,
      images: allImages,
      peopleTag: tagArray,
      checkIn: location,

    };
    console.log(newPost,'huhuuh')
    const bool = await updatePost(post._id, newPost);
    if (bool) {
      editModal[1](false);
    } else {
    }
  }

  const showLocation = (position) => {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    getNearbyLocations(latitude, longitude);
  };

  const errorHandler = (err) => {
    if (err.code == 1) {
      alert("Error: Access is denied!");
    } else if (err.code == 2) {
      alert("Error: Position is unavailable!");
    }
  };

  const getLocation = () => {
    openLocationModal();
    if (navigator.geolocation) {
      // timeout at 60000 milliseconds (60 seconds)
      var options = { timeout: 60000 };
      navigator.geolocation.getCurrentPosition(
        showLocation,
        errorHandler,
        options
      );
    } else {
      alert("Sorry, browser does not support geolocation!");
    }
  };

  async function getNearbyLocations(latitude, longitude) {
    let res = await Axios.get(
      `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&key=AIzaSyCTmTwjNOt-9uWocI3n2BlUqmQYc4AM3SM`
    );
    setNearbyLocation(res.data.results);
  }
  console.log(nearbyLocation);

  const [modalFriendIsOpen, setFriendIsOpen] = React.useState(false);
  function openFriendModal() {
    setFriend(profile.friendList);
    setFriendIsOpen(true);
  }

  function closeFriendModal() {
    setFriendIsOpen(false);
  }

  const [modalLocationIsOpen, setLocationIsOpen] = React.useState(false);
  function openLocationModal() {
    setLocationIsOpen(true);
  }

  function closeLocationModal() {
    setLocationIsOpen(false);
  }

  return (
    <>
   <Modal
        ariaHideApp={false}
        isOpen={editModal[0]}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{ alignItems: "center" }} className="modal-header">
          <h2>Edit Post</h2>
          <i onClick={()=>editModal[1](false)} class="fas fa-times close-modal-icon"></i>
        </div>
        {
          post && <div className="modal-body">
          <div className="modal-info-profile">
            <div
              style={{
                backgroundImage: "url(" + `${user ? user.avatar : ""}` + ")",
              }}
              className="avatar-wrapper"
            ></div>
            <div className="title">
              {user ? user.firstName + " " + user.lastName : ""}
            </div>
            {tagArray.length > 0 ? (
              <div className="friend-tags">
                - With
                {tagArray.map((tag, index) => (
                  <>
                    {index == 0 ? (
                      <Link to={`/profile/${tag._id}/timeline`}>
                        {" "}
                        {tag.firstName}
                      </Link>
                    ) : (
                        <Link to={`/profile/${tag._id}/timeline`}>
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
            {location && <span>- At {location}</span>}
          </div>
          <div className="overflow">
            <form>
              <textarea
                value={postBodyText}
                onChange={(e) => {
                  setPostBodyText(e.target.value);
                  setTextLength(e.target.value.length);
                }}
                style={{
                  width: "100%",
                  border: "2px solid #f0f2f5",
                  padding: "10px",
                }}
                cols="10"
                placeholder="What are you thinking ?"
              ></textarea>
            </form>
            <div className="text-post-length">
              <CircularProgressbar
                value={textLength}
                maxValue={500}
                text={`${Math.floor((textLength / 500) * 100)}%`}
              />
            </div>
            <ul>
              {newImages.map((img, index) => {
                return (
                  <div className="create-new-post-img">
                    <i
                      onClick={() => deleteNewImgInPost(index)}
                      className="fas fa-times"
                    ></i>
                    <img async src={URL.createObjectURL(img)}></img>
                  </div>
                );
              })}
              {oldImages && oldImages.map((img, index) => {
                return (
                  <div className="create-new-post-img">
                    <i
                      onClick={() => deleteOldImgInPost(index)}
                      className="fas fa-times"
                    ></i>
                    <img async src={img.imgLink}></img>
                  </div>
                );
              })}
            </ul>
          </div>

          <div className="add-more-to-post">
            <span>Add to Post</span>
            <div className="my-icon-wrapper">
              <i
                style={{ color: "rgba(149,103,239,1)" }}
                class="fas fa-video"
              ></i>
              {profile.userId._id == user._id ? (
                <i
                  onClick={() => getLocation()}
                  style={{ color: "rgba(245,83,61,1)" }}
                  class="fas fa-location-arrow"
                ></i>
              ) : (
                  ""
                )}
              <label htmlFor="file-upload" className="custom-file-upload">
                <i
                  style={{ color: "rgba(69,189,98,1)" }}
                  className="far fa-images"
                ></i>
              </label>
              <input
                id="file-upload"
                onChange={(e) => setNewImages(Object.values(e.target.files))}
                type="file"
                multiple
              />

              {profile.userId._id == user._id ? (
                <i
                  onClick={() => openFriendModal()}
                  style={{ color: "rgba(24,119,242,1)" }}
                  className="fas fa-user-friends"
                ></i>
              ) : (
                  ""
                )}
            </div>
          </div>
          <div className="create-new-post">
            {/* <button  className="btn btn-md-2 btn-border-think btn-transparent c-grey">Review</button> */}
            <button
              onClick={() => editPost()}
              disabled={textLength > 500 ? true : false}
              style={{ marginLeft: "10px" }}
              className="btn btn-primary btn-md-2"
            >
              Save<div class="ripple-container"></div>
            </button>
          </div>
        </div>
        }
      </Modal>
      <Modal
        ariaHideApp={false}
        isOpen={modalFriendIsOpen}
        onRequestClose={closeFriendModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{ alignItems: "center" }} className="modal-header">
          <h2>Tag Friends</h2>
          <i
            onClick={closeFriendModal}
            class="fas fa-times close-modal-icon"
          ></i>
        </div>
        <div style={{ height: "200px" }} className="modal-body">
          <Multiselect
            options={friend} // Options to display in the dropdown
            // selectedValues={} // Preselected value to persist in dropdown
            onSelect={onSelect} // Function will trigger on select event
            onRemove={onRemove} // Function will trigger on remove event
            displayValue="firstName" // Property name to display in the dropdown options
          />
        </div>
      </Modal>
      <Modal
        ariaHideApp={false}
        isOpen={modalLocationIsOpen}
        onRequestClose={closeLocationModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{ alignItems: "center" }} className="modal-header">
          <h2>Check In </h2>
          <i
            onClick={closeLocationModal}
            class="fas fa-times close-modal-icon"
          ></i>
        </div>
        <div className="modal-body">
          {nearbyLocation && (
            <div className="form-group">
              <label htmlFor="inputState">Nearby Locations</label>
              <select
                onChange={(e) => setLocation(e.target.value)}
                id="inputState"
                className="form-control"
                name="gender"
                value={location}
              >
                <option selected>Choose Your Current Locations...</option>
                {nearbyLocation.map((location) => (
                  <option>{location.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </Modal>
     
    </>
  );
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile: state.profile.profile,
  posts:state.post.posts
});
export default connect(mapStateToProps, { updatePost })(EditPost);
