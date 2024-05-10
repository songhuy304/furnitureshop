import React , {useState ,useEffect}from 'react';
import Button from 'react-bootstrap/Button';
import CategoryApi from '../../../api/categoryApi';
import sanphamApi from '../../../api/sanphamApi';
import ModalBootstrap from 'react-bootstrap/Modal';

function Modal({ showModal, closeModal , data }) {

  const [menuList, SetmenuList] = useState([]);

  const [productinfor , setProductInfor] = useState({
    title: '',
    description: '',
    linkimg: '',
    category: '',
    price : 0,
    
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductInfor({ ...productinfor, [name]: value });
  };
  
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const inputForm = {
        title : productinfor.title,
        price:productinfor.price,
        category : productinfor.category,
        linkImg:productinfor.linkimg,
        description : productinfor.description
      };
      // Gọi API checkout
       await sanphamApi.add(inputForm);
      
      // Xử lý kết quả từ server nếu cần
      alert('Add product successful');
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error during checkout:', error.response.data.message);
    }
  };

  // Hàm xử lý khi form được submit
 

  useEffect(() => {
    async function fetchData() {
      try {
        const category = await CategoryApi.getAll();
        SetmenuList(category.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []); 
  return (
    <ModalBootstrap show={showModal} onHide={closeModal}>
      <ModalBootstrap.Header closeButton>
        <ModalBootstrap.Title>Modal title</ModalBootstrap.Title>
      </ModalBootstrap.Header>
      <ModalBootstrap.Body>
      <div className="">
      <form className="row g-3 mt-5" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Title
          </label>
          <input type="text" className="form-control" id="inputEmail4" name="title" value={productinfor.title} onChange={handleInputChange}  />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Description
          </label>
          <input type="text" className="form-control" id="inputPassword4"  name="description" value={productinfor.description} onChange={handleInputChange}  />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            Link Img
          </label>
          <input type="text" className="form-control" id="inputCity" name="linkimg" value={productinfor.linkimg} onChange={handleInputChange}  />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">
            Danh mục
          </label>
          <select id="inputState" className="form-select"  name="category" value={productinfor.category} onChange={handleInputChange}  >
            
            {menuList.map((item) => (
              <option key={item._id}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="inputZip" className="form-label">
            Giá
          </label>
          <input type="number" className="form-control" id="inputZip"  name="price"  value={productinfor.price} onChange={handleInputChange}  />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
      </ModalBootstrap.Body>
      <ModalBootstrap.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={closeModal}>
          Save changes
        </Button>
      </ModalBootstrap.Footer>
    </ModalBootstrap>
  );
}

export default Modal;
