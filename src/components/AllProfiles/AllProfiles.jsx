import React from "react";
import ProfileCard from "./ProfileCard";
import { StoreContext } from "../../ThemeContext";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FilterSection from "./FilterSection";
import { connect } from "react-redux";
import { getAllProfiles, clearProfiles } from "../../actions/profile";
import profile from "../../reducers/profile";
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css";
import Loading from "../Loading";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function AllProfiles({
  getAllProfiles,
  profiles,
  user,
  profile,
  clearProfiles,
  profilesLength
}) {
  let { currentPage, minAge, maxAge, gender } = React.useContext(StoreContext);
  let [longtitude, setLongtitute] = React.useState(0);
  let [latitude, setLatitude] = React.useState(0);
  console.log(longtitude, latitude);
  const errorHandler = (err) => {
    if (err.code == 1) {
      alert("Error: Access is denied!");
    } else if (err.code == 2) {
      alert("Error: Position is unavailable!");
    }
  };

  function getLocation() {
    console.log("SAO K CHAYYY");
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
  }
  const showLocation = (position) => {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    setLongtitute(position.coords.longitude);
    setLatitude(position.coords.latitude);
  };

  React.useEffect(() => {
    getLocation();
    getAllProfiles();
    // return()=>{
    //   clearProfiles()
    // }
  }, [profile]);

  let changePage = async (numPage) => {
    // page[1](numPage);
    // currentPage[1](numPage);
    // getDataFromAPI(numPage);
    currentPage[1](numPage)
    getAllProfiles(minAge[0],maxAge[0],gender[0],numPage)

    // props.getProductListBySearch(numPage)
    //fetch a data
    //or update a query to get data
  };

  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  let { navBarAppear } = React.useContext(StoreContext);
  navBarAppear[1](true);
  return (
    <div className="container">
      <div className="hero-image">
        <div className="hero-text">
          <h1 style={{ color: "white" }}>All Members</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="ui-block responsive-flex">
            <div className="ui-block-title">
              <div className="h6 title">
                All Profiles
              </div>
              <form className="w-search">
                <div className="form-group with-button is-empty">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search Users..."
                  />
                  <button>
                    <svg className="olymp-magnifying-glass-icon">
                      <use xlinkHref="#olymp-magnifying-glass-icon" />
                    </svg>
                  </button>
                  <span className="material-input" />
                </div>
              </form>
           
            </div>
          </div>
          <div className="profile-cards-container">
            <div className="row">
              {profiles
                ? profiles.map((profile) => (
                  <div className="col-xl-4 col-lg-6 col-md-6 col-xxs-12">
                    <ProfileCard
                      profile={profile}
                      user={user}
                      currentLong={longtitude}
                      currentLa={latitude}
                      getAllProfiles={getAllProfiles}
                    ></ProfileCard>
                  </div>
                ))
                : <Loading></Loading>}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="filter-section ui-block responsive-flex">
            <span
              style={{ fontSize: "15px", fontWeight: "700", color: "black" }}
            >
              Find A Friend
            </span>
            <FilterSection getAllProfiles={getAllProfiles}></FilterSection>
          </div>
        </div>
      </div>
      <Pagination
            className="pagination-class"
            currentPage={currentPage[0]}
            totalPages={Math.ceil( profilesLength / 9)}
            changeCurrentPage={changePage}
            theme="square-fill"
          />
    </div>
  );
}
const mapStateToProps = (state) => ({
  profiles: state.profile.profiles,
  user: state.auth.user,
  profile: state.profile.profile,
  profilesLength:state.profile.profilesLength
});

export default connect(mapStateToProps, { getAllProfiles, clearProfiles })(
  AllProfiles
);
