
import React from 'react';
import { Navigate, Outlet , useLocation } from 'react-router-dom';
import {jwtDecode } from 'jwt-decode'; // Thư viện để giải mã token JWT

// Hàm kiểm tra xem người dùng đã đăng nhập chưa
const isAuthenticated = () => {
  const token = localStorage.getItem('login');
  if(token) {
    try {
      const decodedToken = jwtDecode(token);
      // Kiểm tra tính hợp lệ của token, ví dụ kiểm tra thời gian hết hạn
      const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây
      if (decodedToken.exp > currentTime) {
        if (decodedToken.role && decodedToken.role.includes("ADMIN")) {
          return true;
        }
      } else {
        localStorage.removeItem("login"); // Xóa token hết hạn
      }
    } catch (error) {
      console.error("Lỗi giải mã token:", error);
    }
  }
  return false; // Giả sử không đăng nhập
}

// Component PrivateRoute
const PrivateRoute = () => {

  const location = useLocation();

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login"  state={{ from: location }}/>;
};

export default PrivateRoute;
