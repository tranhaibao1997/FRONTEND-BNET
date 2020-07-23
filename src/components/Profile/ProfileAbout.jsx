import React from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Moment from "react-moment";

function ProfileAbout({ profile, testProp }) {
  console.log(profile, "hello");
  return (
    <>
      {profile ? (
        <div className="container">
          <div className="row">
            <div className="col col-xl-8 order-xl-2 col-lg-8 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
              <div className="ui-block">
                <div className="ui-block-title">
                  <h6 className="title">Hobbies and Interests</h6>
                  <a href="#" className="more">
                    <svg className="olymp-three-dots-icon">
                      <use xlinkHref="#olymp-three-dots-icon" />
                    </svg>
                  </a>
                </div>
                <div className="ui-block-content">
                  <div className="row">
                    <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                      {/* W-Personal-Info */}
                      <ul className="widget w-personal-info item-block">
                        <li>
                          <span className="title">Hobbies:</span>
                          <span className="text">
                            {profile.allHobbies
                              ? profile.allHobbies.hobbies
                              : ""}
                          </span>
                        </li>
                        <li>
                          <span className="title">Favourite TV Shows:</span>
                          <span className="text">
                            {profile.allHobbies
                              ? profile.allHobbies.favoriteTVShow
                              : ""}
                          </span>
                        </li>
                        <li>
                          <span className="title">Favourite Movies:</span>
                          <span className="text">
                            {profile.allHobbies
                              ? profile.allHobbies.favoriteMovies
                              : ""}
                          </span>
                        </li>
                        <li>
                          <span className="title">Favourite Games:</span>
                          <span className="text">
                            {profile.allHobbies
                              ? profile.allHobbies.favoriteGames
                              : ""}
                          </span>
                        </li>
                      </ul>
                      {/* ... end W-Personal-Info */}
                    </div>
                    <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                      {/* W-Personal-Info */}
                      <ul className="widget w-personal-info item-block">
                        <li>
                          <span className="title">
                            Favourite Music Bands / Artists:
                          </span>
                          <span className="text">
                            {profile.allHobbies
                              ? profile.allHobbies.favoriteMusicBand
                              : ""}
                          </span>
                        </li>
                        <li>
                          <span className="title">Favourite Books:</span>
                          <span className="text">
                            {profile.allHobbies
                              ? profile.allHobbies.favoriteBooks
                              : ""}
                          </span>
                        </li>
                        <li>
                          <span className="title">Favourite Writers:</span>
                          <span className="text">
                            {profile.allHobbies
                              ? profile.allHobbies.favoriteWriters
                              : ""}{" "}
                          </span>
                        </li>
                        <li>
                          <span className="title">Other Interests:</span>
                          <span className="text">
                            {profile.allHobbies
                              ? profile.allHobbies.otherInterests
                              : ""}
                          </span>
                        </li>
                      </ul>
                      {/* ... end W-Personal-Info */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ui-block">
                <div className="ui-block-title">
                  <h6 className="title">Education and Employement</h6>
                  <a href="#" className="more">
                    <svg className="olymp-three-dots-icon">
                      <use xlinkHref="#olymp-three-dots-icon" />
                    </svg>
                  </a>
                </div>
                <div className="ui-block-content">
                  <div className="row">
                    <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                      {/* W-Personal-Info */}
                      <ul className="widget w-personal-info item-block">
                      {profile.education.map((edu) => (
                          <li>
                            <span className="title">{edu.school}</span>
                            <span className="date">
                              <Moment format="DD/MM/YYYY">
                                {edu.fromDate}
                              </Moment>{" "}
                              -{" "}
                              {edu.current ? (
                                "Now"
                              ) : (
                                <Moment format="DD/MM/YYYY">
                                  {edu.toDate}
                                </Moment>
                              )}
                            </span>
                            <span className="text">
                             {edu.description}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {/* ... end W-Personal-Info */}
                    </div>
                    <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                      {/* W-Personal-Info */}
                      <ul className="widget w-personal-info item-block">
                        {profile.experience.map((exp) => (
                          <li>
                            <span className="title">{exp.jobTitle}</span>
                            <span className="date">
                              <Moment format="DD/MM/YYYY">
                                {exp.fromDate}
                              </Moment>{" "}
                              -{" "}
                              {exp.current ? (
                                "Now"
                              ) : (
                                <Moment format="DD/MM/YYYY">
                                  {exp.toDate}
                                </Moment>
                              )}
                            </span>
                            <span className="text">
                             {exp.description}
                            </span>
                          </li>
                        ))}
                       
                      </ul>
                      {/* ... end W-Personal-Info */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-xl-4 order-xl-1 col-lg-4 order-lg-1 col-md-12 order-md-2 col-sm-12 col-12">
              <div className="ui-block">
                <div className="ui-block-title">
                  <h6 className="title">Personal Info</h6>
                  <a href="#" className="more">
                    <svg className="olymp-three-dots-icon">
                      <use xlinkHref="#olymp-three-dots-icon" />
                    </svg>
                  </a>
                </div>
                <div className="ui-block-content">
                  {/* W-Personal-Info */}
                  <ul className="widget w-personal-info">
                    <li>
                      <span className="title">About Me:</span>
                      <span className="text">{profile.aboutMe}</span>
                    </li>
                    <li>
                      <span className="title">Birthday:</span>
                      <span className="text">
                        {" "}
                        <Moment
                          format="DD/MM/YYYY"
                          date={profile.userId.dob}
                        ></Moment>
                      </span>
                    </li>
                    <li>
                      <span className="title">Birthplace:</span>
                      <span className="text">{profile.birthPlace}</span>
                    </li>
                    <li>
                      <span className="title">Lives in:</span>
                      <span className="text">{profile.livesIn}</span>
                    </li>
                    <li>
                      <span className="title">Occupation:</span>
                      <span className="text">{profile.occupation}</span>
                    </li>
                    <li>
                      <span className="title">Joined:</span>
                      <span className="text">
                        <Moment
                          format="DD/MM/YYYY"
                          date={profile.userId.createdAt}
                        ></Moment>
                      </span>
                    </li>
                    <li>
                      <span className="title">Gender:</span>
                      <span className="text">{profile.userId.gender}</span>
                    </li>
                    <li>
                      <span className="title">Status:</span>
                      <span className="text">{profile.status}</span>
                    </li>
                    <li>
                      <span className="title">Email:</span>
                      <a href="#" className="text">
                        {profile.userId.email}
                      </a>
                    </li>
                    <li>
                      <span className="title">Website:</span>
                      <a href="#" className="text">
                        {profile.personalWebsite}
                      </a>
                    </li>
                    <li>
                      <span className="title">Phone Number:</span>
                      <span className="text">{profile.phoneNumber}</span>
                    </li>
                  </ul>
                  {/* ... end W-Personal-Info */}
                  {/* W-Socials */}
                  <div className="widget w-socials">
                    <h6 className="title">Other Social Networks:</h6>
                    <a href="#" className="social-item bg-facebook">
                      <i className="fab fa-facebook-f" aria-hidden="true" />
                      Facebook
                    </a>
                    <a href="#" className="social-item bg-twitter">
                      <i className="fab fa-twitter" aria-hidden="true" />
                      Twitter
                    </a>
                    <a href="#" className="social-item bg-github">
                      <i className="fab fa-github"></i>
                      Github
                    </a>
                  </div>
                  {/* ... end W-Socials */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "loading"
      )}
    </>
  );
}
const mapStateToProps = (state) => ({
  profile: state.profile.profile,
});
export default connect(mapStateToProps, { getCurrentProfile })(ProfileAbout);
