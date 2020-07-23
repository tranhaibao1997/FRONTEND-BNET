import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/auth";

function Register({ register, isAuthenticated }) {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2:"",
    dateOfBirth: "",
    gender: "",
  });
  const {
    firstName,
    lastName,
    email,
    password,
    password2,
    dateOfBirth,
    gender,
  } = formData;

  const onChangeRegister=(e)=>{
        setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const onSubmit=(e)=>{
      e.preventDefault();
      if(password!==password2)
      {
          return alert("password isnt match")
      }
      register(firstName,lastName,email,password,dateOfBirth,gender)

  }
  if(isAuthenticated)
 {
     return <Redirect to="/dashboard/personal"></Redirect>
 }
  
  return (
    <>
      <div className="title h6">Register to BNet</div>
      <form onSubmit={(e) => onSubmit(e)} className="content">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">First Name</label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              name="firstName"
              value={firstName}
              onChange={(e) => onChangeRegister(e)}
              placeholder="First Name"
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              name="lastName"
              value={lastName}
              onChange={(e) => onChangeRegister(e)}
              placeholder="Last Name"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">Email</label>
          <input
            type="email"
            className="form-control"
            id="inputAddress"
            name="email"
            value={email}
            onChange={(e) => onChangeRegister(e)}
            placeholder="abc@gmail.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress2">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputAddress2"
            name="password"
            value={password}
            onChange={(e) => onChangeRegister(e)}
            placeholder="password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress2">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="inputAddress2"
            name="password2"
            value={password2}
            onChange={(e) => onChangeRegister(e)}
            placeholder="password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputState">Birthday</label>
          <input
            type="date"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => onChangeRegister(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputState">Gender</label>
          <select
            onChange={(e) => onChangeRegister(e)}
            id="inputState"
            className="form-control"
            name="gender"
            value={gender}
          >
            <option selected>Choose Your Gender...</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Sign up
        </button>
      </form>
    </>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { register })(Register);
