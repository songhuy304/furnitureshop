import React , {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import sanphamApi from '../../../api/sanphamApi';
import categoriApi from '../../../api/categoryApi';
import ModalBootstrap from 'react-bootstrap/Modal';

import Modal from './Modal'; // Import Modal component from Modal.js
import categoryApi from '../../../api/categoryApi';
function ListSanpham() {
    const [showModal, setShowModal] = useState(false);

    const [editingId, setEditingId] = useState(null); // State để lưu trữ ID của invoice đang được chỉnh sửa
  const [isModalOpen, setIsModalOpen] = useState(false); // State để kiểm soát trạng thái hiển thị của modal


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


     const handleEdit = (id) => {
    setEditingId(id); // Thiết lập ID của invoice đang được chỉnh sửa
    setIsModalOpen(true); // Mở modal
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
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Quản Lý Sản Phẩm</h5>
            <Button className="float-right"variant="primary" onClick={openModal}>
              Thêm Sản Phẩm
            </Button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Ảnh</th>
                <th scope="col">Tên</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
                <th scope="col">Hoạt Động</th>
              </tr>
            </thead>
            <tbody>
              {sanphamlist.map((invoice, index) => (
                <tr key={invoice._id}>
                  <th scope="row">{index + 1}</th>
                  <td className="" style={{ width: "7%" }}>
                    <img
                      src={invoice.linkImg}
                      className="img-fluid img-thumbnail"
                      alt="Sheep"
                    ></img>
                  </td>
                  <td>{invoice.title}</td>
                  <td>{invoice.price}</td>
                  <td>{invoice.category.name}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDelete(invoice._id)}
                      className="btn btn-danger"
                    >
                      Xóa
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEdit(invoice._id)}
                      className="btn btn-primary"
                    >
                      Sửa
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(invoice._id)}
                      className="btn btn-success"
                    >
                      Hiển Thị
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal showModal={showModal} closeModal={closeModal} />{" "}
        {isModalOpen && <EditProduct showModalEdit={isModalOpen} editingId={editingId}  closeModalEdit={() => setIsModalOpen(false)} />}
        
      </div>
    ); 
  }
  


function EditProduct({ showModalEdit, closeModalEdit, editingId }) {
  const [productInfo, setProductInfo] = useState({
    title: "",
    description: "",
    linkimg: "",
    price: 0,
    category: ""
  });

  const [menuList, SetmenuList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const category = await categoriApi.getAll();
        SetmenuList(category.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);


  useEffect(() => {
    async function fetchData() {
        try {
            const products = await sanphamApi.getById(editingId);
            const productData = products.data.data; // Dữ liệu sản phẩm từ server
            // Cập nhật state productInfo với dữ liệu sản phẩm từ server
            setProductInfo({
              title: productData.title || '',
              description: productData.description || '',
              linkimg: productData.linkImg || '',
              price: productData.price || 0,
              category: productData.category.name || "",
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    fetchData();

}, [editingId]); // Đặt `productId` vào mảng dependencies
console.log(productInfo);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductInfo({
      ...productInfo,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý logic khi người dùng submit form, ví dụ: gửi dữ liệu cập nhật lên server
    // Đồng thời đóng modal sau khi cập nhật
    closeModalEdit();
  };
  return (
    <ModalBootstrap show={showModalEdit} onHide={closeModalEdit}>
      <ModalBootstrap.Header closeButton>
        <ModalBootstrap.Title>Edit Product</ModalBootstrap.Title>
      </ModalBootstrap.Header>
      <ModalBootstrap.Body>
        <form className="row g-3 mt-5" onSubmit={handleSubmit}>
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              name="title"
              value={productInfo.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputPassword4" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              name="description"
              value={productInfo.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputCity" className="form-label">
              Link Img
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              name="linkimg"
              value={productInfo.linkimg}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-5">
            <label htmlFor="inputZip" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="inputZip"
              name="price"
              value={productInfo.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-5">
            <label htmlFor="inputState" className="form-label">
              Category
            </label>
            <select value={productInfo.category} onChange={handleInputChange}>
              {menuList.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </ModalBootstrap.Body>
      <ModalBootstrap.Footer>
        <Button variant="secondary" onClick={closeModalEdit}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save changes
        </Button>
      </ModalBootstrap.Footer>
    </ModalBootstrap>
  );
}



export default ListSanpham