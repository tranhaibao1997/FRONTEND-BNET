import React from "react";
import Axios from "axios";
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { useSelector, useDispatch } from "react-redux";
import profile from "../../reducers/profile";
import { getLocation } from "../../actions/profile";
import { PROFILE_UPDATE, UPDATE_ACCOUNT } from "../../actions/types";
import MapStyle from "../../mapStyles";



function Location(props) {
  let google = window.google


  let markers = [];
  let map;
  let [longtitude, setLongtitute] = React.useState(null);
  let [latitude, setLatitude] = React.useState(null);
  console.log(longtitude, latitude);
  const errorHandler = (err) => {
    if (err.code == 1) {
      alert("Error: Access is denied!");
    } else if (err.code == 2) {
      alert("Error: Position is unavailable!");
    }
  };

  function getLocation() {

    let markers = [];
    let map;
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
    setLongtitute(position.coords.longitude);
    setLatitude(position.coords.latitude);
    // getWeather(position.coords.longitude, position.coords.latitude)
  };
  // async function getWeather(longtitude, latitude) {
  //   try {
  //     let response = await Axios.get(
  //       `https://bnet-backend.herokuapp.com/api/profile/getLocation?longtitude=${longtitude}&latitude=${latitude}`
  //     );
  //     let data = await response.data;
  //     dispatch({ type: UPDATE_ACCOUNT, payload: response.data.data });
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  const dispatch = useDispatch();

  let profile = useSelector(state => state.profile.profile)
  let user = useSelector(state => state.auth.user)

  let friendList = profile.friendList

  console.log(friendList, "FRIEND LIST")






  console.log(longtitude, latitude)


  React.useEffect(() => {
    getLocation()
    initMap()
    drop()
    return () => {

    }
  }, [longtitude, latitude])
  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: {
        lat: Number(profile.userId.location.latitude),
        lng: Number(profile.userId.location.longtitude)
      }
    });
    new google.maps.Marker({

      position: {
        lat: Number(profile.userId.location.latitude),
        lng: Number(profile.userId.location.longtitude)
      },
      map,
      title: "Hello World!"
    });
  }
  function drop() {
    clearMarkers();

    for (let i = 0; i < friendList.length; i++) {
      addMarkerWithTimeout(friendList[i].location, friendList[i], i * 200);

    }

  }



  function addMarkerWithTimeout(position, friend, timeout) {

    const myLatLng = { lat: parseFloat(position.latitude), lng: parseFloat(position.longtitude) };
    console.log(friend, "FRIEND IN MAP")
    window.setTimeout(() => {
      var marker = new google.maps.Marker({
        icon: {
          url: friend.avatar,
          scaledSize: new google.maps.Size(30, 30),
        },

        position: myLatLng,
        map,
        animation: google.maps.Animation.DROP
      })
      markers.push(marker);
      marker.addListener("click", function () {
        var contentString = `<div id="content">
          <div id="siteNotice">
          </div> 
          <h1 id="firstHeading" class="firstHeading">${`${friend.firstName} ${friend.lastName}`}</h1> 
          <div id="bodyContent">
          <img style="width:200px,height:200px,boder-radius:50%" src=${friend.avatar}> 
          </div> 
          </div>`;

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        infowindow.open(map, marker);

      });
    }, timeout);
  }

  function clearMarkers() {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }

  return (
    <>
      <div className="ui-block">
        <div className="ui-block-title">
          <h6 className="title">Friend Locations( This will show your friend location depend on last location they checked in. if you check in, your location will be updated ^^. You can check in by create a new post and choose location to check in :D )</h6>
        </div>
      </div>
      <div className="ui-block-content">

        <div id="map"></div>
      </div>


    </>
  );
}
export default Location;
