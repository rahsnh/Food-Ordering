import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navbar.css';
import LocationOverlay from '../LocationOverlay/LocationOverlay';
import FilterOverlay from '../FilterOverlay/FilterOverlay';
import CartOverlay from '../CartOverlay/CartOverlay';
import { Link } from 'react-router-dom';

import {
  getFromStorage,
} from '../../utils/storage';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      show: 'none',
      disp: 'flex'
    };

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              disp: 'none',
              show: 'block',
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

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              show: 'none',
              disp: 'flex',
              isLoading: false,
            });
            window.location.href = '/';
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

  render() {
    let toggleClass, {location} = this.props;
    var regex1 = new RegExp('/track-order/*','g');

    switch (true) {
      case location.pathname == '/': {
        toggleClass = ''
        break
      }
      case location.pathname == '/checkout': {
        toggleClass = 'hide'
        break
      }
      default: {
        toggleClass = 'hide'
        break
      }
    }
    return (
      <div className="wrapper" data-enhance="false" data-role="none">
      <LocationOverlay />
      {(toggleClass == '')? (<CartOverlay />):(null)}
      <FilterOverlay />
	     <div id="header_container">
		     <div className="header">
			      <a id="logo" href="#"><img src="https://res.cloudinary.com/frenzys/image/upload/v1551213657/assets/logo.png" /></a>
			      <a className="hamburger font_design"><i style={{color: 'white'}} className="material-icons small_icon">keyboard_arrow_down</i></a>
			      <button className={"font_design location " + toggleClass} style={{textDecorationLine: 'none'}}><i className="material-icons small_icon" style={{color: '#ffde03'}}>my_location</i><span className="toggle_deliver" style={{paddingLeft: '5px', color: '#ffde03'}}>Deliver to: </span><div id="curr_location" style={{paddingLeft: '5px', color: 'white'}}></div><i style={{paddingLeft: '5px', color: '#ffde03'}} className="material-icons small_icon">keyboard_arrow_down</i></button>
			      <a className={"font_design offers " + toggleClass}><i className="material-icons md-20" style={{color: '#ffde03'}}>local_offer</i><span style={{paddingLeft: '5px', color: '#ffde03'}}>Offers</span></a>
			      <div className = "right_header_nav">
				        <div id="search" className={"align_header_item " + toggleClass}>
					           <input id="search_bar" type="text" placeholder="Search for Products" />
					           <button className="search_btn" type="submit"><i className="material-icons md-20" style={{color: 'grey'}}>search</i></button>
				        </div>
                <button className="logged_in login_div font_design align_header_item" style={{display: this.state.show}}>LogOut</button>
                <button className="login_signup login_div font_design align_header_item" style={{display: this.state.disp}}><i className="material-icons md-20">person_outline</i></button>
				        <button className={"font_design search_div " + toggleClass}><i className="material-icons md-20">search</i></button>
				        <button className={"cart_div font_design align_header_item " + toggleClass}  href="#">
					           <i style={{color: 'white'}} className="material-icons md-20">shopping_cart</i>
                   {(this.props.addedItems.length)? (<span className="num_badge">{this.props.addedItems.length}</span>):(null)}
				        </button>
			     </div>
		     </div>
         <div id="account_hover">
          <div id="right_account_hover">
			      <div id="inner_hover">
              <ul>
                <Link to="/account"><li>profile</li></Link>
                <Link to="/account/orders"><li>orders</li></Link>
                <li onClick={this.logout}>logout</li>
              </ul>
            </div>
          </div>
		     </div>
		     <div id="big_searchbar">
			      <input id="big_search" type="text" placeholder="Search for Products" />
		     </div>
	    </div>
	   </div>
    );
  }

}

const mapStateToProps = (state) => {
  return { addedItems: state.addedItems }
}

const Navbar = withRouter(connect(mapStateToProps,null)(Nav));

export default (Navbar);
