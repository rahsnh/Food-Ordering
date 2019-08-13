import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import AddressComponent from './DeliveryAddress/AddressComponent';
import OrderComponent from './OrderDetails/OrderComponent';

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
      selectedAddress: ''
    };

    this.handleRadio = this.handleRadio.bind(this);
  }

  componentWillMount() {
    nprogress.start()
  }

  componentDidMount() {
    nprogress.done();
  }

  handleRadio(param) {
    this.setState({selectedAddress: param});
  }

  render() {
    return (
      <div style = {styles.mainContent}>
        <Grid container justify="center" spacing={12}>
            <Grid item lg={6} xs={12}>
              <AddressComponent callbackAddress={this.handleRadio}/>
            </Grid>
            <Grid item lg={3} xs={12}>
              <OrderComponent address={this.state.selectedAddress}/>
            </Grid>
        </Grid>
      </div>
    );
  }

}

export default Checkout;
