import React, { useEffect, useState } from "react";
import { ImageObj } from "../../../assets/images/imgeObject";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

import RESETPASSWORD_API from "../../../views/api/api";

const ResetPassword = () => {
  const history = useHistory();
  const [ConfirmErr, setConfErr] = useState();
  const params = useParams();


  const {
    register,
    handleSubmit,
  } = useForm();
  useEffect(() => {
    document.body.classList.add("remove-header");
    return () => {
      document.body.classList.remove("remove-header");
    };
  }, []);
  const resetLink = async (data) => {
    if (data.password === data.confirm_password) {
      await axios
        .post(RESETPASSWORD_API.RESETPASSWORD_API, {
          password: data.password,
          token: params.resetPwdToken,
        })
        .then(() => {
          toast.success("successfully.");
          history.push("/");
        });
    } else {
      setConfErr("Password not matched");
    }
  };

  useEffect(() => {
    document.body.classList.add("remove-header");
  }, []);

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
                  </div>
                </div>
                <div className="select-box-top pr-0">
                  <div className="input-box">
                    <form onSubmit={handleSubmit(resetLink)}>
                      <div className="col-12 p-0">
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <input
                                type="password"
                                className="form-control"
                                {...register("password", { required: true })}
                                placeholder="Enter password"
                              />
                              <small
                                id="emailHelp"
                                className=" d-none form-text text-muted"
                              >
                                We'll never share your email with anyone else.
                              </small>
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div className="form-group">
                              <input
                                type="password"
                                className="form-control"
                                {...register("confirm_password", {
                                  required: true,
                                })}
                                placeholder="Confirm password"
                              />
                              <small className=" form-text text-muted">
                                {ConfirmErr}
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="theme-btn select-m">
                        <button type="submit" className="submit btn verfy-btn">
                          Reset Password{" "}
                          <span>
                            <img src={ImageObj.ArrowWhite} alt="" />
                          </span>
                        </button>
                        <p className="resend new">
                          Have an account?{" "}
                          <span>
                            <a href="/">
                              Login{" "}
                              <i
                                className="fas fa-angle-right "
                                aria-hidden="true"
                              />
                            </a>
                          </span>
                        </p>
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
  );
};

export default ResetPassword;
