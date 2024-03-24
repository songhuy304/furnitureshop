import React from 'react'
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <>
      <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <a
            href="/"
            className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <span className="fs-5 d-none d-sm-inline">Menu</span>
          </a>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li className="nav-item">
              <Link to="/Admin/home"  className="nav-link align-middle px-0">
                <i className="fs-4 bi-house"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Home</span>
              </Link>
            </li>
            <li>
            <Link to="/Admin/ListSanpham"  className="nav-link align-middle px-0">
                <i className="fs-4 bi-house"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Quản Lý Sản Phẩm</span>
              </Link>
             
            </li>
            <Link to="/Admin/category"  className="nav-link align-middle px-0">
                <i className="fs-4 bi-house"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Quản Lý Danh Mục</span>
              </Link>
            <li>
            <Link to="/Admin/order"  className="nav-link align-middle px-0">
                <i className="fs-4 bi-house"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Quản Lý Đơn Hàng</span>
              </Link>
             
            </li>
            
            
          </ul>

          
        </div>
      </div>
    </>
  );
}

export default Sidebar