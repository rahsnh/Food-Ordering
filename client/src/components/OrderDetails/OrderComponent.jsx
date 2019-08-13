import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './OrderComponent.css';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { clearCart } from '../actions/allActions';
import { Redirect } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';

const styles = theme => ({
  detailsHeader: {
    textTransform: 'uppercase',
    fontWeight: 500,
    fontSize: 16,
    letterSpacing: 1,
    color: '#8C8C8C',
  },
  orderList: {
    listStyleType: 'none',
    marginLeft: -40,
    marginTop: 10,
    display: 'flex',
    position: 'relative',
    width: '120%',
  },
  itemType: {
    width: 18,
    height: 18,
    paddingTop: 1,
  },
  orderItemName: {
    textTransform: 'capitalize',
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: 500,
    color: 'dimgray',
    letterSpacing: 0.8,
    width: '60%',
  },
  qtyPriceGroup: {
    display: 'flex',
    position: 'absolute',
    right: 0,
    width: '40%',
  },
  minBtn: {
    color: 'black',
    width: 24,
    height: 24,
    fontSize: 8,
    padding: 0,
    backgroundColor: '#EEEEEE'
  },
  maxBtn: {
    color: 'black',
    width: 24,
    height: 24,
    fontSize: 8,
    padding: '0',
    backgroundColor: '#EEEEEE'
  },
  inputval: {
    width: 24,
    height: 24,
    fontSize: 14,
    fontWeight: 500,
    padding: 1,
  },
  itemPrice: {
    paddingLeft: 10,
    fontWeight: 500,
  },
  divider: {
    marginBottom: 5,
  },
  PriceDetails: {
    paddingTop: 20,
    bottom: 10,
    fontSize: 14,
    fontWeight: 500,
    width: '100%',
  },
  subTotal: {
    letterSpacing: 1,
    textTransform: 'capitalize',
  },
  price: {
    position: 'absolute',
    right: 20,
    letterSpacing: 0,
  },
  deliveryCharge: {
    letterSpacing: 1,
    fontWeight: 400,
    textTransform: 'capitalize',
  },
  taxes: {
    letterSpacing: 1,
    fontWeight: 400,
    textTransform: 'capitalize',
  },
  total: {
    letterSpacing: 1,
    textTransform: 'capitalize',
  },
  payBtn: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#FB641B',
    '&:hover': {
      backgroundColor: '#FB641B',
    },
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  instructions: {
    width: '100%',
    marginBottom: 10,
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
  snackbar: {
    marginBottom: 25,
    marginRight: 20,
    marginLeft: 20
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
  }
});

class OrderComponent extends Component {
  constructor() {
    super()
    this.openCheckout = this.openCheckout.bind(this);
    this.state = {
      order_id: '',
      redirect: false,
      open: false
    };
  }

  openCheckout() {
    var _this = this;
    if (this.props.address != '') {
      fetch('/api/payments/createpayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nickname: this.props.address
        })
      }).then(response => response.json())
        .then((result) => {
          let options = {
            "key": "rzp_test_9F5lBCV4cZB1MH",
            "amount": result.amount, // 2000 paise = INR 20, amount in paisa
            "order_id": result.order_id,
            "name": "Frenzys",
            "description": "Purchase Description",
            "prefill": {
              "name": "Harshil Mathur",
              "email": "harshil@razorpay.com"
            },
            "handler": function(response) {
              if (response.razorpay_payment_id) {
                fetch('/api/payments/authorizepayment', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    pay_id: response.razorpay_payment_id
                  }),
                }).then(res => res.json())
                .then(result => {
                  if (result.paymentstatus == 'authorized') {
                    _this.setState({
                        order_id: result.order_id,
                        redirect: true,
                    });
                  }
                })
              }
            },
            "notes": {
              "address": "Hello World"
            },
            "theme": {
              "color": "#39968E"
            }
          };

          let rzp = new window.Razorpay(options);
          rzp.open();
        })
    } else {
      this.setState({open: true});
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      this.props.clearCart();
      return <Redirect to={'/track-order/'+this.state.order_id} />
    }
  }

  renderOrderDetails() {
    const { classes } = this.props;

    if (this.props.addedItems.length) {
      return (
        <Card className = "orderDetails">
          <div className={classes.detailsHeader}>order details</div>
          <div>
            <ul>
              {(this.props.addedItems.map(item => {
                return (<li key={item.item_id} className={classes.orderList}>
                  <img className={classes.itemType} src={"assets/" +item.itemType+ "_symbol.png"} />
                  <div className={classes.orderItemName}>{item.itemName}</div>
                  <div className={classes.qtyPriceGroup}>
                  <button type="button" className={"btn btn-default btn-number " + classes.minBtn} disabled="disabled">
                    <span className="glyphicon glyphicon-minus"></span>
                  </button>
                  <input type="text" name="quant[1]" className={"form-control input-number " + classes.inputval} value={item.units} readOnly/>
                  <button type="button" className={"btn btn-default btn-number " + classes.maxBtn}>
                    <span className="glyphicon glyphicon-plus"></span>
                  </button>
                  <span className={classes.itemPrice}>{item.total}</span>
                  </div>
                </li>)
              }))}
            </ul>
          </div>
          <div className={classes.PriceDetails}>
            <form noValidate autoComplete="off">
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
              className={classes.instructions}
              label="Any Instructions"
              variant="outlined" />
            </form>
            <Divider className={classes.divider}/>
            <div className={classes.subTotal}>subtotal<span className={classes.price}>&#8377;{this.props.cartTotal}</span></div>
            <div className={classes.deliveryCharge}>delivery charge<span className={classes.price}>&#8377;20.00</span></div>
            <div className={classes.taxes}>taxes<span className={classes.price}>&#8377;7.45</span></div>
            <Divider className={classes.divider}/>
            <div className={classes.total}>total<span className={classes.price}>&#8377;{this.props.cartTotal}</span></div>
            <Button id="payBtn" className={classes.payBtn} onClick={this.openCheckout}>pay now</Button>
          </div>
        </Card>
      );
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
      {this.renderRedirect()}
      {this.renderOrderDetails()}
      <Snackbar
        className={classes.snackbar}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={this.state.open}
        autoHideDuration={4000}
        onClose={() => {this.setState({open: false})}}
        >
        <SnackbarContent 
              className={classes.error}
              message={
                <span className={classes.message}>
                  <ErrorIcon className={classes.iconVariant, classes.icon} />
                  <span style={{marginLeft: 10}}>Please Select Delivery Address</span>
                </span>
              }
            />
      </Snackbar>
      </div>);
  }

}

OrderComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { addedItems: state.cart.addedItems, cartTotal: state.cart.cartTotal }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    clearCart: ()=>{dispatch(clearCart())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrderComponent));
