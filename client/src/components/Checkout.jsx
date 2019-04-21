import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import LoginComponent from './LoginComponent/LoginComponent';
import AddressComponent from './DeliveryAddress/AddressComponent';
import OrderComponent from './OrderDetails/OrderComponent';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  getFromStorage,
} from '../utils/storage';

const styles = {
  mainContent: {
    backgroundColor: '#F1F3F6',
    height: '60%',
    width: '100%'
  },
  progressDiv: {
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  progress: {
    margin: 'auto',
    color: '#FB641B'
  }
}

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      disp: '',
      selectedAddress: ''
    };

    this.handleRadio = this.handleRadio.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
  }

  componentWillMount() {
    nprogress.start()
  }

  componentDidMount() {
    nprogress.done();

    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              disp: 'none',
              isLoading: false,
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  handleRadio(param) {
    this.setState({selectedAddress: param});
  }

  render() {
    return (
      <div style = {styles.mainContent}>
      {this.state.isLoading ?
        <div style={styles.progressDiv}><CircularProgress style={styles.progress} /></div> :
        <Grid container justify="center" alignItems={(this.state.disp != 'none') ? "center":""} direction={(this.state.disp != 'none') ? "column":""} spacing={12}>
            {(this.state.disp != 'none')? 
            (<Grid item lg={6} xs={12}>
              <LoginComponent />
            </Grid>):
            (<><Grid item lg={6} xs={12}>
              <AddressComponent callbackAddress={this.handleRadio}/>
            </Grid>
            <Grid item lg={3} xs={12}>
              <OrderComponent address={this.state.selectedAddress}/>
            </Grid></>)}
        </Grid>
      }
      </div>
    );
  }

}

export default Checkout;
