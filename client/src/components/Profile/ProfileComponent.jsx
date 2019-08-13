import React, { Component } from 'react';
import './ProfileComponent.css';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";
import {connect} from 'react-redux';
import { addProfile } from '../actions/allActions';
import { setCurrentUser } from '../actions/allActions';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  btn: {
    textTransform: 'uppercase',
    position: 'absolute',
    right: 0,
    backgroundColor: '#FB641B',
    '&:hover': {
      backgroundColor: '#FB641B',
    },
    color: 'white',
    fontSize: 12,
    letterSpacing: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: -5
  },
  divider: {
    marginTop: 10,
    marginBottom: 20
  },
  progress: {
    marginLeft: '70%',
    marginTop: 40,
    color: '#FB641B'
  },
  textField: {
    width: 300,
    marginTop: 5,
    marginBottom: 5
  },
  cssLabel: {
    marginTop: -5,
    fontSize: 14,
    color: '8C8C8C',
    '&$cssFocused': {
      marginTop: -5,
      color: '#39968E'
    }
  },
  cssFocused: {},
  cssOutlinedInput: {
    fontSize: 14,
    paddingBottom: 5,
    '&$cssFocused': {
      fontSize: 16
    }
  },
  underline: {
    '&:after': {
      borderWidth: 1,
      borderBottomColor: '#39968E',
    }
  },
  Btn2: {
    marginTop: 10,
    backgroundColor: '#FB641B',
    '&:hover': {
      backgroundColor: '#FB641B',
    },
    color: 'white',
    fontSize: 14,
    textAlign: 'center'
  },
  Btn3: {
    marginLeft: 10,
    backgroundColor: '#8C8C8C',
    '&:hover': {
      backgroundColor: '#8C8C8C',
    }
  },
  snackbar: {
    marginBottom: 25,
    marginRight: 20,
    marginLeft: 20
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 16
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: 10
  },
  icon: {
    fontSize: 20
  }
});

