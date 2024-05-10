import React from 'react'
import Header from './header/header';

import Sidebar from './Sidebar/Sidebar';
const DefaultLayout = ({children}) => {
  return (
    <>
      <div className="container-fluid">
      <Header/>
        <div className="row flex-nowrap">
          <Sidebar />

          <div className="col py-3 rounded-full ">{children}</div>
        </div>
      </div>
    </>
  );
}

export default DefaultLayout
