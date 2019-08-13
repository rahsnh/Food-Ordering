import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './LoginComponent.css';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { loginUser } from "../actions/allActions";
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  textField: {
    width: 400,
  },
  nameField: {
    width: '45%'
  },
  cssRoot: {
    backgroundColor: '#FB641B',
    '&:hover': {
      backgroundColor: '#FB641B',
    },
    color: 'white',
    fontSize: 16,
    width: 400,
    marginTop: 10,
    height: 40,
    border: 1,
  },
  cssLabel: {
    fontSize: 14,
    color: '#8C8C8C',
    fontWeight: '500',
    '&$cssFocused': {
      color: '#39968E',
    },
  },
  cssFocused: {},
  cssOutlinedInput: {
    fontSize: 14,
    '&$cssFocused $notchedOutline': {
      borderColor: '#39968E',
      borderWidth: 1
    },
  },
  notchedOutline: {},
  error: {
    marginTop: 20,
    backgroundColor: '#FFF2F1',
    borderRadius: 4,
    border: '1px solid red',
    paddingLeft: 15,
    height: 24,
    fontSize: 14,
    verticalAlign: 'middle'
  },
  progress: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    color: '#FB641B'
  },
  header: {
    height: 60,
    width: '100%',
    display: 'inline-flex'
  },
  subHeader: {
    height: '100%',
    width: '50%',
    textAlign: 'center',
    fontSize: '1.2em',
    color: '#8C8C8C',
    fontWeight: 400,
    borderBottom: '1px solid #39968E'
  },
  titleHeader: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: '1.4em'
  },
  buttonHeader: {
    width: '100%',
    height: '100%',
    outline: 'none',
    background: 'none',
    textTransform: 'capitalize',
    border: 'none',
    '&:hover': {
      borderBottom: '1.5px solid #39968E'
    }
  },
  divider: {
    marginTop: 10,
    backgroundColor: '#8C8C8C'
  },
  bottomDiv: {
    marginTop: 15,
    display: 'inline-flex',
    width: '100%',
    position: 'relative'
  },
  bottomSubDiv: {
    fontSize: 13,
    textTransform: 'capitalize',
    width: '50%',
    cursor: 'pointer'
  }
});

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      signInNumber: '',
      signInPass: '',
      signUpNumber: '',
      signUpPass: '',
      email: '',
      firstname: '',
      lastname: '',
      Error: '',
      toggleLogin: true,
      redirectTo: false
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  changeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  handleLogin(event) {
    event.preventDefault();

    // Grab state
    const {
      signInNumber,
      signInPass
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phno: signInNumber,
        password: signInPass
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          this.props.loginUser(json.token);
          this.setState({
            Error: '',
            isLoading: false,
            signInPass: '',
            signInNumber: '',
            redirectTo: true
          });
        //window.location.href = '/';
        } else {
          this.setState({
            Error: json.message,
            isLoading: false,
          });
        }
      });
  }

  render() {
    const { classes } = this.props;
    const { signInNumber, signInPass, signUpNumber, signUpPass, email, firstname, lastname } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectTo } = this.state

    if (redirectTo === true) {
      return <Redirect to={from} />
    }

    return (
      <Grid container justify="center" alignItems="center" direction="column" spacing={12}>
        <Grid item lg={6} xs={12}>
          <Card className = "login-card">
            <div className={classes.header}>
              <div className={classes.subHeader}><button className={classes.buttonHeader} onClick={() => {this.setState({toggleLogin: true});}} style={this.state.toggleLogin ? {borderBottom: '1.5px solid #39968E'}:(null)}>login</button></div>
              <div className={classes.subHeader}><button className={classes.buttonHeader} onClick={() => {this.setState({toggleLogin: false});}} style={!this.state.toggleLogin ? {borderBottom: '1.5px solid #39968E'}:(null)}>register</button></div>
            </div>
            <div className={classes.titleHeader}>Login with your email</div>
            <div>
              {this.state.Error ? <div className={classes.error}><p style={{color: 'red'}}>{this.state.Error}</p></div> : null}
              {this.state.toggleLogin ? 
                <form noValidate autoComplete="off" onSubmit={this.handleLogin}>
                <TextField
                  id="numField"
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  label="Enter Mobile number"
                  type="text"
                  name="signInNumber"
                  value={signInNumber}
                  onChange={this.changeHandler}
                  className={classes.textField}
                  margin="normal"
                  variant="outlined" />
                  <div>
                  <TextField
                  id="passField"
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  label="Enter Password"
                  type="password"
                  name="signInPass"
                  value={signInPass}
                  onChange={this.changeHandler}
                  className={classes.textField}
                  margin="normal"
                  variant="outlined" />
                  </div>
                  <Button type="submit" className={classes.cssRoot} onClick={this.handleLogin}>{!this.state.isLoading ? <span>login</span> : <div><CircularProgress className={classes.progress} size={26} /></div>}</Button>
              </form> : 
                <form noValidate autoComplete="off" onSubmit={this.handleRegister}>
                <TextField
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  label="Enter Mobile number"
                  type="text"
                  name="signUpNumber"
                  value={signUpNumber}
                  onChange={this.changeHandler}
                  className={classes.textField}
                  margin="normal"
                  variant="outlined" />
                  <div>
                  <TextField
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  label="Enter Password"
                  type="password"
                  name="signUpPass"
                  value={signUpPass}
                  onChange={this.changeHandler}
                  className={classes.textField}
                  margin="normal"
                  variant="outlined" />
                  </div>
                  <div>
                  <TextField
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  label="Enter Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.changeHandler}
                  className={classes.textField}
                  margin="normal"
                  variant="outlined" />
                  </div>
                  <div>
                  <TextField
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  label="Firstname"
                  type="text"
                  name="firstname"
                  value={firstname}
                  onChange={this.changeHandler}
                  className={classes.nameField}
                  margin="normal"
                  variant="outlined" />
                  <TextField
                  style={{float: 'right'}}
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  label="Lastname"
                  type="text"
                  name="lastname"
                  value={lastname}
                  onChange={this.changeHandler}
                  className={classes.nameField}
                  margin="normal"
                  variant="outlined" />
                  </div>
                  <Button type="submit" className={classes.cssRoot} onClick={this.handleRegister}>{!this.state.isLoading ? <span>Register</span> : <div><CircularProgress className={classes.progress} size={26} /></div>}</Button>
              </form>
              }
              <Divider className={classes.divider}/>
              <div className={classes.bottomDiv}>
                <div  className={classes.bottomSubDiv}>forgotten password?</div>
                <div  className={classes.bottomSubDiv} style={{textAlign: 'right'}} onClick={() => {this.setState({toggleLogin: false});}}>create account</div>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    );
  }

}

LoginComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(withStyles(styles)(LoginComponent));
