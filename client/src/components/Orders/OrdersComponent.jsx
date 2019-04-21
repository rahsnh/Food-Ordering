import React, { Component } from 'react';
import './OrdersComponent.css';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const styles = {
  btn: {
    backgroundColor: '#FB641B',
    '&:hover': {
      backgroundColor: '#FB641B',
    },
    color: 'white',
    fontSize: 14,
    letterSpacing: 1,
    borderRadius: 0,
    paddingLeft: 20,
    paddingRight: 20
  }
}

class OrdersComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }
  }

  componentWillMount() {
    nprogress.start();
  }

  componentDidMount() {
    nprogress.done();
    fetch('/api/orders/fetchorder')
      .then(response => response.json())
      .then((result) => {
        if (result) {
          this.setState({orders: result});
        }
      })
  }
  renderorders() {
    const { classes } = this.props;

    if (this.state.orders.length) {
      return (
        <div>
        <div className="orderHeader">past orders</div>
        <ul className="orderDetail">
          {this.state.orders.map(item => {
            return (
              <li key={item.order_id}>
                <div className="orderItems">
                  <div className="orderItemDiv">
                    <img src="https://res.cloudinary.com/frenzys/image/upload/v1551213657/assets/item-1.jpg"></img>
                    <div className="orderNoDetails">
                      <div className="orderNo">{item.order_id} | {new Date(item.order_date * 1000).toLocaleString("en-us", { weekday: "short" }).toString()}, {new Date(item.order_date * 1000).toLocaleString("en-us", { month: "short" }).toString()} {new Date(item.order_date * 1000).getDate().toString()}, {new Date(item.order_date * 1000).getHours().toString()}:{new Date(item.order_date * 1000).getMinutes().toString()}</div>
                      <div className="orderDeliver">delivered to:</div>
                      <div className="addressName">Kammanahalli Home</div>
                      <div>Old 7th Cross, St Thomas Town, Ramaiah Layout, Kammanahalli, Bengaluru, Karnataka 560043, India</div>
                    </div>
                  </div>
                  <Divider style={{marginTop: 20, marginBottom: 20}}/>
                  <div className="itemDetails">
                    <div className="itemName">
                      <ul style={{padding: 0, listStyleType: 'none', letterSpacing: 0.8, fontWeight: 500}}>
                        {item.items.map(itemlist => {
                          return (
                            <li key={itemlist.item_id}>{itemlist.itemName} x {itemlist.units}</li>
                          )
                        })}
                      </ul>
                    </div>
                    <div className="paid">total paid: &#8377; {item.amount}</div>
                  </div>
                  <div style={{display: 'flex', marginTop: 10}}>
                    <Button className={classes.btn}>reorder</Button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        </div>
      )
    } else {
      return (
        <div className="orderHeader">no past orders</div>
      )
    }
  }

  render() {
    return (
      <div>
      {this.renderorders()}
      </div>
    );
  }

}

OrdersComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(OrdersComponent));
