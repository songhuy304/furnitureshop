import React from 'react'

import { FaShuttleVan ,FaMoneyBillAlt , FaRegClock ,FaReply    } from "react-icons/fa";
import './Benefit.css'
function Benefit() {
  return (
    
        <div className="benefit">
		<div className="containsssser">
			<div className="row benefit_row">
				<div className="col-lg-3 benefit_col">
					<div className="benefit_item d-flex flex-row align-items-center">
						<div className="benefit_icon">
                        <FaShuttleVan color=""></FaShuttleVan>
                            
                            </div>
						<div className="benefit_content">
							<h6>free shipping</h6>
							<p>Suffered Alteration in Some Form</p>
						</div>
					</div>
				</div>
				<div className="col-lg-3 benefit_col">
					<div className="benefit_item d-flex flex-row align-items-center">
						<div className="benefit_icon"><FaMoneyBillAlt/></div>
						<div className="benefit_content">
							<h6>cach on delivery</h6>
							<p>The Internet Tend To Repeat</p>
						</div>
					</div>
				</div>
				<div className="col-lg-3 benefit_col">
					<div className="benefit_item d-flex flex-row align-items-center">
						<div className="benefit_icon"><FaReply /></div>
						<div className="benefit_content">
							<h6>45 days return</h6>
                             
							<p>Making it Look Like Readable</p>
						</div>
					</div>
				</div>
				<div className="col-lg-3 benefit_col">
					<div className="benefit_item d-flex flex-row align-items-center">
						<div className="benefit_icon"><FaRegClock/></div>
						<div className="benefit_content">
							<h6>opening all week</h6>
							<p>8AM - 09PM</p>
						</div>
					</div>
				</div>
			</div>
		
		
		</div>

		<div className="benefit-title">
        <div className="benefit-titleproduct">Latest Blogs</div>
        <h2>
          <span>LATEST BLOGS</span>
        </h2>
      </div>
	</div>


  
  )
}

export default Benefit