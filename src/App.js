
import './App.css';
import {BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Home from './page/home/Home';
import Following from './page/Following/Following';
import Shop from './page/Shop/Shop';
import Cart from './page/ShoppingCart/ShoppingCart.js';
import Layout from './components/Layout/DefaultLayout/Layout.js';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// import { CartProvider } from './Context/CartContext';
import { CartProvider } from "react-use-cart";


import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      
        <CartProvider>
        <Router>
          <Layout>
            <Routes>
              {/* Các route sẽ được hiển thị trong Layout */}
              <Route path="/" element={<Home />} />
              <Route path="/Product" element={<Following />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shop" element={<Shop />} />
            </Routes>
          </Layout>
          </Router>
        </CartProvider>
      
    </div>
  );
}

export default App;
