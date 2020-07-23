import React from "react";
import { connect } from "react-redux";
import { updatePersonal, getCurrentProfile } from "../../actions/profile";
import { loginFacebook } from "../../actions/auth";
import { Redirect } from "react-router-dom";
import AvatarUpload from "../Custom/AvatarUpload";
import BannerUpload from '../Custom/BannerUpload'

function Personal({
  profile,
  loading,
  updatePersonal,
  getCurrentProfile,
  match,
  loginFacebook,
  isAuthenticated,
}) {
  let [formData, setFormData] = React.useState({
    aboutMe: "",
    birthPlace: "",
    livesIn: "",
    phoneNumber: "",
    personalWebsite: "",
    status: "",
    occupation: "",
  });
  React.useEffect(() => {
    // async function loginOath() {
    //   const params = window.location.search.slice(1).split("&");

    //   console.log(params);
    //   let token = params.filter((elm) => elm.includes("token="))[0];
    //   token = token
    //     .split("")
    //     .splice(6, token.length - 1)
    //     .join("");
    //   await loginFacebook(token);
    //   await getCurrentProfile();
    // }
    // if (window.location.search.includes("token")) {
    //   loginOath()

    // }
  
    getCurrentProfile();
    console.log(profile,"PROFILE")

    setFormData({
      aboutMe: loading || !profile.aboutMe ? "" : profile.aboutMe,
      birthPlace: loading || !profile.birthPlace ? "" : profile.birthPlace,
      livesIn: loading || !profile.livesIn ? "" : profile.livesIn,
      phoneNumber: loading || !profile.phoneNumber ? "" : profile.phoneNumber,
      personalWebsite:
        loading || !profile.personalWebsite ? "" : profile.personalWebsite,
      status: loading || !profile.status ? "" : profile.status,
      occupation: loading || !profile.occupation ? "" : profile.occupation,
    });
  }, [loading]);
  function onChangeFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function submitFormData(e) {
    e.preventDefault();
    updatePersonal(formData);
  }
  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard/personal"></Redirect>;
  // }

  let {
    aboutMe,
    birthPlace,
    livesIn,
    phoneNumber,
    personalWebsite,
    status,
    occupation,
  } = formData;
  return (
    <div>
      <div className="ui-block">
        <div className="ui-block-title">
          <h6 className="title">Personal Information</h6>
        </div>
        <div className="ui-block-content">
          {/* Personal Information Form  */}
          <form
            className="content"

            onSubmit={(e) => submitFormData(e)}
          >
            {/* <div className="form-row">
              <div className="form-group col-md-6">
                <AvatarUpload></AvatarUpload>
              </div>
              <div className="form-group col-md-6">
                <BannerUpload></BannerUpload>
              </div>
            </div> */}

            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">About me</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                name="aboutMe"
                value={aboutMe}
                onChange={(e) => onChangeFormData(e)}
              />
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Birthplace</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  name="birthPlace"
                  value={birthPlace}
                  onChange={(e) => onChangeFormData(e)}
                  placeholder="Birthplace"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Lives in</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  name="livesIn"
                  value={livesIn}
                  onChange={(e) => onChangeFormData(e)}
                  placeholder="Lives in"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => onChangeFormData(e)}
                  placeholder="Phone Number"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Personal Website</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  name="personalWebsite"
                  value={personalWebsite}
                  onChange={(e) => onChangeFormData(e)}
                  placeholder="Personal Website"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputState">Status</label>
              <select
                id="inputState"
                className="form-control"
                name="status"
                value={status}
                onChange={(e) => onChangeFormData(e)}
              >
                <option selected>Choose Your Status...</option>
                <option>Single</option>
                <option>In relationship</option>
                <option>Married</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword4">Occupation</label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                name="occupation"
                value={occupation}
                onChange={(e) => onChangeFormData(e)}
                placeholder="Occupation"
              />
            </div>
            <button type="submit" className="btn btn-lg btn-primary full-width">
              Save
            </button>
          </form>

          {/* ... end Personal Information Form  */}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {
  updatePersonal,
  getCurrentProfile,
  loginFacebook,
})(Personal);