class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      togglephno: true,
      togglemail: true,
      togglepass: true,
      phno: '',
      email: '',
      open: false,
      status: '',
      Error: ''
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.editphno = this.editphno.bind(this);
    this.editmail = this.editmail.bind(this);
    this.editpass = this.editpass.bind(this);
  }
  componentDidMount() {
    if (!this.props.profile.userdetails.phno) {
      axios.get('/api/account/getdetails')
      .then(res => {
        if (res.data.success){
          this.props.addProfile(res.data.userdetails);
          this.setState({loading: false});
        }
      })
    } else {
      this.setState({loading: false});
    }
  }

  changeHandler(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  editphno(event) {
    event.preventDefault();
    let users = this.props.auth.user;
    this.setState({open: false});
    axios.post('/api/account/editphno', {phno: this.state.phno})
      .then(response => {
        if (response.data.success) {
          users.number = response.data.phno;
          this.props.setCurrentUser(users);
          this.props.addProfile({phno: users.number, email: users.email});
          this.setState({togglephno: true, open: true, status: 'success', Error: response.data.message, phno: ''});
        } else {
          this.setState({togglephno: true,open: true, status: 'error',Error: response.data.message});
        }
      });
  }

  editmail(event) {
    event.preventDefault();
    let users = this.props.auth.user;
    this.setState({open: false});
    axios.post('/api/account/editmail', {email: this.state.email})
      .then(response => {
        if (response.data.success) {
          users.email = response.data.email;
          this.props.setCurrentUser(users);
          this.props.addProfile({phno: users.number, email: users.email});
          this.setState({togglemail: true, open: true, status: 'success', Error: response.data.message, email: ''});
        } else {
          this.setState({togglephno: true,open: true, status: 'error',Error: response.data.message});
        }
      });
  }

  editpass(event) {
    event.preventDefault();
    this.setState({open: false});
    axios.post('/api/account/editpass', {pass: this.state.pass})
      .then(response => {
        if (response.data.success) {
          this.setState({togglepass: true, open: true, status: 'success', Error: response.data.message, pass: ''});
        } else {
          this.setState({togglepass: true, open: true, status: 'error', Error: response.data.message});
        }
      });
  }

  render() {
    const { classes } = this.props;
    const { status } = this.state;

    return (
      <div>
        <div style={{textTransform: 'capitalize', width: '70%', minHeight: 100, position: 'relative'}}>
          {this.state.loading? <CircularProgress className={classes.progress} size={26} />:
            <div>
              <div className="profileHeader">Profile</div>
              <div className="Header">phone number</div>
              <div className="details">
                {this.state.togglephno ? 
                  <div className="headerItem">
                    {this.props.profile.userdetails.phno}
                    <Button className={classes.btn} onClick={() => {this.setState({togglephno: false})}}>edit</Button>
                  </div>:
                  <div>
                    <form method="post" autoComplete="off" onSubmit={this.editphno}>
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
                          underline: classes.underline
                        },
                      }}
                      label="Enter Phone Number"
                      type="search"
                      name="phno"
                      value={this.state.phno}
                      onChange={this.changeHandler}
                      className={classes.textField}
                    />
                    <div>
                      <Button className={classes.Btn2} onClick={this.editphno}>Save</Button>
                      <Button className={classes.Btn2+ ' '+classes.Btn3} onClick={() => {this.setState({togglephno: true})}}>Cancel</Button>
                    </div>
                    </form>
                  </div>
                }
              </div>
              <Divider className={classes.divider}/>
              <div className="Header">email</div>
              <div className="details">
                {this.state.togglemail?
                  <div className="headerItem">
                    {this.props.profile.userdetails.email}
                    <Button className={classes.btn} onClick={() => {this.setState({togglemail: false})}}>edit</Button>
                  </div>:
                  <div>
                    <form method="post" autoComplete="off" onSubmit={this.editmail}>
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
                          underline: classes.underline
                        },
                      }}
                      label="Enter Email"
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.changeHandler}
                      className={classes.textField}
                    />
                    <div>
                      <Button className={classes.Btn2} onClick={this.editmail}>Save</Button>
                      <Button className={classes.Btn2+ ' '+classes.Btn3} onClick={() => {this.setState({togglemail: true})}}>Cancel</Button>
                    </div>
                    </form>
                  </div> 
                }
              </div>
              <Divider className={classes.divider}/>
              <div className="Header">password</div>
              <div className="details">
                {this.state.togglepass? 
                  <div className="headerItem">
                    ********
                    <Button className={classes.btn} onClick={() => {this.setState({togglepass: false})}}>edit</Button>
                  </div>:
                  <div>
                    <form method="post" autoComplete="off" onSubmit={this.editpass}>
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
                          underline: classes.underline
                        },
                      }}
                      label="Enter Password"
                      type="password"
                      name="pass"
                      value={this.state.pass}
                      onChange={this.changeHandler}
                      className={classes.textField}
                    />
                    <div>
                      <Button className={classes.Btn2} onClick={this.editpass}>Save</Button>
                      <Button className={classes.Btn2+ ' '+classes.Btn3} onClick={() => {this.setState({togglepass: true})}}>Cancel</Button>
                    </div>
                    </form>
                  </div>   
                }
              </div>
            </div>
          }
        </div>
        <Snackbar
            className={classes.snackbar}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={this.state.open}
            autoHideDuration={4000}
            onClose={this.handleClose}
          >
            {status=='success' ?
            <SnackbarContent 
              className={classes[status]}
              message={
                <span className={classes.message}>
                  <CheckCircleIcon className={classes.iconVariant, classes.icon} />
                  <span style={{marginLeft: 10}}>{this.state.Error}</span>
                </span>
              }
            /> :
            <SnackbarContent 
              className={classes[status]}
              message={
                <span className={classes.message}>
                  <ErrorIcon className={classes.iconVariant, classes.icon} />
                  <span style={{marginLeft: 10}}>{this.state.Error}</span>
                </span>
              }
            />
          }
          </Snackbar>
      </div>
    );
  }

}

ProfileComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { profile: state.profile, auth: state.auth }
}

export default connect(mapStateToProps, { addProfile, setCurrentUser })(withStyles(styles)(ProfileComponent));
