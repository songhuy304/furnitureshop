import React , {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import UserApi from '../../../api/sanphamApi';

import Modal from './Modal'; // Import Modal component from Modal.js
function ListSanpham() {
    const [showModal, setShowModal] = useState(false);
    const [sanphamlist, Setsanphamlist] = useState([]);

    useEffect(() => {
     
      fetchData();
    }, []); 

    const fetchData = async () => {
      try {
        const order = await sanphamApi.getAll();
        Setsanphamlist(order.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  }

    const handleDelete = async (_id) => {
      try {
       await sanphamApi.remove(_id);
        alert(`Xóa Sản Phẩm Thành Công với ID: ${_id}`);
        fetchData();
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error  ');
      }
    };


    const openModal = () => {
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
  
    return (
      <div className="px-5">
        <h1 className="text-center"> Quản Lý Sản Phẩm</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Ảnh</th>
              <th scope="col">Tên</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
            </tr>
          </thead>
          <tbody>
          {sanphamlist.map((invoice, index) => (
            <tr key={invoice._id}>
              <th scope="row">{index + 1}</th>
              <td className="" style={{width:"7%"}}>
                <img src={invoice.linkImg} className="img-fluid img-thumbnail" alt="Sheep"></img>
                </td>
              <td>{invoice.title}</td>
              <td>{invoice.price}</td>
              <td>{invoice.category.name}</td>
              <td><button type="button" onClick={() => handleDelete(invoice._id)} className="btn btn-danger">Xóa</button></td>
            </tr>
          ))}
         
          </tbody>
        </table>
        <Button variant="primary" onClick={openModal}>
          Thêm Sản Phẩm
        </Button>
        <Modal showModal={showModal} closeModal={closeModal} />{" "}
        {/* Render Modal component */}
      </div>
    );
  }
  

export default ListSanpham