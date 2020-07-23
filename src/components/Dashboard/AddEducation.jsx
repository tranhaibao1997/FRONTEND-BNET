import React from "react";
import {connect} from 'react-redux'
import {createEducation} from '../../actions/profile'
import { Link, withRouter } from 'react-router-dom'

function AddEducation({createEducation,history}) {
  let [checked, setChecked] = React.useState(false);
  let [formData, setFormData] = React.useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    fromDate: checked ?"" :"",
    current: false,
    toDate: "",
    description: "",
  });
  let {
    school,
    degree,
    fieldOfStudy,
    fromDate,
    current,
    toDate,
    description,
  } = formData;

  function onChangeFormData(e) {
      setFormData({...formData,[e.target.name]:e.target.value})
   
  }
  function createFormData(e)
  {
      e.preventDefault();
      createEducation(formData,history)

  }

  return (
    <div className="ui-block">
      <div className="ui-block-title">
        <h6 className="title">Add New Education</h6>
      </div>
      <div className="ui-block-content">
        <form className="content" onSubmit={e=>createFormData(e)}>
          <div className="form-group">
            <label htmlFor="inputPassword4">School or Bootcamp</label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              name="school"
              value={school}
              onChange={(e) => onChangeFormData(e)}
              placeholder="School or Bootcamp"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword4">Degree or Certificate</label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              name="degree"
              value={degree}
              onChange={(e) => onChangeFormData(e)}
              placeholder="Degree or Certificate"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword4">Field Of Study</label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              name="fieldOfStudy"
              value={fieldOfStudy}
              onChange={(e) => onChangeFormData(e)}
              placeholder="Field Of Study"
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
export default connect(mapStateToProps,{createEducation})(withRouter(AddEducation))
