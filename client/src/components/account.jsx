import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import ProfileComponent from './Profile/ProfileComponent';
import OrdersComponent from './Orders/OrdersComponent';
import addressComponent from './Address/addressComponent';

const routes = [
  {
    path: "/account",
    exact: true,
    main: () => <h2>Profile</h2>
  },
  {
    path: "/account/orders",
    main: () => <h2>Orders</h2>
  },
  {
    path: "/account/shoelaces",
    main: () => <h2>Shoelaces</h2>
  }
];

const styles = {
  cardDesign1: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 20,
    paddingTop: 10,
    borderRadius: 0,
    padding: 0,
    backgroundColor: '#edf1f7',
  },
  cardDesign2: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 0,
    padding: 20
  },
  listHeader: {
    listStyleType: "none",
    padding: 0,
  },
  lists: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    color: 'dimgray',
    fontSize: 16,
    fontWeight: 500,
    '&:hover': {
      backgroundColor: 'white',
      color: '#282c3f'
    }
  },
  active: {
    backgroundColor: 'blue',
    display: 'block'
  }
}

class Account extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Router>
        <div>
          <Grid container justify="center" spacing={12}>
            <Grid item lg={2} xs={12}>
              <Card className={classes.cardDesign1}>
                <ul className={classes.listHeader}>
                  <Link to="/account" style={{ textDecoration: 'none' }}><li className={classes.lists}>Profile</li></Link>
                  <Link to="/account/orders" style={{ textDecoration: 'none' }}><li className={classes.lists}>Orders</li></Link>
                  <Link to="/account/addresses" style={{ textDecoration: 'none' }}><li className={classes.lists}>Addresses</li></Link>
                </ul>
              </Card>
            </Grid>
            <Grid item lg={7} xs={12}>
              <Card className={classes.cardDesign2}>
                  <Route exact path='/account' component={ProfileComponent} />
                  <Route exact path='/account/orders' component={OrdersComponent} />
                  <Route exact path='/account/addresses' component={addressComponent} />
              </Card>
            </Grid>
          </Grid>
        </div>
      </Router>
    );
  }

}

Account.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Account);
