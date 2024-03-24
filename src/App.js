
import './App.css';
import {BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Home from './page/home/Home';
import Following from './page/Following/Following';
import Shop from './page/Shop/Shop';
// import Admin from './page/Admin/admin.js';
import Cart from './page/ShoppingCart/ShoppingCart.js';
import Layout from './components/Layout/DefaultLayout/Layout.js';
import AdminHome from './page/Admin/components/AdminHome.js';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// import { CartProvider } from './Context/CartContext';
import { CartProvider } from "react-use-cart";
import 'bootstrap/dist/css/bootstrap.min.css';
// Admin 
import DefaultLayout from './page/Admin/layout/DefaultLayout.js';
import Sanpham from './page/Admin/components/Sanpham.js';
import Category from './page/Admin/components/Category.js';
import Order from './page/Admin/components/Order.js';
import ListSanpham from './page/Admin/components/ListSanpham.js';

function App() {
  return (
    <div className="App">
      
        <CartProvider>
        <Router>
          
            <Routes>
              {/* Các route sẽ được hiển thị trong Layout */}
            <Route path="/" element={<Layout> <Home /> </Layout>} />
            <Route path="/Product" element={<Layout> <Following /> </Layout>} />
            <Route path="/cart" element={<Layout> <Cart /> </Layout>} />
            <Route path="/shop" element={<Layout> <Shop /> </Layout>} />
            {/* <Route path="/admin" element={<Admin /> } /> */}
           {/* Các route cho admin */}
           <Route path="/admin/home" element={<DefaultLayout> <AdminHome /> </DefaultLayout>} />
           <Route path="/admin/sanpham" element={<DefaultLayout> <Sanpham /> </DefaultLayout>} />
           <Route path="/admin/category" element={<DefaultLayout> <Category /> </DefaultLayout>} />
           <Route path="/admin/order" element={<DefaultLayout> <Order /> </DefaultLayout>} />
           <Route path="/admin/ListSanpham" element={<DefaultLayout> <ListSanpham /> </DefaultLayout>} />
          
            </Routes>
        
          </Router>
        </CartProvider>
      
    </div>
  );
}

export default App;
