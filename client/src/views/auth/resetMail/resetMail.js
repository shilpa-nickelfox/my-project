import React, { useEffect } from 'react'

import {useHistory, Link} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios'


import { ImageObj } from '../../../assets/images/imgeObject'
import SENDFORGOTPASSMAIL_API from '../../../views/api/api'
import { toast } from "react-toastify";


const ResetMail = () => {
    const history = useHistory()


    const { register, handleSubmit } = useForm();
  
    useEffect(() => {
        document.body.classList.add("remove-header");
           return () => {
            document.body.classList.remove("remove-header");
           }
       }, [])

   const resetLink = async (data) => {
       await axios.post(SENDFORGOTPASSMAIL_API.SENDFORGOTPASSMAIL_API, {email : data.email , link: "https://health.betademo.net/resetPassword"})
        .then((res) => {
            if(res.data.message!=='Email Not Exist'){
                history.push("/resetPasswordLink")
                toast.success(res.data.message);
            }else{
                toast.error(res.data.message);
            }
           
           
        })
}

  
    return (
        <div className="container">
            <div className="max-new-second">
                <div className="main-theme bg-theme border otp-pad new shadow">
                    <section className="select-state">
                        <div className="state-bor">
                            <div className="log-in otp-num">
                                <div className="select-steps-box">
                                    <div className="input-head">
                                        <h2>Reset Password</h2>
                                        <p>Please enter your registered email address and we would send you the link to reset your password.</p>
                                    </div>
                                </div>
                                <div className="select-box-top pr-0">
                                    <div className="input-box">
                                        <form onSubmit={handleSubmit(resetLink)}>
                                            <div className="col-12 p-0">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <input type="email" className="form-control" name="email" {...register('email', { required: true })} placeholder="Enter your Email" />
                                                           
                                                        </div>
                                                    </div>
                                                  
                                                </div>
                                            </div>
                                            <div className="theme-btn">
                                        <button type="submit" className="btn verfy-btn">Submit <span><img src={ImageObj.ArrowWhite} alt="" /></span></button>
                                        <p className="resend new">Have an account? <span><Link to="/">Login <i className="fas fa-angle-right " aria-hidden="true" /></Link></span></p>
                                    </div>
                                        </form>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default ResetMail;