const express = require('express');
const userAccountRoute = express.Router();
const User = require('../models/user.js');
const jwt = require("jsonwebtoken");
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('268587AJ996CP15c929f79', 'Your OTP for Frenzys registration is {{otp}}. Please do not share it with anybody');

userAccountRoute.get('/getdetails', (req,res,next) => {
  let token = req.user;

  User.findOne({
    _id: token
  },(err,user) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Server error'
      });
    } else {
      return res.send({
        success:true,
        userdetails: {phno: user.phno,email: user.email}
      });
    }
  })
})

//verify signUp
userAccountRoute.post('/verify-signup', (req,res,next) => {
  let number = req.body.number;
  let password = req.body.password;
  let email = req.body.email;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let phno = '';

  if (!number) {
    return res.send({
      success: false,
      message: 'Number cannot be blank.'
    });
  }

  if (!password) {
    return res.send({
      success: false,
      message: 'Password cannot be blank.'
    });
  }

  if (!email) {
    return res.send({
      success: false,
      message: 'Email cannot be blank.'
    });
  }

  if (!firstname) {
    return res.send({
      success: false,
      message: 'Firstname cannot be blank.'
    });
  }

  if (!lastname) {
    return res.send({
      success: false,
      message: 'Lastname cannot be blank.'
    });
  }

  email = email.toLowerCase();
  email = email.trim();

  // Steps:
    // 1. Verify number doesn't exist
    // 2. Save

  User.findOne({
    phno: number
  }, (err, previousUsers) => {
    if (err) {
      return res.send({
          success: false,
          message: 'Server error'
      });
    } else if(previousUsers) {
      return res.send({
        success: false,
        message: 'Number already exists!'
      });
    } else {
      User.findOne({
        email: email
      }, (err, previousUser) => {
        if (err) {
          return res.send({
              success: false,
              message: 'Server error'
          });
        } else if(previousUser) {
          return res.send({
            success: false,
            message: 'Email already exists!'
          });
        } else {
          phno = "91" + number;
          sendOtp.send(phno, "FRENZY", function (error, data) {
            if (err) {
              console.log(err);
            }
          });
          return res.send({
            success: true,
            message: 'success'
          });
        }
      });
    }
  });

})

//signup

userAccountRoute.post('/signup', (req, res, next) => {
  let number = req.body.number;
  let password = req.body.password;
  let email = req.body.email;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let otp = req.body.otp;
  let phno = '';

  email = email.toLowerCase();
  email = email.trim();

  if (!otp) {
    return res.send({
      success: false,
      message: 'Please Enter your 4 digit OTP'
    });
  }

  phno = "91" + number;
  sendOtp.verify(phno, otp, function (error, data) {
    if(data.type == 'error') {
      return res.send({
        success: false,
        message: 'Please Enter correct OTP'
      });
    } else {
      //save new user
      const newUser = new User();
      newUser.phno = number;
      newUser.password = newUser.generateHash(password);
      newUser.email = email;
      newUser.firstname = firstname;
      newUser.lastname = lastname;
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Server error'
          });
        } else {
          return res.send({
            success: true,
            message: 'Signed up. Login now'
          });
        }
      });
    }
  });
});

userAccountRoute.post('/resend-otp', (req, res, next) => {
  let number = req.body.number;
  let phno = '';

  phno = "91" + number;
  sendOtp.retry(phno, false, function (error, data) {
    res.send({
      success: true,
      message: 'OTP Sent'
    });
  });
})

//Signin

userAccountRoute.post('/signin', (req, res, next) => {
    let phno = req.body.phno;
    let password = req.body.password;

    if (!phno) {
      return res.send({
        success: false,
        message: 'Mobile No cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Password cannot be blank.'
      });
    }

    User.findOne({
      phno: phno
    }, (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Server error'
        });
      }
      if (!users) {
        return res.send({
          success: false,
          message: 'Invalid Mobile No'
        });
      }

      if (!users.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Invalid Password'
        });
      }

      const payload = {
        id: users._id,
        name: users.firstname,
        email: users.email,
        number: users.phno
      };

      jwt.sign(
        payload,
        'secret123',
        {
          expiresIn: 31556926
        },
        (err, token) => {
          res.json({
            success: true,
            token: token
          });
        }
      );
    });
  });

//isLoggedin

userAccountRoute.get('/isloggedin', (req, res, next) => {
  if (req.user)
    return res.send({isloggedin: true});
  else
    return res.send({isloggedin: false});
});

//edit phno

userAccountRoute.post('/editphno', (req, res) => {
  let phno = req.body.phno;
  if (!phno) {
    return res.send({
      success: false,
      message: 'Phone Number Cannot be empty'
    })
  }
  User.findOne(
    {phno: phno},
    (err, result) => {
      if (err) {
        res.send({
          success: false,
          message: 'server error'
        })
      } else if (result) {
          res.send({
            success: false,
            message: 'Number already exists!'
          }) 
        } else {
            User.findOneAndUpdate(
              {_id: req.user},
              {$set:{phno: phno}},
              {new: true},
              (err, doc) => {
                if (err) {
                  res.send({
                    success: false,
                    message: 'server error'
                  })
                } else {
                  res.send({
                    success: true,
                    phno: doc.phno,
                    message: 'Successfully Changed Phone Number'
                  })
                }
              }
            )
          }
  })
});

userAccountRoute.post('/editmail', (req, res) => {
  let email = req.body.email;
  if (!email) {
    return res.send({
      success: false,
      message: 'Email Cannot be empty'
    })
  }
  User.findOne(
    {email: email},
    (err, result) => {
      if (err) {
        res.send({
          success: false,
          message: 'server error'
        })
      } else if (result) {
          res.send({
            success: false,
            message: 'Email already exists!'
          }) 
        } else {
            User.findOneAndUpdate(
              {_id: req.user},
              {$set:{email: email}},
              {new: true},
              (err, doc) => {
                if (err) {
                  res.send({
                    success: false,
                    message: 'server error'
                  })
                } else {
                  res.send({
                    success: true,
                    email: doc.email,
                    message: 'Successfully Changed Email'
                  })
                }
              }
            )
          }
  })
});

userAccountRoute.post('/editpass', (req, res) => {
  let pass = req.body.pass;
  if (!pass) {
    return res.send({
      success: false,
      message: 'Password Cannot be empty'
    })
  }
  User.findOne(
    {pass: pass},
    (err, result) => {
      if (err) {
        res.send({
          success: false,
          message: 'server error'
        })
      } else {
          User.findOneAndUpdate(
            {_id: req.user},
            {$set:{pass: pass}},
            {new: true},
            (err, doc) => {
              if (err) {
                res.send({
                  success: false,
                  message: 'server error'
                })
              } else {
                res.send({
                  success: true,
                  message: 'Successfully Changed Password'
                })
              }
            }
          )
        }
  })
});

module.exports = userAccountRoute;
