import React, { useState } from "react";
import { connect } from "react-redux";
import "../assets/css/authentication/form-2.css";
import { loginAdmin } from "../store/Admin/admin.action";

import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email || !password) {
      let error = {};
      if (!email) error.email = "Email Is Required !";
      if (!password) error.password = "Password Is Required !";
      return setError({ ...error });
    } else {
      let login = {
        email,
        password,
      };

      props.loginAdmin(login);
    }
  };

 

  return (
    <>
      <div class="form-container outer">
        <div class="form-form">
          <div class="form-form-wrap">
            <div class="form-container">
              <div class="form-content" style={{ backgroundColor: "#312a44" }}>
                <div>
                  <img
                    src={logo}
                    style={{
                      width: "120px",
                      height: "120px",
                    }}
                    alt=""
                    className="mx-auto"
                    draggable="false"
                  />
                </div>
                <h2 class="fw-bold mt-2">LogIn Flirtzy</h2>
               

                <form class="text-left">
                  <div class="form">
                    <div id="username-field" class="field-wrapper input">
                      <label for="username" style={{ fontSize: "15px" }}>
                        Email
                      </label>

                      <input
                        className="text-white"
                        id="username"
                        name="username"
                        type="Email"
                        value={email}
                        class="form-control p-3"
                        placeholder="Email"
                        onChange={(e) => {
                          setEmail(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...error,
                              email: "Email Is Required !",
                            });
                          } else {
                            return setError({
                              ...error,
                              email: "",
                            });
                          }
                        }}
                      />
                      {error.email && (
                        <span className="text-danger">{error.email}</span>
                      )}
                    </div>

                    <div id="password-field" class="field-wrapper input mb-2">
                      <div class="d-flex justify-content-between">
                        <label for="password" style={{ fontSize: "15px" }}>
                          Password
                        </label>
                      </div>

                      <input
                        className="text-white"
                        id="password"
                        name="password"
                        type="password"
                        class="form-control p-3"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...error,
                              password: "Password Is Required !",
                            });
                          } else {
                            return setError({
                              ...error,
                              password: "",
                            });
                          }
                        }}
                      />
                      {error.password && (
                        <span className="text-danger">{error.password}</span>
                      )}
                    </div>

                    <div class="row">
                      
                      <div class="field-wrapper mt-3">
                        <button
                          type="button"
                          class="btn text-white btnSubmit"
                          onClick={handleSubmit}
                          value=""
                        >
                          Log In
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { loginAdmin })(Login);
