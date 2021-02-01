import React from 'react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import { withStyles, Grid, TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import Loading from '../components/logload';
import { Component } from 'react';

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = {
  loginUser
}

const styles = {
  form: {
    textAlign: 'center',
    marginTop: '15vh',
  },
  contain: {
    padding: '40px',
    borderRadius: '20px',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 5px 5px #F0F0F0'
  },
  image: {
    margin: '20px auto 0px auto',
    width: '60px',
    height: '60px',
  },
  pageTitle: {
    margin: '20px auto 0px auto',
  },
  TextField: {
    margin: '20px auto 20px auto',
  },
  progress: {
    position: 'absolute'
  },
  warning: {
    textAlign: 'center',
    color: 'red',
    fontSize: '0.8rem',
    marginTop: '100px'
  }
}

export class login extends Component {
  state = {
    email: '',
    password: ''
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  logUser = () => {
    console.log(this.state.email, this.state.password);
    this.props.loginUser(this.state.email, this.state.password, this.props.history)
  }
  render() {
    const { classes, user: { loading } } = this.props;
    const load = loading ? (<Loading />) : <Button variant="contained" color="primary" className="buttons" id="but" onClick={this.logUser} >Login</Button>
    return (
      <div className="login-background">
        <AppBar color="inherit" id="navbar-primary">
          <Toolbar>
            <Typography variant="h6" noWrap>
              Demo Application
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm className={classes.contain}>
            <Typography variant="h3" className={classes.pageTitle}>
              Login
            </Typography>
            <form noValidate>
              <TextField id="email" name="email" type="email" label="Email" className={classes.TextField} fullWidth onChange={this.handleChange} />
              <TextField id="password" name="password" type="password" label="Password" className={classes.TextField} fullWidth onChange={this.handleChange} />
              {load}
              <br />
              <small>Dont have an account? Signup <Link to="/signup">here</Link></small>
            </form>
          </Grid>
          <Grid item sm />
        </Grid>
        <p className={classes.warning}>(Authentication not implimented, Only for demo porpose)</p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(login))
