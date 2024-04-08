import React from 'react'

import Sidebar from '../components/Sidebar';
const DefaultLayout = ({children}) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <Sidebar />
          <div className="col py-3">{children}</div>
        </div>
      </div>
    </>
  );
}

export default DefaultLayout
