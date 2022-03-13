import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PORTNUMBER from "../../api/api";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toasterValue } from "../../../redux/actions/action";
import { useDispatch } from "react-redux";
import FormValidation from "../../formValidation/formValidation";
import prettyMs from 'pretty-ms'
import toMs from '@sindresorhus/to-milliseconds'
import parseMs from 'parse-ms'

function useLocalStorage(key, initialValue, parseValue = v => v) {
    const [item, setValue] = React.useState(() => {
      const value = parseValue(localStorage.getItem(key)) || initialValue
      localStorage.setItem(key, value)
      return value
    })
  
    const setItem = newValue => {
      setValue(newValue)
      window.localStorage.setItem(key, newValue)
    }
  
    return [item, setItem]
  }
  

const AddUser = () => {
    const dispatch = useDispatch();
    // const [lapse, setLapse] = useLocalStorage('nanoedmo1:time', 0, v => Number(v))
  
  const [editing, setEditing] = React.useState(false)
  const [running, setRunning] = React.useState(false)
  const editRef = React.useRef(null)
  const timerRef = React.useRef(null)
    const PORT = PORTNUMBER.PORTNUMBER;
    const Token = localStorage.getItem("authtoken");
    const history = useHistory();
    const {
        register,
        handleSubmit,
    } = useForm();

    const LoadBlog = async () => {
        await axios.post(
            `${PORT}/getAlltime`,
            {},
            { headers: { authtoken: Token } }
        );
    };
    
    // React.useEffect(() => () => clearInterval(timerRef.current), [running])

    // React.useEffect(
    //   () => {
    //     if (running) {
    //       const startTime = Date.now() - lapse  
    //       timerRef.current = setInterval(() => {
    //         // round to the nearest second
    //         setLapse(Math.round((Date.now() - startTime) / 1000) * 1000)
    //       }, 1000)
          
    //     } else {
    //       clearInterval(timerRef.current)
        
    //     }
    //   },
    //   [running],
    // )
  
    function handleSaveClick(newLapse) {
      setEditing(false)
      setLapse(newLapse)
    }
  
    function handleEditClick() {
      setRunning(false)
      setEditing(true)
    }
    
    const onSubmit = async (data) => {
        let DataValue;
        var fd = new FormData();
        DataValue = {
            projectName: data.project,
            client: data.client,
            template: data.template,
            start: Date.now,
            // end: lapse
        }
        await axios
            .post(`${PORT}/timeCreate`, DataValue, { headers: { authtoken: Token } })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    dispatch(toasterValue("You have successfully added a new User"));
                    LoadBlog();
                    history.push("/UserManagement");
                } else {
                }
            });
    };

    useEffect(() => {
        FormValidation();
        return () => { };
    }, []);

    return (
        <div className="tables-field">
            <div className="project-table">
                <div className="col-12">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="main-head">
                                <h4>Create Project</h4>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="theme-btn text-right top-head">
                                <Link to="/UserManagement" className="btn">Back</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-order shadow">
                    <div className="tab-head">
                    <div className="col-sm-6">
                
                                </div>
                        <form onSubmit={handleSubmit(onSubmit)} id="exampleEnglish">
                            <div className="row">

                                <div className=" col-sm-6">
                                    <div className="form-group">
                                        <input type="text" name="project" {...register("project", { required: false })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Project Name" />
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input type="text" name="client" {...register("client", { required: false })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Client" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input type="text" name="template" {...register("template", { required: false })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Template" />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="theme-btn btn-group-right text-right">
                                        <button className="btn" type="submit">Save</button>
                                        <Link to="/UserManagement" className="btn">Cancel</Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                     
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddUser;