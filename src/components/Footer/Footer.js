import React from 'react'
import './Footer.css'
import { FaFacebook ,FaInstagram ,FaSkype ,FaGithub ,FaTwitter  } from "react-icons/fa";


function Footer() {
  return (
    <footer className="footer">
		<div className="container">
			<div className="row">
				<div className="col-lg-6">
					<div className="footer_nav_container d-flex flex-sm-row flex-column align-items-center justify-content-lg-start justify-content-center text-center">
						<ul className="footer_nav">
							<li><a href="/">Blog</a></li>
							<li><a href="/">FAQs</a></li>
							<li><a href="/">Contact us</a></li>
						</ul>
					</div>
				</div>
				<div className="col-lg-6">
					<div className="footer_social d-flex flex-row align-items-center justify-content-lg-end justify-content-center">
						<ul>
							<li><a href="/"><FaFacebook/></a></li>
							<li><a href="/"><FaInstagram/></a></li>
							<li><a href="/"><FaSkype/></a></li>
							<li><a href="/"><FaGithub/></a></li>
							<li><a href="/"><FaTwitter/></a></li>
						</ul>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-12">
					<div className="footer_nav_container">
						<div className="cr">©2024 All Rights Reserverd. Made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="/">HuyCuong</a> </div>
					</div>
				</div>
			</div>
		</div>

    </footer>
  )
}

export default Footer