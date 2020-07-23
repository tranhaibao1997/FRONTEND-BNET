import React from 'react'
import { connect } from 'react-redux'
import { getCurrentProfile, updateHobbies } from '../../actions/profile'
function Hobbies({ profile, loading, getCurrentProfile, updateHobbies }) {

  let [formData, setFormData] = React.useState({
    hobbies: "",
    favoriteTVShow: "",
    favoriteMovies: "",
    favoriteGames: "",
    favoriteMusicBand: "",
    favoriteBooks: "",
    favoriteWriters: "",
    otherInterests: ""
  })

  React.useEffect(() => {
    getCurrentProfile()
    setFormData({
      hobbies: loading || !profile.allHobbies  ? "" : profile.allHobbies.hobbies,
      favoriteTVShow: loading || !profile.allHobbies? "" : profile.allHobbies.favoriteTVShow,
      favoriteMovies: loading || !profile.allHobbies ? "" : profile.allHobbies.favoriteMovies,
      favoriteGames: loading || !profile.allHobbies ? "" : profile.allHobbies.favoriteGames,
      favoriteMusicBand: loading || !profile.allHobbies ? "" : profile.allHobbies.favoriteMusicBand,
      favoriteBooks: loading || !profile.allHobbies ? "" : profile.allHobbies.favoriteBooks,
      favoriteWriters: loading || !profile.allHobbies ? "" : profile.allHobbies.favoriteWriters,
      otherInterests: loading || !profile.allHobbies ? "" : profile.allHobbies.otherInterests,
    })

  }, [loading])

  console.log(profile)

  let { hobbies, favoriteTVShow, favoriteMovies, favoriteGames, favoriteMusicBand, favoriteBooks, favoriteWriters, otherInterests } = formData

  function onChangeFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function updateForm(e) {
    e.preventDefault();
    updateHobbies(formData)

  }
  return (
    <div className="ui-block">
      <div className="ui-block-title">
        <h6 className="title">Hobbies and Interests</h6>
      </div>
      <div className="ui-block-content">
        {/* Form Hobbies and Interests */}
        <form  onSubmit={e => updateForm(e)}>
          <div className="row">
            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Hobbies</label>
                <textarea className="form-control" placeholder="Hobbies" name="hobbies" value={hobbies} onChange={e => onChangeFormData(e)} />
                <span className="material-input" /></div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Favorite TV Shows</label>
                <textarea className="form-control" placeholder="Favourite TV Shows" name="favoriteTVShow" value={favoriteTVShow} onChange={e => onChangeFormData(e)} />
                <span className="material-input" /></div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Favorite Movies</label>
                <textarea className="form-control" placeholder="Favourite Movies" name="favoriteMovies" value={favoriteMovies} onChange={e => onChangeFormData(e)} />
                <span className="material-input" /></div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Favorite Games</label>
                <textarea className="form-control" placeholder="Favourite Games" name="favoriteGames" value={favoriteGames} onChange={e => onChangeFormData(e)} />
                <span className="material-input" /></div>

            </div>
            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Favorite Music Bands</label>
                <textarea className="form-control" placeholder="Favourite Music Bands / Artists" name="favoriteMusicBand" value={favoriteMusicBand} onChange={e => onChangeFormData(e)} />
                <span className="material-input" /></div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Favorite Books</label>
                <textarea className="form-control" placeholder="Favourite Books" name="favoriteBooks" value={favoriteBooks} onChange={e => onChangeFormData(e)} />
                <span className="material-input" /></div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Favorite Writers</label>
                <textarea className="form-control" placeholder="Favourite Writers" name="favoriteWriters" value={favoriteWriters} onChange={e => onChangeFormData(e)} />
                <span className="material-input" /></div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Other Interested</label>
                <textarea className="form-control" placeholder="Other Interests" name="otherInterests" value={otherInterests} onChange={e => onChangeFormData(e)} />
                <span className="material-input" /></div>

            </div>
          </div>
          <button type="submit" className="btn btn-lg btn-primary full-width">
              Save
            </button>
        </form>
        {/* ... end Form Hobbies and Interests */}
      </div>
    </div>
  )
}
const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  loading: state.profile.loading

})
export default connect(mapStateToProps, { getCurrentProfile, updateHobbies })(Hobbies)