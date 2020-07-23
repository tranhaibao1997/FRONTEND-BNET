import React from "react";
import { connect } from "react-redux";
import { getCurrentProfile, updateAccount } from "../../actions/profile";
import { Redirect, useHistory } from "react-router-dom";

function Account({ profile, getCurrentProfile, loading, updateAccount }) {
  let history = useHistory();
  let [formData, setFormData] = React.useState({
    avatar: "",
    banner: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
  });
  let { avatar, banner, firstName, lastName, gender, dob } = formData;
  React.useEffect(() => {
    getCurrentProfile();
    setFormData({
      avatar: loading || !profile.userId.avatar ? "" : profile.userId.avatar,
      banner: loading || !profile.userId.banner ? "" : profile.userId.banner,
      firstName:
        loading || !profile.userId.firstName ? "" : profile.userId.firstName,
      lastName:
        loading || !profile.userId.lastName ? "" : profile.userId.lastName,
      gender: loading || !profile.userId.gender ? "" : profile.userId.gender,
      dob: loading || !profile.userId.dob ? "" : profile.userId.dob,
    });
    return () => {};
  }, [loading]);
  async function onChangeAvatar(e) {
    console.log(e.target.files[0]);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Client-ID 6d47acf7b0cf6a3");

    var formdata = new FormData();
    formdata.append("image", e.target.files[0]);

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
    console.log(data);
    setFormData({ ...formData, avatar: data.data.link });
  }
  async function onChangeBanner(e) {
    console.log(e.target.files[0]);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Client-ID 6d47acf7b0cf6a3");

    var formdata = new FormData();
    formdata.append("image", e.target.files[0]);

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
    console.log(data);
    setFormData({ ...formData, banner: data.data.link });
  }
  function onChangeFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function sendUpdateAccount(e) {
    e.preventDefault();
    let bool = updateAccount(formData);
    if (bool) {
     history.push(`/profile/${profile.userId._id}/timeline`)
    }
  }
  function replaceDob(dob) {
    return dob.split("T")[0];
  }

  return (
    <div className="ui-block">
      <div className="ui-block-title">
        <h6 className="title">Account Information</h6>
      </div>
      <div className="ui-block-content">
        {/* Change Password Form */}
        <form
          className="content"
          type="submit"
          onSubmit={(e) => sendUpdateAccount(e)}
        >
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Avatar</label>
              <div
                style={{
                  backgroundImage: "url(" + `${avatar}` + ")",
                }}
                className="avatar-dashboard-wrapper"
              >
                {/* <img src={avatar}></img> */}
              </div>
              <input
                type="file"
                className="form-control"
                id="inputEmail4"
                name="avatar"
                onChange={(e) => onChangeAvatar(e)}
                placeholder="Avatar"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Banner</label>
              <div className="banner-dashboard-wrapper">
                <img src={banner}></img>
              </div>
              <input
                type="file"
                className="form-control"
                id="inputPassword4"
                name="banner"
                onChange={(e) => onChangeBanner(e)}
                placeholder="Banner"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">First Name</label>
              <input
                type="text"
                className="form-control"
                id="inputEmail4"
                name="firstName"
                value={"" || firstName}
                onChange={(e) => onChangeFormData(e)}
                placeholder="firstName"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                name="lastName"
                value={"" || lastName}
                onChange={(e) => onChangeFormData(e)}
                placeholder="lastName"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputState">Gender</label>
              <select
                id="inputState"
                className="form-control"
                name="gender"
                value={"" || gender}
                onChange={(e) => onChangeFormData(e)}
              >
                <option selected>Choose Your Gender...</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputState">BirthDay</label>
              <input
                type="date"
                name="dob"
                value={replaceDob(dob)}
                onChange={(e) => onChangeFormData(e)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-lg btn-primary full-width">
            Save
          </button>
        </form>
        {/* ... end Change Password Form */}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
});

export default connect(mapStateToProps, { getCurrentProfile, updateAccount })(
  Account
);
