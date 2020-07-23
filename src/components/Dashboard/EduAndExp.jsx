import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteEducation, deleteExperience } from "../../actions/profile";
import Moment from "react-moment";

function EduAndExp({ profile, getCurrentProfile, deleteEducation, loading,deleteExperience }) {
  React.useEffect(() => {
    getCurrentProfile();
  }, [loading]);

  function deleteEdu(id) {
    deleteEducation(id);
  }
  return (
    <>
      <div className="ui-block">
        <div className="ui-block-title">
          <h6 className="title">Your Education History</h6>
        </div>
        <div className="ui-block-content">
          {/* Education History Form */}
          <div className="row">
            <div className="col col-lg-3">
              <Link to="/dashboard/add-education" className="btn btn-primary">
                Add New Education
              </Link>
            </div>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>School</th>
                <th>Degree</th>
                <th className="hide-sm">Field Of Study</th>
                <th className="hide-sm">Years</th>
                <th></th>
              </tr>
              {profile
                ? profile.education.map((edu) => {
                    return (
                      <tr>
                        <td>{edu.school}</td>
                        <td class="hide-sm">{edu.degree}</td>
                        <td class="hide-sm">{edu.fieldOfStudy}</td>
                        <td>
                          <Moment format="DD/MM/YYYY">{edu.fromDate}</Moment> -{" "}
                          {edu.current ? (
                            "Now"
                          ) : (
                            <Moment format="DD/MM/YYYY">{edu.toDate}</Moment>
                          )}
                        </td>
                        <td>
                          <button
                            class="btn btn-danger"
                            onClick={() => deleteEdu(edu._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </thead>
          </table>
          {/* ... end Education History Form */}
        </div>
        <div className="ui-block">
          <div className="ui-block-title">
            <h6 className="title">Your Employement History</h6>
          </div>
          <div className="ui-block-content">
            <div className="row">
              <div className="col col-lg-3">
                <Link
                  to="/dashboard/add-experience"
                  className="btn btn-primary"
                >
                  Add New Experience
                </Link>
              </div>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Title</th>
                  <th class="hide-sm">Location</th>
                  <th class="hide-sm">Year</th>

                  <th></th>
                </tr>

                {profile
                  ? profile.experience.map((exp) => {
                      return (
                        <tr>
                          <td>{exp.company}</td>
                          <td class="hide-sm">{exp.jobTitle}</td>
                          <td class="hide-sm">{exp.location}</td>
                          <td>
                            <Moment format="DD/MM/YYYY">{exp.fromDate}</Moment>{" "}
                            -{" "}
                            {exp.current ? (
                              "Now"
                            ) : (
                              <Moment format="DD/MM/YYYY">{exp.toDate}</Moment>
                            )}
                          </td>
                          <td>
                            <button
                              class="btn btn-danger"
                              onClick={() => deleteExperience(exp._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </thead>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
});
export default connect(mapStateToProps, { getCurrentProfile, deleteEducation,deleteExperience })(
  EduAndExp
);
