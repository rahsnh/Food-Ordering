import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {

  render() {
    return (
      <div className="footer">
		<div className="container">
			<div className="row">
				<div className="col-md-4">
					<div className="footer_head">Get to Know US</div>
					<div className="footer_links"><a href="#" className="text_design">About Us</a></div>
					<div className="footer_links"><a href="#" className="text_design">Careers</a></div>
					<div className="footer_links"><a href="#" className="text_design">Terms</a></div>
					<div className="footer_links"><a href="#" className="text_design">Privacy Policy</a></div>
				</div>
				<div className="col-md-4">
					<div className="footer_head">Connect</div>
					<div className="social">
						<span className="social_icons"><a href="#"><img src="https://res.cloudinary.com/frenzys/image/upload/v1551213657/assets/fb_ico.png" /></a></span>
						<span className="social_icons"><a href="#"><img src="https://res.cloudinary.com/frenzys/image/upload/v1551213657/assets/tweet_ico.png" /></a></span>
						<span className="social_icons"><a href="#"><img src="https://res.cloudinary.com/frenzys/image/upload/v1551213657/assets/insta_ico.png" /></a></span>
					</div>
				</div>
				<div className="col-md-4">
					<div className="footer_head">Help</div>
					<div className="contact"><img src="https://res.cloudinary.com/frenzys/image/upload/v1551213657/assets/phone_ico.png" /><span style={{paddingLeft: '10px', fontSize: '16px'}}>080-4042-4242</span></div>
					<div className="mail"><a href="mailto:"><img src="https://res.cloudinary.com/frenzys/image/upload/v1551213657/assets/mail_ico.png" /><span style={{paddingLeft: '10px', fontSize: '16px'}}>crm@unknown.com</span></a></div>
					<div className="playstore"><a href="#"><img src="https://res.cloudinary.com/frenzys/image/upload/v1551213657/assets/google-play-badge.png" /></a></div>
				</div>
			</div>
		</div>
    <div className="copyright_div">&copy; 2018 Unknown Food Services Pvt Ltd.</div>
	</div>
    );
  }

}

export default Footer;
