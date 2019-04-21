import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Footer from './components/Footer/Footer';
import UserSession from './components/UserSession';
import TrackOrder from './components/TrackOrder';
import Account from './components/account';

class App extends Component {
  render() {
    return (
      <Router>
        <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
          <div style={{flex: '1 0 auto', backgroundColor: '#F1F3F6'}}>
          <Navbar />
           <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/track-order/:id" component={TrackOrder} />
            <Route path="/account" component={Account} />
            <Route path="/usersession" component={UserSession} />
           </Switch>
           </div>
          <Footer />
         </div>
      </Router>
    );
  }
}

export default App;
