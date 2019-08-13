import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCart } from '../actions/allActions';
import './ItemContent.css';

class ItemContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      items: []
    };
  }

  componentWillMount() {
    fetch('/api/menucategories')
      .then(response => response.json())
      .then((results) => {
        this.setState({categories: results});
      });
    fetch('/api/menuitems')
      .then(response => response.json())
      .then((results) => {
        this.setState({items: results});
      });
  }

  handleClick(item_id, itemName, itemPrice, itemType) {
    const cartItem = {
      item_id: item_id,
      itemName: itemName,
      itemPrice: itemPrice,
      itemType: itemType,
      value: "addNewToCart",
    }
    this.props.createCart(cartItem);
  }

  itemList(category) {
    const items = this.state.items;
    const categoryItems = items.filter(item => item.category==category);
    return categoryItems;
  }

  render() {
    const { categories } = this.state;
    return (
      <div className="container content_wrapper">
        <div>
          {categories.map(item => (
            <div key={item.category}>
              <br /><br />
              <div className="row menu_type">
                <div className="col-md-12">
                    <span className="menu_header">{item.category}</span>
                    <div className="hr"></div>
                </div>
              </div>
              <br />
              <div className="row">
                {this.itemList(item.category).map(menuitem => (
                  <div key={menuitem._id}>
                  <div className="col-md-4 menu_item">
     				         <div className="classWithPad item-1" style={{backgroundImage: 'url(https://res.cloudinary.com/frenzys/image/upload/v1551213657/assets/item-1.jpg)'}}></div>
     				         <div className="item_description">
     					            <div className="item_name"><span>{menuitem.itemName}</span></div>
     					            <div className="item_type"><img src={"https://res.cloudinary.com/frenzys/image/upload/v1551213657/assets/"+menuitem.itemType+"_symbol.png"} /></div>
     					            <div className="clear_float"></div>
     				         </div>
     				         <div className="item_price_add">
     					            <div className="item_price">Rs {menuitem.itemPrice}</div>
     					            <div className="item_cart_btn"><button className="cart_btn" type="button" onClick={() => {this.handleClick(menuitem._id,menuitem.itemName,menuitem.itemPrice,menuitem.itemType)}}>Add</button></div>
     					            <div className="clear_float"></div>
     				         </div>
     			        </div>
                  </div>
                ))}
    		      </div>
            </div>
          ))}
          </div>
        </div>
    );
  }

}

const mapDispatchToProps = (dispatch)=>{
  return {
    createCart: (cartItem)=>{dispatch(createCart(cartItem))}
  }
}

export default connect(null,mapDispatchToProps)(ItemContent);
