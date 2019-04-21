import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const styles = {
  bodyBackground: {
    color: 'dimgray'
  },
  orderStatus: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10
  },
  orderReceived: {
    padding: 15,
  },
  orderHeader: {
    textTransform: 'capitalize',
    fontSize: 16,
    letterSpacing: 0.4
  },
  orderConfirm: {
    padding: 15
  },
  orderDelivery: {
    padding: 15
  },
  orderStatusText: {
    paddingTop: 10
  },
  activeStatus: {
    fontWeight: 700,
    letterSpacing: 0.8
  },
  orderDetail: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 10
  },
  orderDetailHeader: {
    fontWeight: 500,
    textTransform: 'capitalize',
    fontSize: 15,
    letterSpacing: 0.4
  },
  itemList: {
    listStyleType: 'none',
    marginLeft: -40,
    marginTop: 10,
    display: 'flex',
    position: 'relative',
    width: '110%'
  },
  itemType: {
    width: 18,
    height: 18,
    paddingTop: 1
  },
  orderItemName: {
    textTransform: 'capitalize',
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0.8,
    width: '60%'
  },
  priceGroup: {
    display: 'flex',
    position: 'absolute',
    right: 10,
  },
  inputval: {
    width: 24,
    height: 24,
    fontSize: 12,
    fontWeight: 500,
    padding: 4
  },
  itemPrice: {
    paddingLeft: 10,
    fontWeight: 500
  },
  PriceDetails: {
    paddingTop: 50,
    bottom: 10,
    fontSize: 14,
    fontWeight: 500,
    width: '110%',
    position: 'relative'
  },
  divider: {
    marginBottom: 5,
  },
  total: {
    letterSpacing: 1,
    textTransform: 'capitalize',
  },
  price: {
    position: 'absolute',
    right: 55,
    letterSpacing: 0
  }
}

class TrackOrder extends Component {
  constructor(props) {
    super(props);
    this.renderOrders = this.renderOrders.bind(this);
    this.state = {
      items: [],
      total: ''
    }
  }

  componentWillMount() {
    let fetchURL = '/api/payments/orderTrack/'+this.props.match.params.id;
    fetch(fetchURL).then(res => res.json()).then(result => {
      if (result.items) {
        this.setState({items: result.items, total: result.total});
      }
    });
  }

  renderOrders() {
    const { classes } = this.props;

    if (this.state.items.length) {
      return (
        <div className={classes.bodyBackground}>
          <Grid container justify="center" spacing={12}>
            <Grid item lg={6} xs={12}>
              <Card className={classes.orderStatus}>
              <div>
                <div className={classes.orderReceived}>
                  <span className={classes.orderHeader + " " + classes.activeStatus}>order received</span>
                  <div className={classes.orderStatusText}>Awaiting order confirmation for your order. Delivery executive will be assigned shortly.</div>
                </div>
                <Divider/>
                <div className={classes.orderConfirm}>
                  <span className={classes.orderHeader}>order Confirmed</span>
                  <div className={classes.orderStatusText}>Your food is being prepared.</div>
                </div>
                <Divider/>
                <div className={classes.orderDelivery}>
                  <span className={classes.orderHeader}>order Picked Up</span>
                  <div className={classes.orderStatusText}>Your food is out for delivery.</div>
                </div>
              </div>
              </Card>
            </Grid>
            <Grid item lg={3} xs={12}>
              <Card className={classes.orderDetail}>
                <div>
                <div className={classes.orderDetailHeader}>order details</div>
                <ul>
                  {this.state.items.map(item => {
                    return (
                      <li key={item.item_id} className={classes.itemList}>
                        <img src={"https://res.cloudinary.com/frenzys/image/upload/v1551213657/assets/" +item.itemType+ "_symbol.png"} className={classes.itemType}/>
                        <div className={classes.orderItemName}>{item.itemName} x {item.units}</div>
                        <div className={classes.priceGroup}>
                          <span className={classes.itemPrice}>&#8377; {item.total}</span>
                        </div>
                      </li>)
                  })}
                </ul>
                <div className={classes.PriceDetails}>
                  <Divider className={classes.divider}/>
                  <div className={classes.total}>total<span className={classes.price}>&#8377; {this.state.total}</span></div>
                </div>
                </div>
              </Card>
            </Grid>
          </Grid>
        </div>
      )
    }
    else {
      return(<div></div>)
    }
  }

  render() {
    return (<div>{this.renderOrders()}</div>);
  }

}
TrackOrder.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(TrackOrder));
