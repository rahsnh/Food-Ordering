import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme =>({
  Header: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: '#282c3f',
    marginBottom: 20
  },
  listItem: {
    position: 'relative',
    padding: '5px 10px',
    width: '100%',
    border: '1px solid #d4d5d9',
    textTransform: 'capitalize',
    marginBottom: 20,
    marginRight: 20
  },
  nickname: {
    fontWeight: 500,
    textTransform: 'capitalize',
    fontSize: 16
  },
  addressText: {
    marginTop: 5,
    fontSize: 16,
    lineHeight: 2
  },
  areaText: {
    fontSize: 16,
    lineHeight: 1.5
  },
  editbtn: {
    textTransform: 'capitalize',
    margin: '10px 0px',
    fontSize: '0.9em',
    letterSpacing: 0.8,
    backgroundColor: '#FB641B',
    color: 'white',
    '&:hover': {
      backgroundColor: '#FB641B',
      color: 'white'
    }
  },
  modal: {
    width: '100%',
    height: '100%',
    backgroundColor: 'yellow',
    position: 'fixed'
  }
});

class AddressComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: []
    }
  }

  componentDidMount() {
    axios.post('/api/address/fetchaddress')
      .then(response => {
        this.setState({address: response.data.address});
      });
  }

  render() {
    const { classes } = this.props;
    const { address } = this.state;
    
    return (
      <div>
        <div className={classes.Header}>Addresses</div>
        <Grid container spacing={12}>
          {address.length ? 
            address.map(item => (
              <Grid item lg={5} xs={12} key={item.nickname} className={classes.listItem}>
                <div className={classes.nickname}>{item.nickname}</div>
                <div className={classes.addressText}>{item.houseno}</div>
                <div className={classes.areaText}>{item.deliveryarea}</div>
                <div><Button className={classes.editbtn} onClick={() => this.props.change(true)}>edit address</Button></div>
              </Grid>
            )): null
          }
        </Grid>
      </div>
    );
  }

}

AddressComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddressComponent);
