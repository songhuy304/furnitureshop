
import './App.css';
import {BrowserRouter as Router , Routes , Route  } from 'react-router-dom';
import Home from './page/home/Home';
import Following from './page/Following/Following';
import Profile from './page/Profile/Profile.js';
import Shop from './page/Shop/Shop';
import ProductDetail from './components/ProductDetail/ProductDetail.js';
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
// import auth
import Login from './auth/login.js';
import Register from './auth/register.js';
import PrivateRoute from './auth/PrivateRoute.js'

function App() {
  return (
    <div className="App">
      
          <CartProvider>
          <Router>
              


              <Routes>
                  {/* Các route User */}
                <Route path="/" element={<Layout> <Home /> </Layout>} />
                <Route path="/Product" element={<Layout> <Following /> </Layout>} />
                <Route path="/Profile" element={<Layout> <Profile /> </Layout>} />
                <Route path="/cart" element={<Layout> <Cart /> </Layout>} />
                <Route path="/shop" element={<Layout> <Shop /> </Layout>} />
                <Route path="/product/:productId" element={<Layout> <ProductDetail /> </Layout>} />
                <Route path="/Login" element={<Login /> } />
                <Route path="/Register" element={<Register /> } />
                <Route path="*" element={<p>There's nothing here: 404!</p>} />
            
                  {/* Các route cho admin */}
              
                  <Route path='/Admin' element={<PrivateRoute/>}>
                    <Route path='listSanpham' element={<DefaultLayout> <ListSanpham /> </DefaultLayout>}/>
                    <Route path="home" element={<DefaultLayout> <AdminHome /> </DefaultLayout>} />
                    <Route path="sanpham" element={<DefaultLayout><Sanpham /></DefaultLayout>} />
                    <Route path="category" element={<DefaultLayout> <Category /> </DefaultLayout>} />
                    <Route path="order" element={<DefaultLayout> <Order /> </DefaultLayout>} />
                  </Route>
                  {/* // router yêu cầu login */}
            </Routes>
          </Router>
          </CartProvider>
      
    </div>
  );
}

export default App;
