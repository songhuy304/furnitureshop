import React, { useState  , useEffect } from 'react'
import  './Header.css'
import { FaAngleDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import  {links}  from '../../../../router/router.js';
// import { CartContext } from '../../../../Context/CartContext';
import { FaShoppingCart  , FaUser ,FaBars ,FaRegUserCircle ,FaRegEdit ,FaRegCommentAlt } from "react-icons/fa";
import { GoSignIn } from "react-icons/go";
import { CiSettings } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { useCart } from "react-use-cart";
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
      <div className={headermenu ? "menu-header-open" : "menu-header"}>
        {links.map((link, index) => (
          <li key={index}>
            {link.link ? (
              <Link to={link.path}>{link.name}</Link>
            ) : (
              <div
                className="navbar-link"
                onClick={() => handleSubcategoryClick(link)}
              >
                {link.name} <FaAngleDown />
              </div>
            )}
            {activeSubcategory === link.name && link.link === false && (
              <ul className="mobie-subcategories">
                {link.sub.map((subcategory, subIndex) => (
                  <li key={subIndex}>{subcategory.title}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
        <div className="linkscart">
          <li>
            <Link to="/">
              {" "}
              <FaShoppingCart />
            </Link>
          </li>
          <li>
            <Link to="/Following">
              {" "}
              <FaUser />
              
            </Link>
          </li>
        </div>
      </div>
    </header>
  );
}
function MenuUser(){
  return (
    <>
      <h3>Huy Cường</h3>
      <ul>
        <li>
          <FaRegUserCircle />
          <a href="/">My profile</a>
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
          <GoSignIn />

          <a href="/" style={{ color: "red" }}>
            Logout
          </a>
        </li>
      </ul>
    </>
  );
}
export default Header