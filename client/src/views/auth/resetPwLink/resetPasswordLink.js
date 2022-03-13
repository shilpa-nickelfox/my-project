import React,{useEffect}  from 'react'
import { ImageObj } from '../../../assets/images/imgeObject'
import {useHistory} from 'react-router-dom'


const ResetPasswordLink = () => {
    const history = useHistory()
    const Jump =()=>{
        history.push("/")
   
    }
    useEffect(() => {
        document.body.classList.add("remove-header");
           return () => {
            document.body.classList.remove("remove-header");
           }
       }, [])
    return (
        <div className="container">
            <div className="max-new-second">
                <div className="main-theme bg-theme border otp-pad new shadow">
                    <section className="select-state">
                        <div className="state-bor">
                            <div className="log-in otp-num">
                                <div className="select-steps-box">
                                    <div className="input-head">
                                        <h2>Check Your Email</h2>
                                        <p>We have sent an email to your registered email address. Please check that to continue.</p>
                                    </div>
                                </div>
                                <div className="select-box-top pr-0">
                                
                                    <div className="theme-btn">
                                        <button className="btn verfy-btn" onClick={Jump}>Go Back To Login <span><img src={ImageObj.ArrowWhite} alt="" /></span></button>
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

export default ResetPasswordLink;