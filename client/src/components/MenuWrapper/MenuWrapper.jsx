import React, { Component } from 'react';
import './MenuWrapper.css';

class MenuWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    fetch('/api/menucategories')
      .then(response => response.json())
      .then((results) => {
        this.setState({categories: results});
      });
  }

  render() {
    const { categories } = this.state;
    return (
      <div className="menu_wrapper">
		    <div className="container">
			     <div className="col-xs-6 option_menu">
				       <span>
					          <select data-role="none" className="drop_down_design">
                      <option value="volvo">select menu</option>
                      {categories.map(item => (
                        <option key={item.category} value={item.category}>{item.category}</option>
                      ))}
          					</select>
        				</span>
      			</div>
    			  <div className="col-xs-6 filter_icon_div">
				        <button href="#" className="filter_icon"><span><span style={{color: '#3A126C', fontSize: '1.2em', fontWeight: 400, letterSpacing: '0.1em', paddingRight: '5px'}}>Filter</span><img src="https://res.cloudinary.com/frenzys/image/upload/v1551213659/assets/filter_icon.png" /></span></button>
			      </div>
		     </div>
	   </div>
    );
  }

}

export default MenuWrapper;
