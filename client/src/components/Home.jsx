import React, { Component } from 'react';
import LoginOverlay from './LoginOverlay/LoginOverlay';
import Slider from './Slider/Slider';
import MenuWrapper from './MenuWrapper/MenuWrapper';
import ItemContent from './ItemContent/ItemContent';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

class Home extends Component {
  componentWillMount() {
    nprogress.start()
  }

  componentDidMount() {
    nprogress.done()
  }

  render() {
    return (
      <div style={{backgroundColor: 'white'}}>
        <LoginOverlay />
        <Slider />
        <MenuWrapper />
        <ItemContent />
      </div>
    );
  }

}

export default Home;
