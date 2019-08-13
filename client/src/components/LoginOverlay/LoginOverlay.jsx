import React, { Component } from 'react';
import './LoginOverlay.css';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from "react-redux";
import { loginUser } from "../actions/allActions";
import $ from 'jquery';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    position: 'relative',
    left: 105,
    marginTop: 8,
    color: 'white'
  },
});

class LoginOverlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      toggle: true,
      Error: '',
      signInNumber: '',
      signInPassword: '',
      signUpNumber: '',
      signUpPassword: '',
      email: '',
      firstname: '',
      lastname: '',
      otp: '',
      resend: true,
      animation: false,
      step: 1
    };

    this.changeHandler = this.changeHandler.bind(this);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);

    this.nextStep = this.nextStep.bind(this);
    this.resendOtp = this.resendOtp.bind(this);

    this.renderElement = this.renderElement.bind(this);
    this.renderSignUp = this.renderSignUp.bind(this);
  }

  changeHandler(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  nextStep(event) {
    event.preventDefault();

    const {
      signUpNumber,
      signUpPassword,
      email,
      firstname,
      lastname,
      step
    } = this.state;

    this.setState({
      isLoading: true,
      Error: ''
    });

    fetch('/api/account/verify-signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        number: signUpNumber,
        password: signUpPassword,
        email: email,
        firstname: firstname,
        lastname: lastname
      })
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            Error: '',
            isLoading: false,
            step: step+1,
            animation: !this.state.animation
          });
        } else {
          this.setState({
            Error: json.message,
            isLoading: false,
          });
        }
      });
  }

  handleLogin(event) {
    event.preventDefault();

    // Grab state
    const {
      signInNumber,
      signInPassword
    } = this.state;

    this.setState({
      isLoading: true
    });

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phno: signInNumber,
        password: signInPassword
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          this.props.loginUser(json.token);
          this.setState({
            Error: '',
            isLoading: false,
            signInPassword: '',
            signInNumber: ''
          });
          $('#login_overlay').fadeOut();
          $('.modal_content').fadeOut();
        } else {
          this.setState({
            Error: json.message,
            isLoading: false
          });
        }
      });
  }

  handleSignUp(event) {
    event.preventDefault();

    const {
      signUpNumber,
      signUpPassword,
      email,
      firstname,
      lastname,
      step,
      otp
    } = this.state;

    this.setState({isLoading: true, Error: ''});

    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        number: signUpNumber,
        password: signUpPassword,
        email: email,
        firstname: firstname,
        lastname: lastname,
        otp: otp
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            Error: json.message,
            isLoading: false,
            signUpPassword: '',
            signUpNumber: '',
            email: '',
            firstname: '',
            lastname: '',
            otp: '',
            toggle: !this.state.toggle,
            step: step-1,
            animation: !this.state.animation,
          });
        } else {
          this.setState({
            Error: json.message,
            isLoading: false,
          });
        }
      });
  }

  resendOtp() {
    const {signUpNumber} = this.state;
    fetch('/api/account/resend-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        number: signUpNumber
      })
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({resend: false});
        } else {
          this.setState({
            Error: json.message,
            resend: false
          });
        }
      })
  }

  renderElement(){
   if(this.state.Error) {
     return (
       <div>
         <p style={{color: 'red'}}>{this.state.Error}</p>
       </div>
     );
   }
 }

 renderSignUp(step) {
   const {
     signInNumber,
     signInPassword,
     signUpNumber,
     signUpPassword,
     email,
     firstname,
     lastname,
     otp
   } = this.state;

   const { classes } = this.props;

   switch(step) {
     case 1:
      return (
        <div>
        <CSSTransition in={!this.state.toggle} timeout={300} classNames="move">
        {this.state.toggle ?
            <form id="loginForm" method="post" name="loginForm" autoComplete="off" onSubmit={this.handleLogin}>
              <input type="text" className="form-input" placeholder="Enter Mobile Number" name="signInNumber" value={signInNumber} onChange={this.changeHandler} required />
              <input type="password" className="form-input" placeholder="Enter Password" name="signInPassword" value={signInPassword} onChange={this.changeHandler} required />
              <div id="forgot-psw">Forgot Password?</div>
              {this.state.isLoading ? <div className="btn-design"><CircularProgress className={classes.progress} size={24} thickness={4} /></div> : <button type="submit" id="login-btn" className="btn-design" onClick={this.handleLogin}>Log In</button>}
            </form> :
            <form method="post" name="signUpForm" autoComplete="off" onSubmit={this.nextStep}>
              <input type="text" className="form-input" placeholder="Enter Mobile Number" name="signUpNumber" minLength="10" maxLength="10"value={signUpNumber} onChange={this.changeHandler} required />
              <input type="password" className="form-input" placeholder="Enter Password" name="signUpPassword" value={signUpPassword} onChange={this.changeHandler} required />
              <input type="email" className="form-input" placeholder="Enter Email" name="email" value={email} onChange={this.changeHandler} required />
              <input type="text" className="form-input" placeholder="Enter First Name" name="firstname" value={firstname} onChange={this.changeHandler} required />
              <input type="email" className="form-input" placeholder="Enter Last Name" name="lastname" value={lastname} onChange={this.changeHandler} required />
              {!this.state.isLoading ? <button type="submit" id="signup-btn" className="btn-design" onClick={this.nextStep}>Sign Up</button> : <div className="btn-design"><CircularProgress className={classes.progress} size={24} thickness={4} /></div>}
            </form>
        }
        </CSSTransition>
        <div className="group">
          {this.state.toggle ? (<span style={{color: '#a9a9a9'}}>Don't have an account? </span>) : (<span style={{color: '#a9a9a9'}}>Already have an account? </span>)}
          <a id="toggle-btn" onClick={() => {this.setState({Error: '', toggle: !this.state.toggle})}}>{this.state.toggle ? <span>Sign Up</span> : <span>Log In</span>}</a>
        </div>
       </div>
      );
    case 2:
      return (
        <form method="post" onSubmit={this.handleSignUp}>
          <input type="text" className="form-input" placeholder="Enter OTP" name="otp" maxLength="4" value={otp} onChange={this.changeHandler} required />
          <div className="group">
            {this.state.resend ? <a id="resend-btn" onClick={this.resendOtp}>Resend OTP</a> : <span>OTP Sent</span>}
          </div>
          {!this.state.isLoading ? <button type="submit" className="btn-design" onClick={this.handleSignUp}>Submit</button> : <div className="btn-design"><CircularProgress className={classes.progress} size={24} thickness={4} /></div>}
        </form>
      );
   }
  }
 

  render() {
    const {
      isLoading,
      step
    } = this.state;

    return (
      <div id="login_overlay" className="modal">
		<span className="close" title="Close Modal" onClick={() => {this.setState({toggle: true})}}>&times;</span>
		<div className="modal_content">
			<div className="modal_container">
				<div className="modal_header">Welcome to Frenzys</div>
          <div className="group">
            {this.renderElement()}
          </div>
          <CSSTransition in={this.state.animation} timeout={300} classNames="move">
            {this.renderSignUp(step)}
          </CSSTransition>
			</div>
		</div>
	</div>
    );
  }

}

LoginOverlay.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null,{ loginUser })(withStyles(styles)(LoginOverlay));
