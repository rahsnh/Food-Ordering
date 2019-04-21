import React, { Component } from 'react';
import './ProfileComponent.css';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
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
  }
}

class ProfileComponent extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div style={{textTransform: 'capitalize', width: '70%', position: 'relative'}}>
        <div className="profileHeader">Profile</div>
        <div className="Header">phone number</div>
        <div className="details">
          <div className="headerItem">8763321018</div>
          <Button className={classes.btn}>edit</Button>
        </div>
        <Divider className={classes.divider}/>
        <div className="Header">email</div>
        <div className="details">
          <div className="headerItem">rahsnh@hotmail.com</div>
          <Button className={classes.btn}>edit</Button>
        </div>
        <Divider className={classes.divider}/>
        <div className="Header">password</div>
        <div className="details">
          <div className="headerItem">********</div>
          <Button className={classes.btn}>edit</Button>
        </div>
      </div>
    );
  }

}

ProfileComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(ProfileComponent));
