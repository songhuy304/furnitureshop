import React, { useState  , useEffect } from 'react'
import  './Header.css'
import { FaAngleDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import  {links}  from '../../../../router/router.js';
import {jwtDecode } from 'jwt-decode'; // Thư viện để giải mã token JWT
import { FaShoppingCart  , FaUser ,FaBars ,FaRegUserCircle ,FaRegEdit ,FaRegCommentAlt } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { useCart } from "react-use-cart";
import authApi from "../../../../api/authApi.js"

function Header() {
  const {
    totalUniqueItems,
  } = useCart();
  const [activeLink, setActiveLink] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  const [headermenu, setHeaderMenu] = useState(false);
  const [activeSubcategory, setActiveSubcategory] = useState(null);


  // const cartQuantity = context.cart.reduce((total, item) => total + item.quantity, 0);

  

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }
  const onOpenMenu = (value) => {
    setHeaderMenu(value);
  }
  const handleSubcategoryClick = (clickedLink) => {
    setActiveSubcategory(activeSubcategory === clickedLink.name ? null : clickedLink.name);
  };


 
  return (
    <header
      className={scrolled ? "header header-scrolled" : "header"}
      expand="md"
    >
      <div className="navbar">
        <div className="logo">
          <Link to="/" onClick={() => onUpdateActiveLink("Home")}>
            Figin.
          </Link>
        </div>
        <ul className="links">
          {links.map((link, index) => (
            <li key={index}>
              {link.link ? (
                <Link
                  to={link.path}
                  className={
                    activeLink === link.name
                      ? "active navbar-link"
                      : "navbar-link"
                  }
                  onClick={() => onUpdateActiveLink(link.name)}
                >
                  {link.name}
                </Link>
              ) : (
                <div
                  className="navbar-link"
                  onClick={() => handleSubcategoryClick(link)}
                >
                  {link.name} <FaAngleDown />
                </div>
              )}
              {activeSubcategory === link.name && link.link === false && (
                <ul className="subcategories">
                  {link.sub.map((subcategory, subIndex) => (
                    <li key={subIndex}>{subcategory.title}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className="linkscart">
          <Link to="/cart" className="" onClick={() => onUpdateActiveLink("")}>
            <FaShoppingCart />
            {totalUniqueItems > 0 && (
              <span id="checkout_items" className="checkout_items">
                {totalUniqueItems}
              </span>
            )}
          </Link>
          <div className="user_dropdown">
             <a href="/" className="">
            <FaUser />
          </a>
          <div className="menu_user">
          {MenuUser()}
              </div>
          </div>
         
      
          <div className="toggle_btn" onClick={() => onOpenMenu(!headermenu)}>
            <FaBars />
          </div>
        </div>
      </div>
      
    </header>
  );
}
function MenuUser(){

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('login');
    console.log(token);
    if (token) {
      // Nếu có token, giải mã token để kiểm tra tính hợp lệ và lấy thông tin người dùng
      try {
        const decodedToken = jwtDecode(token);

        // Kiểm tra tính hợp lệ của token, ví dụ kiểm tra thời gian hết hạn
        const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây
        if (decodedToken.exp > currentTime) {
          setIsLoggedIn(true); // Đã đăng nhập thành công
          setUsername(decodedToken.username);
        } else {
          localStorage.removeItem('login'); // Xóa token hết hạn
        }
      } catch (error) {
        console.error('Lỗi giải mã token:', error);
      }
    }
  }, []); // useEffect sẽ chạy chỉ một lần sau khi component được render  


  const handleClick = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
    handleLogout(); // Gọi hàm xử lý đăng xuất
    // Nếu bạn muốn chuyển hướng sau khi đăng xuất, bạn có thể sử dụng đối tượng history
    // history.push('/'); // Chuyển hướng đến trang chính sau khi đăng xuất
  };


  const handleLogout = async () => {
    try {
      const response = await authApi.logout();
      // Kiểm tra nếu đăng xuất thành công, xóa cookie từ client
      if (response.data.success) {
        // Xóa cookie 'token'
        localStorage.removeItem('login');
        setUsername('');
       alert("đăng xuất Thành công");
       window.location.reload();
      
      } else {
        console.error('Đăng xuất không thành công');
      }
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  return (
    <>
      <h3>{username}</h3>
      <ul>
        {isLoggedIn ? (
          <>
            <li>
              <FaRegUserCircle />
              <a href="/Profile">My profile</a>
            </li>
            <li>
              <FaRegEdit />

              <a href="/">Edit profile</a>
            </li>
            <li>
              <FaRegCommentAlt />

              <a href="/">Inbox</a>
            </li>
            <li>
              <CiSettings />

              <a href="/">Setting</a>
            </li>
            <li>
              <IoIosHelpCircleOutline />

              <a href="/">Help</a>
            </li>
            <li>
              <a href="/" onClick={handleClick} style={{ color: "red" }}>
                Logout
              </a>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </>
  );
}
export default Header