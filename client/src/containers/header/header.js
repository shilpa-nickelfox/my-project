import React, { useEffect, useState, useCallback } from "react";

import { ImageObj } from "../../assets/images/imgeObject";
import { Dropdown, Modal, Button } from "react-bootstrap";
import CHANGEPASSWORD_API from "../../views/api/api";
import {
  addToggle,
  removeToggle,
  toasterValue,
} from "../../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [Logo, setLogo] = useState();

  const history = useHistory();

  const handleClose = () => setShow(false);

  const toggle = useSelector((state) => state.toggleReducers);


  const LogOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("authtoken");
    dispatch(toasterValue("You have logged out successfully. "));
    history.push("/");

    //  window.location.reload()
  };

  

  return (
    <header className="top-header">
      <div className="container-fluid">
        <div className="col-md-12 p-0">
          <div className="row">
            <div className="col-sm-6">
              <div className="top-search d-flex main-slide main-tog">
                <div className="logo-text">
                  {Logo && Logo !== undefined ? (
                    <img src={Logo} alt="Clock App"></img>
                  ) : (
                    <h2>Clock App</h2>
                  )}
                </div>
                {toggle ? (
                  <div
                    className="toggle-top"
                    onClick={() => dispatch(addToggle(false))}
                  >
                    <div id="toggle">
                      <div className="one" />
                      <div className="two" />
                      <div className="three" />
                    </div>
                  </div>
                ) : (
                  <div
                    className="toggle-top"
                    onClick={() => dispatch(removeToggle(true))}
                  >
                    <div id="toggle" className="on">
                      <div className="one" />
                      <div className="two" />
                      <div className="three" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="d-flex user-top">
                <p className="hover-white">Welcome Admin</p>

                <Dropdown className="theme-btn">
                  <Dropdown.Toggle
                    variant="success"
                    className="btn"
                    id="dropdown-basic"
                  >
                    <img
                      className="dashboard-icon"
                      src={ImageObj.MaleDoc}
                      alt="side-img"
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {/* <Dropdown.Item  onClick={handleShow}>Update Profile</Dropdown.Item> */}
                    {/* <Dropdown.Item onClick={handleShowPw}>
                      Change Password
                    </Dropdown.Item> */}
                    <Dropdown.Item onClick={LogOut}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
        {/* modal edit */}
        <div className="modal-edit">
          <Modal show={show} onHide={handleClose} className="edit-content">
            <div className="max-new-second">
              <div className="main-theme bg-theme border shadow">
                <Modal.Header closeButton>
                  <Modal.Title></Modal.Title>
                </Modal.Header>
               
              </div>
            </div>
          </Modal>

        </div>
      </div>
    </header>
  );
};

export default Header;
