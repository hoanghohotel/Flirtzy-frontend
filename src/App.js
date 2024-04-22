import "./App.css";
import axios from "axios";

import { Route, Switch, useHistory } from "react-router-dom";
// component

// css
import "./assets/css/bootstrap.min.css";
import "./assets/css/plugins.css";
import "./assets/css/structure.css";
import "./assets/css/scrollspyNav.css";

// js

// import "./assets/js/perfect-scrollbar.min.js";
import "./assets/js/bootstrap/js/bootstrap.min.js";
import "./assets/js/bootstrap/js/popper.min";
import "./assets/js/app.js";
// import "./assets/js/custom";
// import "./assets/js/scrollspyNav.js";

import { Suspense, lazy } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LOGIN_ADMIN, LOGOUT_ADMIN } from "./store/Admin/admin.type";
import setToken from "./utils/setToken";
import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import { IdleTimeoutManager } from "idle-timer-manager";

import Registration from "./Pages/Registration";
import UpdateCode from "./Pages/UpdateCode";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import AuthRoute from "./utils/AuthRoute";
import PrivateRouter from "./utils/PrivateRoute";

function App() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    axios
      .get("/login")
      .then((res) => {
        setLogin(res.data.login);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const isAuth = localStorage.getItem("isAuth");

  const dispatch = useDispatch();
  const key = localStorage.getItem("key");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token && !key) return;
    dispatch({ type: LOGIN_ADMIN, payload: token });
  }, [setToken, key]);

  useEffect(() => {
    const manager = new IdleTimeoutManager({
      timeout: 3600, //30 min (in sec)
      onExpired: (time) => {
        setOpen(true);
      },
    });

    return () => {
      manager.clear();
    }; //eslint-disable-next-line
  }, []);

  const handleClose = () => {
    setOpen(false);
    dispatch({ type: LOGOUT_ADMIN });
    history.push("/");
    window.location.reload();
  };

  return (
    <>
      <Switch>
        <AuthRoute exact path="/" component={login ? Login : Registration} />
        {isAuth && <Route path="/admin" component={Admin} />}
        <PrivateRouter path="/admin" component={Admin} />
        <AuthRoute exact path="/code" component={UpdateCode} />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute path="/Registration" component={Registration} />
      </Switch>

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ width: "425px", height: "225px" }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="session-dialog">
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              className="text-white "
            >
              Session TimeOut
            </DialogContentText>
          </DialogContent>
        </div>
        <DialogActions className="mx-auto">
          <button className="btn btn-info px-3 " onClick={handleClose}>
            Log Out
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
