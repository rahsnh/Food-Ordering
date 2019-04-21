import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createCart } from '../actions/cartActions';
import './CartOverlay.css';

class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      width: window.innerWidth,
    }
    this.checkoutClick = this.checkoutClick.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  subtractOnClick(item_id, itemPrice, units) {
    const cartItem = {
      item_id: item_id,
      itemPrice: itemPrice,
      value: units,
    }
    this.props.createCart(cartItem);
  }

  checkoutClick() {
    this.setState({show: !this.state.show});
  }

  addOnClick(item_id, itemPrice) {
    const cartItem = {
      item_id: item_id,
      itemPrice: itemPrice,
      value: "increase",
    }
    this.props.createCart(cartItem);
  }

  renderCart() {
    const width = this.state.width;
    const isMobile = width <= 768;

    if (isMobile) {
      if (this.props.addedItems.length) {
        if (this.state.show) {
          return (
            <button className="footer_cart" onClick={this.checkoutClick}>
              <span>{this.props.addedItems.length} item in Cart</span>
              <span id="right_arrow"><i className="material-icons">arrow_forward</i></span>
              <span id="checkout_txt" style={{textTransform: 'uppercase'}}>proceed to checkout</span>
            </button>
          )
        } if (!this.state.show) {
          return (
            <div>
            <div id="cart_overlay">
      		<div className="cart_div_inner">
      			<div className="cart_content_div">
      				<div id="close_cart_btn" onClick={this.checkoutClick}><i className="material-icons">close</i></div>
      				<ul>
                {(this.props.addedItems.map(item => {
                  return (<li key={item.item_id}>
                    <img src={"assets/" +item.itemType+ "_symbol.png"} /><div className="cart_item_div"><span>{item.itemName}</span><div className="item_price_div">{item.total}</div></div>
                    <div className="add_minus_div">
                      <button type="button" className="minus_btn" onClick={() => {this.subtractOnClick(item.item_id, item.itemPrice, item.units)}}>-</button>
                      <input className="num_items" type="text" readOnly value={item.units} />
                      <button type="button" className="add_btn" onClick={() => {this.addOnClick(item.item_id, item.itemPrice)}}>+</button>
                    </div>
                  </li>)
                }))
                }
      				</ul>
      				<Link to="/checkout"><button className="checkout_btn">checkout</button></Link>
      			</div>
      		</div>
      	</div>
        </div>
      );
        }
      } else {
        return (null);
      }
    } else {
      if (this.props.addedItems.length) {
        return (
        <div className="cart_div_inner">
          <div className="cart_content_div">
            <ul>
              {(this.props.addedItems.map(item => {
                return (<li key={item.item_id}>
                  <img src={"assets/" +item.itemType+ "_symbol.png"} /><div className="cart_item_div"><span>{item.itemName}</span><div className="item_price_div">{item.total}</div></div>
                  <div className="add_minus_div">
                    <button type="button" className="minus_btn" onClick={() => {this.subtractOnClick(item.item_id, item.itemPrice, item.units)}}>-</button>
                    <input className="num_items" type="text" readOnly value={item.units} />
                    <button type="button" className="add_btn" onClick={() => {this.addOnClick(item.item_id, item.itemPrice)}}>+</button>
                  </div>
                </li>)
              }))
              }
            </ul>
            <Link to="/checkout"><button className="checkout_btn">checkout</button></Link>
          </div>
        </div>
        );
      } else {
        return (null);
      }
    }
  }

  render() {
    return (
      <div>{this.renderCart()}</div>
    );
  }

}

const mapStateToProps = (state) => {
  return { addedItems: state.addedItems }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCart: (cartItem)=>{dispatch(createCart(cartItem))},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartOverlay);
