import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";

function ProfilePhotos({ profile }) {
  let id = useParams().id;
  let [albumActive, setAlbumActive] = useState(false);
  let allImgs = [];

  if (profile) {
    console.log(profile.uploadedImages.flat(1), "PHOTOOOOO");
    allImgs = profile.uploadedImages.flat(1);
  }
  console.log(allImgs, "ALLLLL");

  return (
    <>
      {profile ? (
        <>
          <div className="container">
            <div className="row">
              <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="ui-block responsive-flex">
                  <div className="ui-block-title">
                    <div className="h6 title">
                      {profile.userId.firstName + " " + profile.userId.lastName}
                      ’s Photo Gallery
                    </div>
                    <div className="block-btn align-right">
                      <a
                        href="#"
                        data-toggle="modal"
                        data-target="#create-photo-album"
                        className="btn btn-primary btn-md-2"
                      >
                        Create Album +
                      </a>
                      <a
                        href="#"
                        data-toggle="modal"
                        data-target="#update-header-photo"
                        className="btn btn-md-2 btn-border-think custom-color c-grey"
                      >
                        Add Photos
                      </a>
                    </div>
                    <ul className="nav nav-tabs photo-gallery" role="tablist">
                      <li
                        onClick={() => setAlbumActive(!albumActive)}
                        className="nav-item"
                      >
                        <Link
                          className={
                            albumActive ? "nav-link" : "nav-link active"
                          }
                          data-toggle="tab"
                          to={`/profile/${id}/photos/photo-page`}
                          role="tab"
                        >
                          <svg className="olymp-photos-icon">
                            <use xlinkHref="#olymp-photos-icon" />
                          </svg>
                        </Link>
                      </li>
                      <li
                        onClick={() => setAlbumActive(!albumActive)}
                        className="nav-item"
                      >
                        <Link
                          className={
                            albumActive ? "nav-link active" : "nav-link"
                          }
                          data-toggle="tab"
                          to={`/profile/${id}/photos/album-page`}
                          role="tab"
                        >
                          <svg className="olymp-albums-icon">
                            <use xlinkHref="#olymp-albums-icon" />
                          </svg>
                          <div className="ripple-container" />
                        </Link>
                      </li>
                    </ul>
                    <a href="#" className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="#olymp-three-dots-icon" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                {/* Tab panes */}
                <div className="tab-content">
                  <div
                    className={albumActive ? "tab-pane" : "tab-pane active"}
                    id="photo-page"
                    role="tabpanel"
                  >
                    <div className="photo-album-wrapper">
             
                      {allImgs
                        ? allImgs.map((img) => (
                            <>
                              <div className="photo-item col-4-width">
                                <img async src={img.imgLink} alt="photo" />
                                <div className="overlay overlay-dark" />
                                <a href="#" className="more">
                                  <svg className="olymp-three-dots-icon">
                                    <use xlinkHref="#olymp-three-dots-icon" />
                                  </svg>
                                </a>
                                
                                <a
                                  href="#"
                                  data-toggle="modal"
                                  data-target="#open-photo-popup-v2"
                                  className="  full-block"
                                />
                                <div className="content">
                                  <a href="#" className="h6 title">
                                    {img.text}
                                  </a>
                                  <time
                                    className="published"
                                    dateTime="2017-03-24T18:18"
                                  >
                                    
                                  </time>
                                </div>
                              </div>
                            </>
                          ))
                        : ""}

                      
                      <a href="#" className="btn btn-control btn-more">
                        <svg className="olymp-three-dots-icon">
                          <use xlinkHref="#olymp-three-dots-icon" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div
                    className={albumActive ? "tab-pane active" : "tab-pane"}
                    id="album-page"
                    role="tabpanel"
                  >
                    <div className="photo-album-wrapper">
                      <div className="photo-album-item-wrap col-4-width">
                        <div
                          className="photo-album-item create-album"
                          data-mh="album-item"
                          style={{ height: "458.172px" }}
                        >
                          <a
                            href="#"
                            data-toggle="modal"
                            data-target="#create-photo-album"
                            className="  full-block"
                          />
                          <div className="content">
                            <a
                              href="#"
                              className="btn btn-control bg-primary"
                              data-toggle="modal"
                              data-target="#create-photo-album"
                            >
                              <svg className="olymp-plus-icon">
                                <use xlinkHref="#olymp-plus-icon" />
                              </svg>
                            </a>
                            <a
                              href="#"
                              className="title h5"
                              data-toggle="modal"
                              data-target="#create-photo-album"
                            >
                              Create an Album
                            </a>
                            <span className="sub-title">
                              It only takes a few minutes!
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="photo-album-item-wrap col-4-width">
                        <div
                          className="photo-album-item"
                          data-mh="album-item"
                          style={{ height: "458.172px" }}
                        >
                          <div className="photo-item">
                            <img src="img/photo-item2.jpg" alt="photo" />
                            <div className="overlay overlay-dark" />
                            <a href="#" className="more">
                              <svg className="olymp-three-dots-icon">
                                <use xlinkHref="#olymp-three-dots-icon" />
                              </svg>
                            </a>
                            <a href="#" className="post-add-icon">
                              <svg className="olymp-heart-icon">
                                <use xlinkHref="#olymp-heart-icon" />
                              </svg>
                              <span>324</span>
                            </a>
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#open-photo-popup-v2"
                              className="  full-block"
                            />
                          </div>
                          <div className="content">
                            <a href="#" className="title h5">
                              South America Vacations
                            </a>
                            <span className="sub-title">
                              Last Added: 2 hours ago
                            </span>
                            <div
                              className="swiper-container swiper-swiper-unique-id-0 initialized swiper-container-horizontal"
                              id="swiper-unique-id-0"
                            >
                              <div
                                className="swiper-wrapper"
                                style={{
                                  width: "1028px",
                                  transform: "translate3d(-257px, 0px, 0px)",
                                  transitionDuration: "0ms",
                                }}
                              >
                                <div
                                  className="swiper-slide swiper-slide-duplicate swiper-slide-prev swiper-slide-duplicate-next"
                                  data-swiper-slide-index={1}
                                  style={{ width: "257px" }}
                                >
                                  <div
                                    className="friend-count"
                                    data-swiper-parallax={-500}
                                    style={{
                                      transform:
                                        "translate3d(-500px, 0px, 0px)",
                                      transitionDuration: "0ms",
                                    }}
                                  >
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">24</div>
                                      <div className="title">Photos</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">86</div>
                                      <div className="title">Comments</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">16</div>
                                      <div className="title">Share</div>
                                    </a>
                                  </div>
                                </div>
                                <div
                                  className="swiper-slide swiper-slide-active"
                                  data-swiper-slide-index={0}
                                  style={{ width: "257px" }}
                                >
                                  <ul className="friends-harmonic">
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic5.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic10.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic7.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic8.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic2.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <div
                                  className="swiper-slide swiper-slide-next swiper-slide-duplicate-prev"
                                  data-swiper-slide-index={1}
                                  style={{ width: "257px" }}
                                >
                                  <div
                                    className="friend-count"
                                    data-swiper-parallax={-500}
                                    style={{
                                      transform: "translate3d(500px, 0px, 0px)",
                                      transitionDuration: "0ms",
                                    }}
                                  >
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">24</div>
                                      <div className="title">Photos</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">86</div>
                                      <div className="title">Comments</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">16</div>
                                      <div className="title">Share</div>
                                    </a>
                                  </div>
                                </div>
                                <div
                                  className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
                                  data-swiper-slide-index={0}
                                  style={{ width: "257px" }}
                                >
                                  <ul className="friends-harmonic">
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic5.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic10.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic7.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic8.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic2.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              {/* If we need pagination */}
                              <div className="swiper-pagination pagination-swiper-unique-id-0 swiper-pagination-clickable swiper-pagination-bullets">
                                <span className="swiper-pagination-bullet swiper-pagination-bullet-active" />
                                <span className="swiper-pagination-bullet" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="photo-album-item-wrap col-4-width">
                        <div
                          className="photo-album-item"
                          data-mh="album-item"
                          style={{ height: "458.172px" }}
                        >
                          <div className="photo-item">
                            <img src="img/photo-album1.jpg" alt="photo" />
                            <div className="overlay overlay-dark" />
                            <a href="#" className="more">
                              <svg className="olymp-three-dots-icon">
                                <use xlinkHref="#olymp-three-dots-icon" />
                              </svg>
                            </a>
                            <a href="#" className="post-add-icon">
                              <svg className="olymp-heart-icon">
                                <use xlinkHref="#olymp-heart-icon" />
                              </svg>
                              <span>324</span>
                            </a>
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#open-photo-popup-v1"
                              className="  full-block"
                            />
                          </div>
                          <div className="content">
                            <a href="#" className="title h5">
                              Photoshoot Summer 2016
                            </a>
                            <span className="sub-title">
                              Last Added: 5 weeks ago
                            </span>
                            <div
                              className="swiper-container swiper-swiper-unique-id-1 initialized swiper-container-horizontal"
                              data-slide="fade"
                              id="swiper-unique-id-1"
                            >
                              <div
                                className="swiper-wrapper"
                                style={{
                                  width: "1028px",
                                  transform: "translate3d(-257px, 0px, 0px)",
                                  transitionDuration: "0ms",
                                }}
                              >
                                <div
                                  className="swiper-slide swiper-slide-duplicate swiper-slide-prev swiper-slide-duplicate-next"
                                  data-swiper-slide-index={1}
                                  style={{ width: "257px" }}
                                >
                                  <div
                                    className="friend-count"
                                    data-swiper-parallax={-500}
                                    style={{
                                      transform:
                                        "translate3d(-500px, 0px, 0px)",
                                      transitionDuration: "0ms",
                                    }}
                                  >
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">24</div>
                                      <div className="title">Photos</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">86</div>
                                      <div className="title">Comments</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">16</div>
                                      <div className="title">Share</div>
                                    </a>
                                  </div>
                                </div>
                                <div
                                  className="swiper-slide swiper-slide-active"
                                  data-swiper-slide-index={0}
                                  style={{ width: "257px" }}
                                >
                                  <ul className="friends-harmonic">
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic5.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic10.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic7.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic8.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic2.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <div
                                  className="swiper-slide swiper-slide-next swiper-slide-duplicate-prev"
                                  data-swiper-slide-index={1}
                                  style={{ width: "257px" }}
                                >
                                  <div
                                    className="friend-count"
                                    data-swiper-parallax={-500}
                                    style={{
                                      transform: "translate3d(500px, 0px, 0px)",
                                      transitionDuration: "0ms",
                                    }}
                                  >
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">24</div>
                                      <div className="title">Photos</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">86</div>
                                      <div className="title">Comments</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">16</div>
                                      <div className="title">Share</div>
                                    </a>
                                  </div>
                                </div>
                                <div
                                  className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
                                  data-swiper-slide-index={0}
                                  style={{ width: "257px" }}
                                >
                                  <ul className="friends-harmonic">
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic5.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic10.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic7.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic8.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic2.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              {/* If we need pagination */}
                              <div className="swiper-pagination pagination-swiper-unique-id-1 swiper-pagination-clickable swiper-pagination-bullets">
                                <span className="swiper-pagination-bullet swiper-pagination-bullet-active" />
                                <span className="swiper-pagination-bullet" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="photo-album-item-wrap col-4-width">
                        <div
                          className="photo-album-item"
                          data-mh="album-item"
                          style={{ height: "458.172px" }}
                        >
                          <div className="photo-item">
                            <img src="img/photo-album2.jpg" alt="photo" />
                            <div className="overlay overlay-dark" />
                            <a href="#" className="more">
                              <svg className="olymp-three-dots-icon">
                                <use xlinkHref="#olymp-three-dots-icon" />
                              </svg>
                            </a>
                            <a href="#" className="post-add-icon">
                              <svg className="olymp-heart-icon">
                                <use xlinkHref="#olymp-heart-icon" />
                              </svg>
                              <span>324</span>
                            </a>
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#open-photo-popup-v1"
                              className="  full-block"
                            />
                          </div>
                          <div className="content">
                            <a href="#" className="title h5">
                              Amazing Street Food
                            </a>
                            <span className="sub-title">
                              Last Added: 6 mins ago
                            </span>
                            <div
                              className="swiper-container swiper-swiper-unique-id-2 initialized swiper-container-horizontal"
                              data-slide="fade"
                              id="swiper-unique-id-2"
                            >
                              <div
                                className="swiper-wrapper"
                                style={{
                                  width: "1028px",
                                  transform: "translate3d(-257px, 0px, 0px)",
                                  transitionDuration: "0ms",
                                }}
                              >
                                <div
                                  className="swiper-slide swiper-slide-duplicate swiper-slide-prev swiper-slide-duplicate-next"
                                  data-swiper-slide-index={1}
                                  style={{ width: "257px" }}
                                >
                                  <div
                                    className="friend-count"
                                    data-swiper-parallax={-500}
                                    style={{
                                      transform:
                                        "translate3d(-500px, 0px, 0px)",
                                      transitionDuration: "0ms",
                                    }}
                                  >
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">24</div>
                                      <div className="title">Photos</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">86</div>
                                      <div className="title">Comments</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">16</div>
                                      <div className="title">Share</div>
                                    </a>
                                  </div>
                                </div>
                                <div
                                  className="swiper-slide swiper-slide-active"
                                  data-swiper-slide-index={0}
                                  style={{ width: "257px" }}
                                >
                                  <ul className="friends-harmonic">
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic10.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <div
                                  className="swiper-slide swiper-slide-next swiper-slide-duplicate-prev"
                                  data-swiper-slide-index={1}
                                  style={{ width: "257px" }}
                                >
                                  <div
                                    className="friend-count"
                                    data-swiper-parallax={-500}
                                    style={{
                                      transform: "translate3d(500px, 0px, 0px)",
                                      transitionDuration: "0ms",
                                    }}
                                  >
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">24</div>
                                      <div className="title">Photos</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">86</div>
                                      <div className="title">Comments</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">16</div>
                                      <div className="title">Share</div>
                                    </a>
                                  </div>
                                </div>
                                <div
                                  className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
                                  data-swiper-slide-index={0}
                                  style={{ width: "257px" }}
                                >
                                  <ul className="friends-harmonic">
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic10.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              {/* If we need pagination */}
                              <div className="swiper-pagination pagination-swiper-unique-id-2 swiper-pagination-clickable swiper-pagination-bullets">
                                <span className="swiper-pagination-bullet swiper-pagination-bullet-active" />
                                <span className="swiper-pagination-bullet" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="photo-album-item-wrap col-4-width">
                        <div
                          className="photo-album-item"
                          data-mh="album-item"
                          style={{ height: "458.172px" }}
                        >
                          <div className="photo-item">
                            <img src="img/photo-album3.jpg" alt="photo" />
                            <div className="overlay overlay-dark" />
                            <a href="#" className="more">
                              <svg className="olymp-three-dots-icon">
                                <use xlinkHref="#olymp-three-dots-icon" />
                              </svg>
                            </a>
                            <a href="#" className="post-add-icon">
                              <svg className="olymp-heart-icon">
                                <use xlinkHref="#olymp-heart-icon" />
                              </svg>
                              <span>324</span>
                            </a>
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#open-photo-popup-v1"
                              className="  full-block"
                            />
                          </div>
                          <div className="content">
                            <a href="#" className="title h5">
                              Graffiti &amp; Street Art
                            </a>
                            <span className="sub-title">
                              Last Added: 16 hours ago
                            </span>
                            <div
                              className="swiper-container swiper-swiper-unique-id-3 initialized swiper-container-horizontal"
                              data-slide="fade"
                              id="swiper-unique-id-3"
                            >
                              <div
                                className="swiper-wrapper"
                                style={{
                                  width: "1028px",
                                  transform: "translate3d(-257px, 0px, 0px)",
                                  transitionDuration: "0ms",
                                }}
                              >
                                <div
                                  className="swiper-slide swiper-slide-duplicate swiper-slide-prev swiper-slide-duplicate-next"
                                  data-swiper-slide-index={1}
                                  style={{ width: "257px" }}
                                >
                                  <div
                                    className="friend-count"
                                    data-swiper-parallax={-500}
                                    style={{
                                      transform:
                                        "translate3d(-500px, 0px, 0px)",
                                      transitionDuration: "0ms",
                                    }}
                                  >
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">24</div>
                                      <div className="title">Photos</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">86</div>
                                      <div className="title">Comments</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">16</div>
                                      <div className="title">Share</div>
                                    </a>
                                  </div>
                                </div>
                                <div
                                  className="swiper-slide swiper-slide-active"
                                  data-swiper-slide-index={0}
                                  style={{ width: "257px" }}
                                >
                                  <ul className="friends-harmonic">
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic10.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic7.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic8.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic2.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <div
                                  className="swiper-slide swiper-slide-next swiper-slide-duplicate-prev"
                                  data-swiper-slide-index={1}
                                  style={{ width: "257px" }}
                                >
                                  <div
                                    className="friend-count"
                                    data-swiper-parallax={-500}
                                    style={{
                                      transform: "translate3d(500px, 0px, 0px)",
                                      transitionDuration: "0ms",
                                    }}
                                  >
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">24</div>
                                      <div className="title">Photos</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">86</div>
                                      <div className="title">Comments</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">16</div>
                                      <div className="title">Share</div>
                                    </a>
                                  </div>
                                </div>
                                <div
                                  className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
                                  data-swiper-slide-index={0}
                                  style={{ width: "257px" }}
                                >
                                  <ul className="friends-harmonic">
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic10.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic7.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic8.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic2.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              {/* If we need pagination */}
                              <div className="swiper-pagination pagination-swiper-unique-id-3 swiper-pagination-clickable swiper-pagination-bullets">
                                <span className="swiper-pagination-bullet swiper-pagination-bullet-active" />
                                <span className="swiper-pagination-bullet" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="photo-album-item-wrap col-4-width">
                        <div
                          className="photo-album-item"
                          data-mh="album-item"
                          style={{ height: "458.172px" }}
                        >
                          <div className="photo-item">
                            <img src="img/photo-album4.jpg" alt="photo" />
                            <div className="overlay overlay-dark" />
                            <a href="#" className="more">
                              <svg className="olymp-three-dots-icon">
                                <use xlinkHref="#olymp-three-dots-icon" />
                              </svg>
                            </a>
                            <a href="#" className="post-add-icon">
                              <svg className="olymp-heart-icon">
                                <use xlinkHref="#olymp-heart-icon" />
                              </svg>
                              <span>324</span>
                            </a>
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#open-photo-popup-v1"
                              className="  full-block"
                            />
                          </div>
                          <div className="content">
                            <a href="#" className="title h5">
                              Amazing Landscapes
                            </a>
                            <span className="sub-title">
                              Last Added: 13 mins ago
                            </span>
                            <div
                              className="swiper-container swiper-swiper-unique-id-4 initialized swiper-container-horizontal"
                              data-slide="fade"
                              id="swiper-unique-id-4"
                            >
                              <div
                                className="swiper-wrapper"
                                style={{
                                  width: "1028px",
                                  transform: "translate3d(-257px, 0px, 0px)",
                                  transitionDuration: "0ms",
                                }}
                              >
                                <div
                                  className="swiper-slide swiper-slide-duplicate swiper-slide-prev swiper-slide-duplicate-next"
                                  data-swiper-slide-index={1}
                                  style={{ width: "257px" }}
                                >
                                  <div
                                    className="friend-count"
                                    data-swiper-parallax={-500}
                                    style={{
                                      transform:
                                        "translate3d(-500px, 0px, 0px)",
                                      transitionDuration: "0ms",
                                    }}
                                  >
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">24</div>
                                      <div className="title">Photos</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">86</div>
                                      <div className="title">Comments</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">16</div>
                                      <div className="title">Share</div>
                                    </a>
                                  </div>
                                </div>
                                <div
                                  className="swiper-slide swiper-slide-active"
                                  data-swiper-slide-index={0}
                                  style={{ width: "257px" }}
                                >
                                  <ul className="friends-harmonic">
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic5.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic10.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic7.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic8.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic2.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/avatar30-sm.jpg"
                                          alt="author"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/avatar29-sm.jpg"
                                          alt="user"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/avatar28-sm.jpg"
                                          alt="user"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/avatar27-sm.jpg"
                                          alt="user"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#" className="all-users">
                                        +3
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <div
                                  className="swiper-slide swiper-slide-next swiper-slide-duplicate-prev"
                                  data-swiper-slide-index={1}
                                  style={{ width: "257px" }}
                                >
                                  <div
                                    className="friend-count"
                                    data-swiper-parallax={-500}
                                    style={{
                                      transform: "translate3d(500px, 0px, 0px)",
                                      transitionDuration: "0ms",
                                    }}
                                  >
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">24</div>
                                      <div className="title">Photos</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">86</div>
                                      <div className="title">Comments</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">16</div>
                                      <div className="title">Share</div>
                                    </a>
                                  </div>
                                </div>
                                <div
                                  className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
                                  data-swiper-slide-index={0}
                                  style={{ width: "257px" }}
                                >
                                  <ul className="friends-harmonic">
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic5.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic10.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic7.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic8.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic2.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/avatar30-sm.jpg"
                                          alt="author"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/avatar29-sm.jpg"
                                          alt="user"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/avatar28-sm.jpg"
                                          alt="user"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/avatar27-sm.jpg"
                                          alt="user"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#" className="all-users">
                                        +3
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              {/* If we need pagination */}
                              <div className="swiper-pagination pagination-swiper-unique-id-4 swiper-pagination-clickable swiper-pagination-bullets">
                                <span className="swiper-pagination-bullet swiper-pagination-bullet-active" />
                                <span className="swiper-pagination-bullet" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="photo-album-item-wrap col-4-width">
                        <div
                          className="photo-album-item"
                          data-mh="album-item"
                          style={{ height: "458.172px" }}
                        >
                          <div className="photo-item">
                            <img src="img/photo-item6.jpg" alt="photo" />
                            <div className="overlay overlay-dark" />
                            <a href="#" className="more">
                              <svg className="olymp-three-dots-icon">
                                <use xlinkHref="#olymp-three-dots-icon" />
                              </svg>
                            </a>
                            <a href="#" className="post-add-icon">
                              <svg className="olymp-heart-icon">
                                <use xlinkHref="#olymp-heart-icon" />
                              </svg>
                              <span>324</span>
                            </a>
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#open-photo-popup-v1"
                              className="  full-block"
                            />
                          </div>
                          <div className="content">
                            <a href="#" className="title h5">
                              The Majestic Canyon
                            </a>
                            <span className="sub-title">
                              Last Added: 57 mins ago
                            </span>
                            <div
                              className="swiper-container swiper-swiper-unique-id-5 initialized swiper-container-horizontal"
                              data-slide="fade"
                              id="swiper-unique-id-5"
                            >
                              <div
                                className="swiper-wrapper"
                                style={{
                                  width: "1028px",
                                  transform: "translate3d(-257px, 0px, 0px)",
                                  transitionDuration: "0ms",
                                }}
                              >
                                <div
                                  className="swiper-slide swiper-slide-duplicate swiper-slide-prev swiper-slide-duplicate-next"
                                  data-swiper-slide-index={1}
                                  style={{ width: "257px" }}
                                >
                                  <div
                                    className="friend-count"
                                    data-swiper-parallax={-500}
                                    style={{
                                      transform:
                                        "translate3d(-500px, 0px, 0px)",
                                      transitionDuration: "0ms",
                                    }}
                                  >
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">24</div>
                                      <div className="title">Photos</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">86</div>
                                      <div className="title">Comments</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">16</div>
                                      <div className="title">Share</div>
                                    </a>
                                  </div>
                                </div>
                                <div
                                  className="swiper-slide swiper-slide-active"
                                  data-swiper-slide-index={0}
                                  style={{ width: "257px" }}
                                >
                                  <ul className="friends-harmonic">
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic10.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <div
                                  className="swiper-slide swiper-slide-next swiper-slide-duplicate-prev"
                                  data-swiper-slide-index={1}
                                  style={{ width: "257px" }}
                                >
                                  <div
                                    className="friend-count"
                                    data-swiper-parallax={-500}
                                    style={{
                                      transform: "translate3d(500px, 0px, 0px)",
                                      transitionDuration: "0ms",
                                    }}
                                  >
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">24</div>
                                      <div className="title">Photos</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">86</div>
                                      <div className="title">Comments</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">16</div>
                                      <div className="title">Share</div>
                                    </a>
                                  </div>
                                </div>
                                <div
                                  className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
                                  data-swiper-slide-index={0}
                                  style={{ width: "257px" }}
                                >
                                  <ul className="friends-harmonic">
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic10.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              {/* If we need pagination */}
                              <div className="swiper-pagination pagination-swiper-unique-id-5 swiper-pagination-clickable swiper-pagination-bullets">
                                <span className="swiper-pagination-bullet swiper-pagination-bullet-active" />
                                <span className="swiper-pagination-bullet" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="photo-album-item-wrap col-4-width">
                        <div
                          className="photo-album-item"
                          data-mh="album-item"
                          style={{ height: "458.172px" }}
                        >
                          <div className="photo-item">
                            <img src="img/photo-album5.jpg" alt="photo" />
                            <div className="overlay overlay-dark" />
                            <a href="#" className="more">
                              <svg className="olymp-three-dots-icon">
                                <use xlinkHref="#olymp-three-dots-icon" />
                              </svg>
                            </a>
                            <a href="#" className="post-add-icon">
                              <svg className="olymp-heart-icon">
                                <use xlinkHref="#olymp-heart-icon" />
                              </svg>
                              <span>324</span>
                            </a>
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#open-photo-popup-v1"
                              className="  full-block"
                            />
                          </div>
                          <div className="content">
                            <a href="#" className="title h5">
                              Winter 2015 Portraits
                            </a>
                            <span className="sub-title">
                              Last Added: 1 year ago
                            </span>
                            <div
                              className="swiper-container swiper-swiper-unique-id-6 initialized swiper-container-horizontal"
                              data-slide="fade"
                              id="swiper-unique-id-6"
                            >
                              <div
                                className="swiper-wrapper"
                                style={{
                                  width: "1028px",
                                  transform: "translate3d(-257px, 0px, 0px)",
                                  transitionDuration: "0ms",
                                }}
                              >
                                <div
                                  className="swiper-slide swiper-slide-duplicate swiper-slide-prev swiper-slide-duplicate-next"
                                  data-swiper-slide-index={1}
                                  style={{ width: "257px" }}
                                >
                                  <div
                                    className="friend-count"
                                    data-swiper-parallax={-500}
                                    style={{
                                      transform:
                                        "translate3d(-500px, 0px, 0px)",
                                      transitionDuration: "0ms",
                                    }}
                                  >
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">24</div>
                                      <div className="title">Photos</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">86</div>
                                      <div className="title">Comments</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">16</div>
                                      <div className="title">Share</div>
                                    </a>
                                  </div>
                                </div>
                                <div
                                  className="swiper-slide swiper-slide-active"
                                  data-swiper-slide-index={0}
                                  style={{ width: "257px" }}
                                >
                                  <ul className="friends-harmonic">
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic10.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/avatar30-sm.jpg"
                                          alt="author"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/avatar29-sm.jpg"
                                          alt="user"
                                        />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <div
                                  className="swiper-slide swiper-slide-next swiper-slide-duplicate-prev"
                                  data-swiper-slide-index={1}
                                  style={{ width: "257px" }}
                                >
                                  <div
                                    className="friend-count"
                                    data-swiper-parallax={-500}
                                    style={{
                                      transform: "translate3d(500px, 0px, 0px)",
                                      transitionDuration: "0ms",
                                    }}
                                  >
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">24</div>
                                      <div className="title">Photos</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">86</div>
                                      <div className="title">Comments</div>
                                    </a>
                                    <a href="#" className="friend-count-item">
                                      <div className="h6">16</div>
                                      <div className="title">Share</div>
                                    </a>
                                  </div>
                                </div>
                                <div
                                  className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
                                  data-swiper-slide-index={0}
                                  style={{ width: "257px" }}
                                >
                                  <ul className="friends-harmonic">
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/friend-harmonic10.jpg"
                                          alt="friend"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/avatar30-sm.jpg"
                                          alt="author"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img
                                          src="img/avatar29-sm.jpg"
                                          alt="user"
                                        />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              {/* If we need pagination */}
                              <div className="swiper-pagination pagination-swiper-unique-id-6 swiper-pagination-clickable swiper-pagination-bullets">
                                <span className="swiper-pagination-bullet swiper-pagination-bullet-active" />
                                <span className="swiper-pagination-bullet" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        " This profile doesnt exist"
      )}
    </>
  );
}
const mapStateToProps = (state) => ({
  profile: state.profile.profile,
});

export default connect(mapStateToProps, {})(ProfilePhotos);
