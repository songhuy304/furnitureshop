import React , {useEffect, useState } from 'react'
import orderApi from '../../../api/order';
import {jwtDecode } from 'jwt-decode'; // Thư viện để giải mã token JWT
import Modal from './Modal'; // Import Modal component from Modal.js

function BlockOrder() {

  const [orderList, setOrderList] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false); 

  const handleGetOrder = (id) => {
    fetchItemByOrder(id);
    setShowModal(true);
  };
  useEffect(() => {
    fetchItemByOrder();
    fetchData();
  }, []); 



  async function fetchItemByOrder(id) {
    try {
      if(id){
            const products = await orderApi.getById(id);
            setOrderItem( products.data.data);
          } else {
            console.log("id không đúng");
          }
        
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fetchData() {
    try {
      const token = localStorage.getItem('login');
      if(token){
          const decodedToken = jwtDecode(token);

          // Kiểm tra tính hợp lệ của token, ví dụ kiểm tra thời gian hết hạn
          const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây
          if (decodedToken.exp > currentTime) {
            const iduser = decodedToken.id;
            const products = await orderApi.getOrderById(iduser);
            setOrderList( products.data.data);
          } else {
            localStorage.removeItem("login"); // Xóa token hết hạn
          }
        }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }



  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <h5 className="d-flex align-items-center mb-3">
                Chi Tiết Đơn Hàng
              </h5>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Date</th>
                    <th scope="col">total</th>
                    <th scope="col">status</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {orderList.map((_, index) => (
                    <tr key={_._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{_.customer_name}</td>
                      <td>{_.phone}</td>
                      <td>{_.invoice_date}</td>
                      <td>{_.total}</td>
                      <td>
                        <button className={_.status === 'Done...' ? 'btn btn-success' : 'btn btn-danger'}>{_.status}</button>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleGetOrder(_._id)}
                          className="btn btn-primary"
                        >
                          Xem
                        </button>
                      </td>
                    </tr>
                  ))}
                  <Modal showModal={showModal} orderItem={orderItem} closeModal={closeModal} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlockOrder