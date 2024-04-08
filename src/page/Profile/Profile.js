import React from 'react'
import BlockDetail from './Block/BlockDetail';
import BlockOrder from './Block/BlockOrder';
function Profile() {
  return (
    <div>
      <div className="container mt-5 py-5 ">
        <div className="main-body">
          <div className="row">
            <div className="col-lg-4">
              {/* ProductDetail */}
                <BlockDetail />


            </div>
            <div className="col-lg-8">
                <BlockOrder />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile