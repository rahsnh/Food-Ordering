import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';
import ErrorIcon from '@material-ui/icons/Error';
import axios from "axios";

const styles = theme => ({
  addressCard: {
    marginTop: 30,
    marginBottom: 20
  },
  root: {
    display: 'flex',
  },
  addressLabel: {
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: 500,
    color: '#8C8C8C',
    letterSpacing: 1,
    padding: 20,
  },
  addressList: {
    padding: '20px 0',
    margin: 0,
  },
  addressBox: {
    paddingLeft: 0,
    marginRight: 50,
    '@media (max-width:780px)': {
      marginRight: 20
    }
  },
  userName: {
    fontWeight: 500,
    textTransform: 'capitalize',
    fontSize: 16
  },
  addressText: {
    marginTop: 5,
    fontSize: 16,
    lineHeight: 2
  },
  areaText: {
    fontSize: 16,
    lineHeight: 1.5
  },
  addressBtn: {
    fontSize: 14,
    fontWeight: 500,
    textTransform: 'capitalize',
    color: '#FB641B',
    paddingLeft: 30,
  },
  newAddressBox: {
    padding: '5px 30px',
  },
  cssLabel: {
    fontSize: 14,
    color: '8C8C8C',
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
  deliveryArea: {
    minWidth: 305,
    maxWidth: 400,
  },
  expansionPanelSummary: {
    backgroundColor: '#F1F3F6',
  },
  currLocation: {
    height: 55,
    marginLeft: 30,
    border: '1px solid #FB641B',
  },
  completeAddress: {
    marginTop: 20,
    width: 400,
  },
  nickNameHeader: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 500,
    marginTop: 20,
  },
  nickName: {
    marginTop: 20,
    width: 80,
    height: 40,
    fontSize: 14,
    border: '1px solid #8C8C8C',
    '&:hover': {
      border: '1px solid #FB641B',
      color: '#FB641B',
    },
    color: '#8C8C8C',
    marginRight: 20,
  },
  nickNameBox: {
    marginTop: 20,
    width: 400,
  },
  mapArea: {
    display: 'none',
    height: 200,
    width: 400,
    marginBottom: 20,
  },
  submitBox: {
    marginTop: 20,
    width: '100%',
    height: 40,
    fontSize: 14,
    border: '1px solid #FB641B',
    color: '#FB641B',
    minWidth: 305,
    maxWidth: 400,
    display: 'flex'
  },
  progress: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    color: '#FB641B'
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
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: 10
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 16
  },
  root: {
    paddingLeft: 20,
    '&$checked': {
      color: '#FB641B',
    },
  },
  checked: {}
});

class AddressComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      nickName: '',
      Error: '',
      open: false,
      loading: false,
      toggleName: false,
      status: '',
      savedAddress: [],
      expanded: false,
      selectedValue: ''
    }

    this.getLocation = this.getLocation.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.addAddress =  this.addAddress.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
  }

  componentDidMount() {
    axios.post('/api/address/fetchaddress')
      .then(json => {
        if (json.data.success) {
          this.setState({
            savedAddress: json.data.address
          });
        }
      });
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

  setName(param,e) {
    document.getElementById('home').style.cssText = 'border-color: #8C8C8C; color: #8C8C8C';
    document.getElementById('work').style.cssText = 'border-color: #8C8C8C; color: #8C8C8C';
    document.getElementById('other').style.cssText = 'border-color: #8C8C8C; color: #8C8C8C';
    
    document.getElementById(param).style.cssText = 'border-color: #FB641B; color: #FB641B';
    this.setState({
      toggleName: false,
      nickName: param
    });
  }

  toggleState() {
    document.getElementById('home').style.cssText = 'border-color: #8C8C8C; color: #8C8C8C';
    document.getElementById('work').style.cssText = 'border-color: #8C8C8C; color: #8C8C8C';
    document.getElementById('other').style.cssText = 'border-color: #8C8C8C; color: #8C8C8C';

    if (this.state.toggleName) {
      document.getElementById('other').style.cssText = 'border-color: #8C8C8C; color: #8C8C8C';
    } else {
      document.getElementById('other').style.cssText = 'border-color: #FB641B; color: #FB641B';
    }
    this.setState({nickName: '', toggleName: !this.state.toggleName});
  }

  toggleExpanded() {
    this.setState({expanded: !this.state.expanded});
  }

  addAddress(event) {
    event.preventDefault();

    const {
      address,
      nickName
    } = this.state;

    const deliveryArea = document.getElementById('deliveryArea').value;

    this.setState({loading: true, open: false});

    axios.post('/api/address/newaddress', {deliveryarea: deliveryArea, address: address, nickname: nickName})
      .then(json => {
        if (json.data.success) {
          this.setState({
            Error: json.data.message,
            open: true,
            loading: false,
            status: 'success',
            savedAddress: [json.data.addedAddress, ...this.state.savedAddress],
            expanded: false
          })
        } else {
          this.setState({
            Error: json.data.message,
            open: true,
            loading: false,
            status: 'error'
          })
        }
      })
  }

  getLocation() {
    const mapArea = document.getElementById('map');
    const deliveryArea = document.getElementById('deliveryArea');
    const __KEY = '';

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

  handleRadio(param,event) {
    this.setState({selectedValue: param});
    this.props.callbackAddress(param);
  }

  showAddress() {
    const { classes } = this.props;
    const {savedAddress} = this.state;

    if (savedAddress.length) {
      return (
        <div>
          {savedAddress.map(item => (
            <ListItem key={item.nickname} button divider className={classes.addressList} onClick={this.handleRadio.bind(this, item.nickname)}>
              <Radio 
                checked={this.state.selectedValue === item.nickname}
                onChange={this.handleRadio.bind(this, item.nickname)}
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
                value={item.nickname} 
                name="radio-button-demo" 
                aria-label={item.nickname}/>
              <ListItemText className={classes.addressBox}>
                <span className={classes.userName}>{item.nickname}</span>
                <div className={classes.addressText}><span>{item.houseno}</span></div>
                <div className={classes.areaText}><span>{item.deliveryarea}</span></div>
              </ListItemText>
            </ListItem>
          ))}
        </div>
      );
    }
  }

  render() {
    const { classes } = this.props;
    const { address, nickName, status, savedAddress} = this.state;

    return (
      <Card className = {classes.addressCard}>
        <div className = {classes.addressLabel}>delivery address</div>
        <div>
          <List component="nav">
            {this.showAddress()}
          </List>
          <ExpansionPanel expanded={this.state.expanded} onChange={this.toggleExpanded}>
            <ExpansionPanelSummary className={classes.expansionPanelSummary}>
              <span className={classes.addressBtn}>add a new address</span>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={classes.newAddressBox}>
                <div className={classes.mapArea} id="map"></div>
                <form method="post" autoComplete="off" onSubmit={this.addAddress}>
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
                  className={classes.deliveryArea}
                  name="deliveryarea"
                  label="Delivery Area"
                  placeholder="Enter Delivery Area"
                  variant="outlined" 
                  disabled={true} />
                  <Button className={classes.currLocation} id="currLocation" onClick={this.getLocation}><i className="material-icons" style={{color: '#FB641B'}}>my_location</i></Button>
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
                    className={classes.completeAddress}
                    name="address"
                    value={address}
                    onChange={this.changeHandler}
                    label="Flat/Door No"
                    variant="outlined" />
                  </div>
                  <div className={classes.nickNameHeader}>Nickname</div>
                  <Button id="home" className={classes.nickName} onClick={this.setName.bind(this, 'home')}>home</Button>
                  <Button id="work" className={classes.nickName} onClick={this.setName.bind(this, 'work')}>work</Button>
                  <Button id="other" className={classes.nickName} onClick={this.toggleState}>other</Button>
                  {this.state.toggleName ?
                    <TextField
                    id="outlined"
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
                    className={classes.nickNameBox}
                    name="nickName"
                    value={nickName}
                    onChange={this.changeHandler}
                    label="Nickname"
                    variant="outlined" /> : null
                  }
                    {!this.state.loading ?
                      <Button type="submit" className={classes.submitBox} onClick={this.addAddress}>Add Address</Button> :
                      <div className={classes.submitBox}><CircularProgress className={classes.progress} size={26} /></div>}
                  </form>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
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
      </Card>
    );
  }

}

AddressComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddressComponent);
