
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PORTNUMBER from "../../api/api";
import axios from "axios";
import { Link, useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toMs from '@sindresorhus/to-milliseconds'
import parseMs from 'parse-ms'
import prettyMs from 'pretty-ms'
import FormValidation from "../../formValidation/formValidation";

import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
  
const EditQuetion = () => {
    const [AllUserDetail, setUserDetail] = useState(0);
    const { id } = useParams();
    const PORT = PORTNUMBER.PORTNUMBER;
    const [editing, setEditing] = useState(false)
    const Token = localStorage.getItem("authtoken");
    const history = useHistory();
    const [lapse, setLapse] = useState(0);
    const timerRef = React.useRef(null)
    const [running, setRunning] = useState(false)

    const {
        register,
        handleSubmit,

      } = useForm();
      const loadUserId = async () => {
        await axios
          .post(
            `${PORT}/gettimeById`,
            { Id: id },
            { headers: { authtoken: Token } }
          )
          .then((res, err) => {
            if(res.data.data){
            setUserDetail(res.data.data.result);
            setLapse(res.data.data.result.end);
            }
          });
      };

      useEffect(() => {
        FormValidation();
        loadUserId();
        }, []);
    
      useEffect(() => () => clearInterval(timerRef.current), [running])
      // React.useEffect(() => () => setLapse(endUser), [])
       useEffect(
         () => {
           if (running) {
             const startTime = Date.now() - lapse  
             timerRef.current = setInterval(() => {
               // round to the nearest second
               setLapse(Math.round((Date.now() - startTime) / 1000) * 1000)
             }, 1000)
             
           } else {
             clearInterval(timerRef.current)
           
           }
         },
         [running],
       )
     
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
        // if (data.projectName || data.client || data.template) {
            DataValue = {
            Id:id,
            projectName: data.project?data.project:AllUserDetail.projectName,
            client: data.client?data.client:AllUserDetail.client,
            template: data.template?data.template:AllUserDetail.template,
            start: Date.now,
            end:lapse?lapse:AllUserDetail.end
          };
        // }
    
        await axios
          .post(`${PORT}/edittime`, DataValue, {
            headers: { authtoken: Token },
          })
          .then((res) => {
            if(res.data.status === 400){
                toast.success("This User is already exists.");
              }else{
              toast.success("User is updated successfully.");
              history.push("/UserManagement");
              }
          });
      };
     
    
    return (
        <div className="tables-field">
            <div className="project-table">
                <div className="col-12">
                <div className="row">
                        <div className="col-sm-6">
                            <div className="main-head">
                                <h4>Edit Project</h4>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="theme-btn text-right top-head">
                                <Link to="/UserManagement" className="btn">Back</Link>
                            </div>
                        </div>
                    </div>
                </div>
              {AllUserDetail?<div className="table-order shadow">
                <div>
      {editing ? (
        <Edit
          time={lapse}
          onSave={handleSaveClick}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <>
          <div>
            <label
              style={{
                fontSize: '2em',
               // display: 'block',
              }}
            >
            {prettyMs(lapse)}
            </label>
            <button
              onClick={() => setRunning(r => !r)}
              style={{
                border: '1px solid #ccc',
                background: '#fff',
                fontSize: '2em',
                padding: 5,
                margin: 2,
                width: 100,
              }}
            >
              {running ? 'Stop' : 'Start'}
            </button>
          </div>
          {/* <button onClick={handleEditClick}>manually edit</button> */}
        </>
      )}
    </div>
                    <div className="tab-head">
                    <form onSubmit={handleSubmit(onSubmit)} id="exampleEnglish">
                    <div className="row">
                           <div className=" col-sm-6">
                               <div className="form-group">
                                   <input type="text" defaultValue={AllUserDetail.projectName} name="project" {...register("project", { required: false })}className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Project Name" />
                               </div>
                           </div>
                           
                           <div className="col-sm-6">
                               <div className="form-group">
                                   <input type="text" defaultValue={AllUserDetail.client} name="client" {...register("client", { required: false })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Client" />
                               </div>
                           </div>
                           <div className="col-sm-6">
                               <div className="form-group">
                                   <input type="text" defaultValue={AllUserDetail.template} name="template" {...register("template", { required: false })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Template" />
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
                </div>:null}
            </div>
        </div>
    )
}
export default EditQuetion;