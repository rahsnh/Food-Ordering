import React, { Component } from 'react';
import './Slider.css';

class Slider extends Component {

  render() {
    return (
      <div className="slider-container">
		    <div className="slider-arrow slider-arrow-left">
    		  <span><i className="material-icons">keyboard_arrow_left</i></span>
  		  </div>
		    <div className="slider-slide-container">
      		{/* last slide must be first */}
      		<div className="slider-slide slider-slide4"></div>
      		<div className="slider-slide slider-slide1"></div>
      		<div className="slider-slide slider-slide2"></div>
      		<div className="slider-slide slider-slide3"></div>
    	  </div>
    	  <div className="slider-arrow slider-arrow-right">
    		  <span><i className="material-icons">keyboard_arrow_right</i></span>
  		  </div>
	    </div>
    );
  }

}

export default Slider;
