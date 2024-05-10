import React, {useState , useEffect }from 'react'
import {useParams} from "react-router-dom"
import sanphamApi from '../../api/sanphamApi';
import Footer from '../Footer/Footer';
import { useCart } from "react-use-cart";

function ProductDetail() {

    const { addItem } = useCart();

    const { productId } = useParams(); // Trích xuất `productId` từ URL
    const [quantity, setQuantity] = useState(1);
    const [sofaList, setSofaList] = useState([]);

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value); // Chuyển đổi giá trị thành số nguyên
        setQuantity(newQuantity); // Cập nhật state quantity với giá trị mới
    };

    const handleAddToCart = () => {
        // Kiểm tra xem sofaList có tồn tại không
        if (sofaList) {
            // Tạo một mục sản phẩm để thêm vào giỏ hàng
            const item = {
                id: sofaList._id, // Sử dụng _id hoặc thuộc tính khác nếu cần thiết
                ...sofaList, // Copy tất cả các thuộc tính của sản phẩm
                quantity: 1 // Thiết lập số lượng mặc định là 1
            };
    
            // Thêm mục sản phẩm vào giỏ hàng
            addItem(item);
    
            // Hiển thị thông báo thành công
            alert("Thêm sản phẩm thành công");
        } else {
            // Xử lý nếu không tìm thấy sản phẩm trong sofaList
            alert("Không tìm thấy sản phẩm");
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    }

    const handleDiminish = () => {
        setQuantity(quantity - 1);
    }


    useEffect(() => {
        async function fetchData() {
            try {
                const products = await sanphamApi.getById(productId);
                setSofaList(products.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }
        fetchData();

    }, [productId]); // Đặt `productId` vào mảng dependencies
  return (
    <>
      <section className="relative mt-5 py-5">
        <div className="container">
          <div className="row gx-5">
            <aside className="col-lg-6">
              <div className="border rounded-4 mb-3 d-flex justify-content-center">
              
                  <img style={{maxWidth:'100%', maxHeight:'100vh', margin:'auto'}} className="rounded-4 fit" alt='' src={sofaList.linkImg} />
            
              </div>
            </aside>
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <h4 className="title text-dark">
                 {sofaList.title}
                </h4>
                <div className="d-flex flex-row my-3">
                  <span className="text-muted">
                    <i className="fas fa-shopping-basket fa-sm mx-1"></i>154 orders
                  </span>
                  <span className="text-success ms-2">In stock</span>
                </div>

                <div className="mb-3">
                  <span className="h5">${sofaList.price}</span>
                  <span className="text-muted">/per box</span>
                </div>

                <p>
                  Modern look and quality demo item is a streetwear-inspired
                  collection that continues to break away from the conventions
                  of mainstream fashion. Made in Italy, these black and brown
                  clothing low-top shirts for men.
                </p>

                <div className="row">
                  <dt className="col-3">Type:</dt>
                  <dd className="col-9">Regular</dd>

                  <dt className="col-3">Color</dt>
                  <dd className="col-9">Brown</dd>

                  <dt className="col-3">Material</dt>
                  <dd className="col-9">Cotton, Jeans</dd>

                  <dt className="col-3">Brand</dt>
                  <dd className="col-9">Reebook</dd>
                </div>

                <hr />

                <div className="row mb-4">
                  <div className="col-md-4 col-6">
                    <label className="mb-2">Size</label>
                    <select
                      className="form-select border border-secondary"
                      style={{ height: "35px" }}
                    >
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                    </select>
                  </div>
                  <div className="col-md-4 col-6 mb-3">
                    <label className="mb-2 d-block">Quantity</label>
                    <div className="input-group mb-3" style={{ width: "170px" }}>
                      <button
                        className="btn btn-white border border-secondary px-3"
                        type="button"
                        id="button-addon1"
                        data-mdb-ripple-color="dark"
                        onClick={handleDiminish}
                      >
                        <i className="fas fa-minus">-</i>
                      </button>
                      <input
                        type="number"
                        className="form-control text-center border border-secondary"
                        value={quantity}
                        onChange={handleQuantityChange} 
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                        min="0"
                      />
                      <button
                        className="btn btn-white border border-secondary px-3"
                        type="button"
                        id="button-addon2"
                        data-mdb-ripple-color="dark"
                        onClick={handleIncrease}
                      >
                        <i className="fas fa-plus">+</i>
                      </button>
                    </div>
                  </div>
                </div>
                <button href="#" className="btn btn-warning shadow-0">
                  Add to favorites
                </button>
                <button href="#" onClick={handleAddToCart} className=" m-2 btn btn-primary shadow-0">
                  <i className="me-1 fa fa-shopping-basket"></i> Add to cart
                </button>
              
              </div>
            </main>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ProductDetail   