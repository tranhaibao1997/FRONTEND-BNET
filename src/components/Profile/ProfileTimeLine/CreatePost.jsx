import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { connect } from "react-redux";
import { addPost } from "../../../actions/post";
import { useState } from "react";
import Emoji from "react-emoji-render";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Axios from "axios";

function CreatePost({ modalIsOpen, setIsOpen, user, addPost, profile }) {
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
  } // Function will trigger on remove event

  // const handleChange = (event) => {
  //   setState({ ...state, [event.target.id]: !event.target.checked });
  //   let arr = [...tagArray];
  //   if (
  //     event.target.checked &&
  //     !arr.map((elm) => elm.id).includes(event.target.id)
  //   ) {
  //     arr.push({ id: event.target.id, name: event.target.name });
  //   } else if (
  //     !event.target.checked &&
  //     arr.map((elm) => elm.id).includes(event.target.id)
  //   ) {
  //     arr = arr.filter((e) => e.id !== event.target.id);
  //   }
  //   setTagArray(arr);
  // };
  let wallId = useParams().id;
  if (wallId === undefined) {
    wallId = profile.userId._id;
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
      width: "500px",
      padding: "0px",
    },
  };

  let [images, setImages] = useState([]);
  let [textLength, setTextLength] = useState(0);
  let [postBodyText, setPostBodyText] = useState("");

  function deleteImgInPost(index) {
    let imgList = [...images];
    imgList.splice(index, 1);
    setImages(imgList);
  }

  async function getImgLink() {
    let imageLinks = [];
    let foo = images.map(async (img) => {
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
    console.log(bar);
    return bar;
  }

  console.log(images, "IMAGESSS");

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
    setTagArray([]);
    setImages([]);
    setTextLength(0);
    setPostBodyText("");
    setLocation(null);
  }

  async function addNewPost() {
    let imageLinks = await getImgLink();

    console.log(imageLinks);
    let newPost = {
      onWall: wallId,
      avatar: user.avatar,
      name: `${user.firstName + " " + user.lastName}`,
      text: postBodyText,
      images: imageLinks,
      isShared: false,
      parents: null,
      peopleTag: tagArray,
      wallOwner: `${profile.userId.firstName + " " + profile.userId.lastName}`,
      likes: [],
      comments: [],
      author: user._id,
      checkIn: location,
    };

    console.log(newPost, "final");
    console.log("Chay zo day");
    const bool = await addPost(newPost);
    if (bool) {
      setIsOpen(false);
      setPostBodyText("");
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
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{ alignItems: "center" }} className="modal-header">
          <h2>Create New Post</h2>
          <i onClick={closeModal} class="fas fa-times close-modal-icon"></i>
        </div>
        <div className="modal-body">
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
              {images.map((img, index) => {
                return (
                  <div className="create-new-post-img">
                    <i
                      onClick={() => deleteImgInPost(index)}
                      className="fas fa-times"
                    ></i>
                    <img src={URL.createObjectURL(img)}></img>
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
                onChange={(e) => setImages(Object.values(e.target.files))}
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
              onClick={() => addNewPost()}
              disabled={textLength > 500 ? true : false}
              style={{ marginLeft: "10px" }}
              className="btn btn-primary btn-md-2"
            >
              Post Status<div class="ripple-container"></div>
            </button>
          </div>
        </div>
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
});
export default connect(mapStateToProps, { addPost })(CreatePost);
