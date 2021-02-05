import React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";
import { Component } from "react";
import { withRouter } from "react-router";
import { compose } from "redux";

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  logoutUser,
};

export class Navbar extends Component {
  logoutUser = () => {
    this.props.logoutUser(this.props.history);
  };

  render() {
    return (
      <>
        <AppBar color="inherit" id="navbar-primary">
          <Toolbar>
            <Typography
              variant="h5"
              noWrap
              style={{ fontWeight: "bold", color: "#325C74" }}
            >
              One Class
            </Typography>
            <div className="ml-auto">
              <Button
                color="inherit"
                className="mr-3 border"
                onClick={this.logoutUser}
                style={{ textTransform: "none" }}
              >
                Logout
              </Button>
              {this.props.user.role === "Teacher" ? (
                <Button
                  color="inherit"
                  className="mr-3 border"
                  style={{ textTransform: "none" }}
                  onClick={() => this.props.history.push("/analysis")}
                >
                  View Class
                </Button>
              ) : null}
            </div>
          </Toolbar>
        </AppBar>
        <AppBar color="primary" id="navbar-secondary">
          <Toolbar id="toolbar-secondary">
            <NavLink
              activeClassName="active-link"
              className="mr-4 ml-5 navbar-items"
              to="/lessons"
            >
              <Typography variant="subtitle1" noWrap>
                Lessons
              </Typography>
            </NavLink>
            <NavLink
              activeClassName="active-link"
              className="mr-4 navbar-items"
              to="/assignments"
            >
              <Typography variant="subtitle1" noWrap>
                Assignments
              </Typography>
            </NavLink>
            <NavLink
              activeClassName="active-link"
              className="mr-4 navbar-items"
              to="/live"
            >
              <Typography variant="subtitle1" noWrap>
                Live Streams
              </Typography>
            </NavLink>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Navbar);
