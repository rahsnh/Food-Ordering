import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProfileComponent from './Profile/ProfileComponent';
import OrdersComponent from './Orders/OrdersComponent';
import AddressComponent from './Address/AddressComponent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import history from './history';

const styles = {
  cardDesign1: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 20,
    paddingTop: 10,
    borderRadius: 0,
    padding: 0,
    backgroundColor: '#edf1f7',
  },
  cardDesign2: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 0,
    padding: 20
  },
  listHeader: {
    listStyleType: "none",
    padding: 0,
  },
  lists: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    color: 'dimgray',
    fontSize: 16,
    fontWeight: 500,
    '&:hover': {
      backgroundColor: 'white',
      color: '#282c3f',
      cursor: 'pointer'
    }
  },
  active: {
    backgroundColor: 'blue',
    display: 'block'
  },
  modal: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'fixed',
    zIndex: 100,
    marginTop: -55
  },
  addressCard: {
    marginTop: 60,
    padding: 20,
    width: 400,
    backgroundColor: 'white'
  },
  editHeader: {
    display: 'flex',
    textTransform: 'capitalize',
    width: '100%',
    justifyContent: 'center',
    fontSize: '1.2em',
    color: 'black',
    fontWeight: 500,
    borderBottom: '1px solid #8C8C8C'
  },
  btn: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    textTransform: 'uppercase',
    color: 'white',
    fontSize: '1em',
    width: '48%',
    marginTop: 10,
    height: 40,
    border: 1,
  },
  btn2: {
    backgroundColor: '#FB641B',
    '&:hover': {
      backgroundColor: '#FB641B',
    },
    marginLeft: 13
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
  textField: {
    width: '100%',
  },
  mapArea: {
    display: 'none',
    height: 200,
    width: '100%',
    marginBottom: 20,
  },
}

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleBtn: false
    }
    this.getLocation = this.getLocation.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  getLocation() {
    var mapArea, deliveryArea;
    mapArea = document.getElementById('gmap');
    deliveryArea = document.getElementById('deliveryArea');
    const __KEY = 'AIzaSyD49U5iUDloEPQos-nUq6ebXtxg9WZrcgM';

    const google = window.google;

    let Gmap;
    let Gmarker;

    if (navigator.geolocation) {
      var lat_lng = navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const latlng = { lat, lng };

        let mapOptions = {
          center: latlng,
          zoom: 17
        };
  
        Gmap = new google.maps.Map(mapArea, mapOptions);

        Gmap.addListener('drag', function () {
          Gmarker.setPosition(this.getCenter()); // set marker position to map center
        });
  
        Gmap.addListener('dragend', function () {
          Gmarker.setPosition(this.getCenter()); // set marker position to map center
        });
  
        Gmap.addListener('idle', function () {
  
          Gmarker.setPosition(this.getCenter()); // set marker position to map center
  
          if (Gmarker.getPosition().lat() !== lat || Gmarker.getPosition().lng() !== lng) {
            setTimeout(() => {
              getGeolocation(this.getCenter().lat(), this.getCenter().lng()); // update position display
            }, 0);
          }
        });

        let markerOptions = {
          position: latlng,
          map: Gmap,
          animation: google.maps.Animation.BOUNCE,
          clickable: true
          // draggable: true
        };
        Gmarker = new google.maps.Marker(markerOptions);

        mapArea.style.display = "block";
        getGeolocation(lat, lng);
      }, showError, options);
    }

    function showError(error) {
      mapArea.style.display = "block";
      switch (error.code) {
        case error.PERMISSION_DENIED:
        mapArea.innerHTML = "You denied the request for your location."
        break;
        case error.POSITION_UNAVAILABLE:
        mapArea.innerHTML = "Your Location information is unavailable."
        break;
        case error.TIMEOUT:
        mapArea.innerHTML = "Your request timed out. Please try again"
        break;
        case error.UNKNOWN_ERROR:
        mapArea.innerHTML = "An unknown error occurred please try again after some time."
        break;
      }
    }

    const options = {
      enableHighAccuracy: true
    }

    function getGeolocation(lat, lng) {
      const latlng = lat + "," + lng;

      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${__KEY}`)
        .then(res => res.json())
        .then(data => {(deliveryArea.value = data.results[0].formatted_address)});
    }
  }

  handleToggle(value) {
    this.setState({toggleBtn: value});
  }

  render() {
    const { classes } = this.props;
    const activeStyle = {backgroundColor: 'white', borderTop: '1px solid #d4d5d9', borderBottom: '1px solid #d4d5d9'};

    return (
      <Router>
        <div>

          {this.state.toggleBtn ? 
            <div className={classes.modal}>
              <Grid container justify="center" alignItems="center" direction="column" spacing={12}>
                <Grid item lg={6} xs={12}>
                  <Card className={classes.addressCard}>
                    <div className={classes.editHeader}>edit delivery address</div>
                    <div className={classes.mapArea} id='gmap'></div>
                    {this.getLocation()}
                    <form noValidate autoComplete="off">
                      <TextField
                        id="deliveryArea"
                        InputLabelProps={{
                          shrink: true,
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
                        
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        disabled={true} />
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
                        name="signInNumber"
                        
                        className={classes.textField}
                        margin="normal"
                        variant="outlined" />
                      <Button className={classes.btn} onClick={() => this.setState({toggleBtn: false})}>cancel</Button>
                      <Button className={classes.btn + ' ' + classes.btn2}>save</Button>
                    </form>  
                  </Card>
                </Grid>
              </Grid>
            </div>:
             null
          }
          <Grid container justify="center" spacing={12}>
            <Grid item lg={2} xs={12}>
              <Card className={classes.cardDesign1}>
                <ul className={classes.listHeader}>
                  <li className={classes.lists}
                      style={this.props.location.pathname === '/account' ? activeStyle: {}}
                      onClick={() => {history.push('/account')}}>
                      Profile
                  </li>
                  <li className={classes.lists}
                      style={this.props.location.pathname === '/account/orders' ? activeStyle: {}}
                      onClick={() => {history.push('/account/orders')}}>
                      Orders
                  </li>
                  <li className={classes.lists}
                      style={this.props.location.pathname === '/account/addresses' ? activeStyle: {}}
                      onClick={() => {history.push('/account/addresses')}}>
                      Addresses
                  </li>
                </ul>
              </Card>
            </Grid>
            <Grid item lg={7} xs={12}>
              <Card className={classes.cardDesign2}>
                {this.props.location.pathname === '/account' ? <ProfileComponent /> : null}
                {this.props.location.pathname === '/account/orders' ? <OrdersComponent /> : null}
                {this.props.location.pathname === '/account/addresses' ? <AddressComponent toggleBtn={this.state.toggleBtn} change={this.handleToggle}/> : null}
              </Card>
            </Grid>
          </Grid>
        </div>
      </Router>
    );
  }

}

Account.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Account);
