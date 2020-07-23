import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
export default class App extends React.Component {
  //other logic
  render() {
    return <div className="loading-wrapper"><Loader type="Hearts" color="#00BFFF" height={80} width={80} /></div>;
  }
}
