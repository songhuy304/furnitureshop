import React , {useState, useEffect} from 'react'
import CategoryApi from '../../../api/categoryApi';
import sanphamApi from '../../../api/sanphamApi';
function Sanpham() {
  const [menuList, SetmenuList] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [linkimg, setlinkimg] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);

  
  // Hàm xử lý khi giá trị của input thay đổi
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleLinkImgChange = (event) => {
    setlinkimg(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const inputForm = {
        title : title,
        price:price,
        category : category,
        linkImg:linkimg,
        description : description
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
    <div className="px-5">
      <h2 className="text-center">Quản Lý Sản Phẩm</h2>
      <form className="row g-3 mt-5" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Title
          </label>
          <input type="text" className="form-control" id="inputEmail4" value={title} onChange={handleTitleChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Description
          </label>
          <input type="text" className="form-control" id="inputPassword4" value={description} onChange={handleDescriptionChange} />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            Link Img
          </label>
          <input type="text" className="form-control" id="inputCity" value={linkimg} onChange={handleLinkImgChange} />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">
            Danh mục
          </label>
          <select id="inputState" className="form-select" value={category} onChange={handleCategoryChange}>
            
            {menuList.map((item) => (
              <option key={item._id}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="inputZip" className="form-label">
            Giá
          </label>
          <input type="number" className="form-control" id="inputZip" value={price} onChange={handlePriceChange} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Sanpham