import React , { useState ,useEffect }from 'react'
import categoryApi from '../../../api/categoryApi';


function Category() {

  const [danhMuclist, SetDanhMuc] = useState([]);

  const handleDelete = async (_id) => {
    try {
     await categoryApi.remove(_id);
      alert(`Xóa Sản Phẩm Thành Công với ID: ${_id}`);
      fetchData();
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error  ');
    }
  };

  useEffect(() => {
     
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      const order = await categoryApi.getAll();
      SetDanhMuc(order.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  return (
    <div className="px-5">
    <h1 className="text-center"> Quản Lý Sản Phẩm</h1>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Category</th>
        </tr>
      </thead>
      <tbody>
      {danhMuclist.map((invoice, index) => (
        <tr key={invoice._id}>
          <th scope="row">{index + 1}</th>
          <td>{invoice.name}</td>
          <td><button type="button" onClick={() => handleDelete(invoice._id)} className="btn btn-danger">Xóa</button></td>
        </tr>
      ))}
     
      </tbody>
    </table>
  
   
  </div>
  )
}

export default Category