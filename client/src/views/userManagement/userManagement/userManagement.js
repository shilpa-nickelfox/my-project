import React, { useState, useEffect, useRef } from "react";
import { FaBan, FaEdit, FaRegTrashAlt } from "react-icons/fa";

import { AiOutlineCheckCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";

import { FaHandHoldingHeart } from 'react-icons/fa';

import PORTNUMBER from "../../api/api";
import { Modal, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

import DatePicker from 'react-date-picker';
import Timmer from "./timmer";

const UserList = () => {
  const PORT = PORTNUMBER.PORTNUMBER;
  const Token = localStorage.getItem("authtoken");
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusId, setStatusId] = useState();
  const [activeShow, setActiveShow] = useState(false);
  const [inActiveShow, setInActiveShow] = useState(false);
 
  const LoadUser = async (pageNumber) => {
    await axios
      .get(`${PORT}/getAlltime`, { headers: { authtoken: Token } })
      .then((res) => {
        if (res.data.data) {
          setUser(res.data.data.results);
          // setCount(res.data.data.result.totalUser);
        }
      });
    setLoading(true);
  };
 
  const activeHandleClose = () => setActiveShow(false);
  const activeHandleShow = (id) => {
    setActiveShow(true);
    setStatusId(id)
  }

  const inActiveHandleClose = () => setInActiveShow(false);
  const inActiveHandleShow = (id) => {
    setInActiveShow(true);
    setStatusId(id)

  }

  const activeUser = async () => {
    await axios
      .delete(
        `${PORT}/timeDelete`, {
        headers: { authtoken: Token },
        data: { id: statusId }
      }

      )
      .then((res, err) => {
        LoadUser();
        toast.success("User is deleted successfully.");
        activeHandleClose();
      });
  };
  const inActiveUser = async () => {
    await axios
      .delete(
        `${PORT}/timeDelete`, {
        headers: { authtoken: Token },
        data: { id: statusId }
      }
      )
      .then((res, err) => {
        LoadUser();
        toast.success("User is Deleted successfully.");
        inActiveHandleClose();
      });
  };

  useEffect(() => {
   
  }, []);


  useEffect(() => {
    LoadUser();
  }, []);
  return (
    <div className="tables-field">

      <div className="project-table">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-6">
              <div className="main-head">
                <h4>User List</h4>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="theme-btn top-head text-right">
                <Link to="/addUser" className="btn">Create New Project</Link>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="form-search">
                    <form>
                        <div className="form-group icon-input top-search">
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search" />
                            <FaSearch />
                        </div>

                    </form>
                </div> */}
        <div className="table-order shadow">
          <table>
            <tbody>
              <tr>
                <th>Describe</th>
                <th>Project</th>
                <th>Client</th>
                <th>Duration </th>
                <th>Action</th>
              </tr>
              {loading ? (
                users && users.length ? (
                  users.map((user, index) => (<tr key={index}>
                    <td>{user.template}</td>
                    <td>{user.projectName}</td>
                    <td>{user.client}</td>
                    <td>
                    {user.end?<Timmer  id = {user._id} endUser={user.end} user={user} />:<Timmer  id = {user._id} endUser={0} user={user} />}
                    </td>
                    <td className="action-top">
                      <Link to={`/EditUser/${user._id}`} className="icons-action"><FaEdit /></Link>
                      <span onClick={() => inActiveHandleShow(user._id)} className="icons-action"><FaRegTrashAlt /></span>
                    </td>
                  </tr>
                  ))
                ) : (
                  <tr>
                   {"No Data available"}
                  </tr>
                )
              ) : (
                <tr className="loader-wrapper">
                  <td className="loader">
                    <div className="loading-svg">
                      <FaHandHoldingHeart />
                    </div>
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>
      {/* modals */}

      {/* active modal */}
      <Modal
        className="status-modal"
        show={activeShow}
        onHide={activeHandleClose}
      >
        <Modal.Body>Are you sure you want to activate User?</Modal.Body>
        <Modal.Footer>
          <div className="theme-btn btn-group-right text-right">
            <Button variant="secondary" onClick={activeUser}>
              Yes
            </Button>
            <Button variant="primary" onClick={activeHandleClose}>
              No
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* active modal end */}

      {/* inactive modal */}
      <Modal
        className="status-modal"
        show={inActiveShow}
        onHide={inActiveHandleClose}
      >
        <Modal.Body>Are you sure you want to Delete User?</Modal.Body>
        <Modal.Footer>
          <div className="theme-btn btn-group-right text-right">
            <Button variant="secondary" onClick={inActiveUser}>
              Yes
            </Button>
            <Button variant="primary" onClick={inActiveHandleClose}>
              No
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* inactive modal end */}
    </div>
  )
}
export default UserList;