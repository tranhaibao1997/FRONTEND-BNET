import React, { Fragment } from "react";
import ProfileBanner from "./ProfileBanner";
import ProfileTimeLine from "./ProfileTimeLine/ProfileTimeLine";
import ProfileAbout from "./ProfileAbout";
import ProfileFriend from "./ProfileFriend";
import { connect } from "react-redux";
import { StoreContext } from "../../ThemeContext";
import { getProfileById } from "../../actions/profile";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import ProfilePhotos from "./ProfilePhotos";
import PostDetail from "./PostDetail";


function Profile({ match, profile, getProfileById }) {
  React.useEffect(() => {
    getProfileById(id);
  }, []);
  let id = match.params.id;
  console.log(id);

  let { navBarAppear } = React.useContext(StoreContext);
  navBarAppear[1](true);
  let { path, url } = useRouteMatch();
  console.log(path);
  return (
    <Fragment>
      <div style={{ height: "68px" }}></div>
      <ProfileBanner id={id}></ProfileBanner>
      <Switch>
        <Route
          path={`/profile/:id/timeline`}
          component={ProfileTimeLine}
        ></Route>
        <Route
          path={`/profile/:id/about`}
          render={(props) => <ProfileAbout></ProfileAbout>}
        ></Route>
        {/* render={props => <Login setUser={setUser} {...props}></Login>} */}
        <Route path={`/profile/:id/friend`} component={ProfileFriend}></Route>
        <Route path={`/profile/:id/photos`} component={ProfilePhotos}></Route>
     
      </Switch>
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  profile: state.profile.profile,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
