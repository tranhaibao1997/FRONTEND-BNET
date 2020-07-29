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
import { PROFILE_UPDATE, UPDATE_ACCOUNT } from "../../../actions/types";
import { useDispatch } from 'react-redux'
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";
import "@reach/combobox/styles.css";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox";

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


  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,


  } = usePlacesAutocomplete();

  const handleInput = (e) => {
    setValue(e.target.value);
    setLocation(e.target.value)
  };

  const handleSelect = (val) => {
    getGeocode({ address: val }).then(res => {
      console.log(res[0].geometry.viewport.Va.i, res[0].geometry.viewport.Za.i); initMap(res[0].geometry.viewport.Za.i, res[0].geometry.viewport.Va.i);getWeather(res[0].geometry.viewport.Va.i, res[0].geometry.viewport.Za.i)
    })
    setValue(val, false);

  };
  let google = window.google
  function initMap(latitude = 0, longtitude = 0) {
    let map = new google.maps.Map(document.getElementById("addressmap"), {
      zoom: 18,
      center: {
        lat: latitude,
        lng: longtitude
      }
    });
    new google.maps.Marker({

      position: { lat: latitude, lng: longtitude },
      map,
      title: location
    });
  }

  async function getWeather(longtitude, latitude) {
    try {
      let response = await Axios.get(
        `https://bnet-backend.herokuapp.com/api/profile/getLocation?longtitude=${longtitude}&latitude=${latitude}`
      );
      let data = await response.data;
      dispatch({ type: UPDATE_ACCOUNT, payload: response.data.data });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  const dispatch = useDispatch();

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
                  onClick={() => setLocationIsOpen(true)}
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
        <Combobox onSelect={handleSelect} aria-labelledby="demo">
            <ComboboxInput value={value} onChange={handleInput} disabled={!ready} />
            <ComboboxPopover>
              <ComboboxList>
                {status === "OK" &&
                  data.map(({ id, description }) => (
                    <ComboboxOption key={id} value={description} />
                  ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
          <div id="addressmap"></div>
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
