import React from "react";
import {connect} from 'react-redux'
import {createExperience} from '../../actions/profile'
import { Link, withRouter } from 'react-router-dom'

function AddExperience({createExperience,history}) {
  let [checked, setChecked] = React.useState(false);
  let [formData, setFormData] = React.useState({
    company: "",
    jobTitle: "",
    location: "",
    fromDate: checked ?"" :"",
    current: false,
    toDate: "",
    description: "",
  });
  let {
    company,
    jobTitle,
    location,
    fromDate,
    current,
    toDate,
    description,
  } = formData;

  function onChangeFormData(e) {
      setFormData({...formData,[e.target.name]:e.target.value})
   
  }
  console.log(formData,'exp')
  function createFormData(e)
  {
      e.preventDefault();
      createExperience(formData,history)

  }

  return (
    <div className="ui-block">
      <div className="ui-block-title">
        <h6 className="title">Add New Experience</h6>
      </div>
      <div className="ui-block-content">
        <form className="content" onSubmit={e=>createFormData(e)}>
          <div className="form-group">
            <label htmlFor="inputPassword4">Company</label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              name="company"
              value={company}
              onChange={(e) => onChangeFormData(e)}
              placeholder="Company"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword4">Job Title</label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              name="jobTitle"
              value={jobTitle}
              onChange={(e) => onChangeFormData(e)}
              placeholder="Job Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword4">Location</label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              name="location"
              value={location}
              onChange={(e) => onChangeFormData(e)}
              placeholder="Location"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputState">From Date</label>
            <input
              type="date"
              name="fromDate"
              value={fromDate}
              onChange={(e) => onChangeFormData(e)}
            />
          </div>
          <div style={{ width: "150px" }} className="checkbox-wrapper">
            <div className="form-group">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                checked={checked}
                onChange={(e) => {setChecked(!checked)
                setFormData({...formData,current:!checked})
                }}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Current
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputState">To Date</label>
            <input
              type="date"
              name="toDate"
              disabled={checked}
              value={toDate}
              onChange={(e) => onChangeFormData(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
              Program Description
            </label>
            <textarea
              className="form-control"
              placeholder="description"
              name="description"
              value={description}
              onChange={(e) => onChangeFormData(e)}
            />
            <span className="material-input" />
          </div>
          <button type="submit" className="btn btn-lg btn-primary full-width">
            Create Education
          </button>
        </form>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
    // profile: state.profile.profile,
    // loading: state.profile.loading,
  });
export default connect(mapStateToProps,{createExperience})(withRouter(AddExperience))
