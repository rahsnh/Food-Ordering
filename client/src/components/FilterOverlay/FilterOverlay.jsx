import React, { Component } from 'react';
import './FilterOverlay.css';

class FilterOverlay extends Component {

  render() {
    return (
      <div id="filter_overlay" className="filter_menu_div">
		<form className="filter_content" action="">
			<div className="filter_container">
				<div id="sort-header">Sort By</div>
				<button id="relevance-btn" className="sort-btn">Relevance</button>
				<button id="lowest-btn" className="sort-btn">Lowest</button>
				<button id="highest" className="sort-btn">Highest</button>
				<button id="rating" className="sort-btn">Rating</button>
				<div className="filter_header">Food Preference</div>
   				<ul className="cuisine_list">
   					<li><label className="cuisine">One<input data-role="none" className="input_check" type="checkbox" /><span className="checkmark"></span></label></li>
   					<li><label className="cuisine">Two<input data-role="none" className="input_check" type="checkbox" /><span className="checkmark"></span></label></li>
   					<li><label className="cuisine">Three<input data-role="none" className="input_check" type="checkbox" /><span className="checkmark"></span></label></li>
   					<li><label className="cuisine">Four<input data-role="none" className="input_check" type="checkbox" /><span className="checkmark"></span></label></li>
   					<li><label className="cuisine">Five<input data-role="none" className="input_check" type="checkbox" /><span className="checkmark"></span></label></li>
   					<li><label className="cuisine">Six<input data-role="none" className="input_check" type="checkbox" /><span className="checkmark"></span></label></li>
   					<li><label className="cuisine">Seven<input data-role="none" className="input_check" type="checkbox" /><span className="checkmark"></span></label></li>
   					<li><label className="cuisine">Eight<input data-role="none" className="input_check" type="checkbox" /><span className="checkmark"></span></label></li>
   					<li><label className="cuisine">Nine<input data-role="none" className="input_check" type="checkbox" /><span className="checkmark"></span></label></li>
   					<li><label className="cuisine">Ten<input data-role="none" className="input_check" type="checkbox" /><span className="checkmark"></span></label></li>
   					<li><label className="cuisine">Eleven<input data-role="none" className="input_check" type="checkbox" /><span className="checkmark"></span></label></li>
   					<li><label className="cuisine">Eleven<input data-role="none" className="input_check" type="checkbox" /><span className="checkmark"></span></label></li>
   					<li><label className="cuisine">Eleven<input data-role="none" className="input_check" type="checkbox" /><span className="checkmark"></span></label></li>
   					<li><label className="cuisine">Eleven<input data-role="none" className="input_check" type="checkbox" /><span className="checkmark"></span></label></li>
   					<li><label className="cuisine">Eleven<input data-role="none" className="input_check" type="checkbox" /><span className="checkmark"></span></label></li>
   					<li><label className="cuisine">Eleven<input data-role="none" className="input_check" type="checkbox" /><span className="checkmark"></span></label></li>
   					<li><label className="cuisine">Eleven<input data-role="none" className="input_check" type="checkbox" /><span className="checkmark"></span></label></li>
   					<li><label className="cuisine">Eleven<input data-role="none" className="input_check" type="checkbox" /><span className="checkmark"></span></label></li>
   					<li><label className="cuisine">Eleven<input data-role="none" className="input_check" type="checkbox" /><span className="checkmark"></span></label></li>
   					<li><label className="cuisine">Eleven<input data-role="none" className="input_check" type="checkbox" /><span className="checkmark"></span></label></li>
   					<li><label className="cuisine">Eleven<input data-role="none" className="input_check" type="checkbox" /><span className="checkmark"></span></label></li>
   				</ul>
    			<div className="clear_float"></div>
      			<button id="cancel-btn" className="filter-btn">cancel</button>
      			<button id="apply-btn" className="filter-btn">Apply</button>
			</div>
		</form>
	</div>
    );
  }

}

export default FilterOverlay;
