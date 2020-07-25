import React from "react";
import Axios from "axios";
import {
  Map,
  GoogleApiWrapper,
  InfoWindow,
  Marker,
  mapW,
} from "google-maps-react";
import { useSelector, useDispatch } from "react-redux";
import profile from "../../reducers/profile";
import { getLocation } from '../../actions/profile'
import { PROFILE_UPDATE, UPDATE_ACCOUNT } from "../../actions/types";
import MapStyle from '../../mapStyles'

const mapStyles={}
function Location(props) {
  let user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()
  let profile = useSelector((state) => state.profile.profile);
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

    getWeather(longitude, latitude);
  };

  async function getWeather(longtitude, latitude) {
    try {
      let response = await Axios.get(
        `https://bnet-backend.herokuapp.com/api/profile/getLocation?longtitude=${longtitude}&latitude=${latitude}`
      );
      let data = await response.data;
      dispatch({ type: UPDATE_ACCOUNT, payload: response.data.data })
      console.log(data)

    } catch (err) {
      console.log(err);
    }
  }

  console.log(profile.friendList, "HELLO");
  console.log(user.location.longtitude);
  return (
    <div>
      <div className="ui-block">
        <div className="ui-block-title">
          <h6 className="title">Friend Locations</h6>
        </div>
        <div className="ui-block-content">
          <button onClick={() => getLocation()} className="btn btn-primary">
            Get Current Location
          </button>
          <div
            style={{ position: "relative", height: "600px" }}
            className="map-container"
          >
            {profile ? (
              <>
                {" "}
                <Map
                  google={props.google}
                  zoom={14}
                  style={mapStyles}
                  initialCenter={{
                    lat: Number(profile.userId.location.latitude),
                    lng: Number(profile.userId.location.longtitude),
                  }}
                  center={{
                    lat: profile.userId.location.latitude,
                    lng: profile.userId.location.longtitude,
                  }}
                >
                  <Marker
                    options={{
                    
                    }}
                    position={{
                      lat: profile.userId.location.latitude,
                      lng: profile.userId.location.longtitude,
                    }}
                  ></Marker>
                  {profile.friendList &&
                    profile.friendList.map((friend, index) => {
                      let lat = Number(friend.location.latitude);
                      let lng = Number(friend.location.longtitude);
                      console.log(lat, lng);
                      return (
                        lat !== 0 &&
                        lng !== 0 && (
                          <Marker
                            options={{
                              icon: {
                                url: friend.avatar,
                                scaledSize: new props.google.maps.Size(50, 50),
                              },
                            }}
                            title={friend.firstName + " " + friend.lastName}
                            id={friend._id}
                            key={friend._id}
                            position={{ lat: lat, lng: lng }}
                          ></Marker>
                        )
                      );
                    })}
                </Map>
              </>
            ) : (
                ""
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCTmTwjNOt-9uWocI3n2BlUqmQYc4AM3SM",
})(Location);
