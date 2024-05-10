import React , {useState, useEffect} from 'react'
import OrderApi from '../../../api/order';

function Order() {
  const [orderlist, Setorderlist] = useState([]);




  
  useEffect(() => {
    async function fetchData() {
      try {
        const order = await OrderApi.getAll();
        Setorderlist(order.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []); 

  return (
    <div className="px-5">
      <h2 className="text-center">Quản Lý Đơn Hàng</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Total</th>
            <th scope="col">status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {orderlist.map((invoice, index) => (
            <tr key={invoice._id}>
              <th scope="row">{index + 1}</th>
              <td>{invoice.customer_name}</td>
              <td>{invoice.phone}</td>
              <td>{invoice.total}</td>
              <td>
                        <button className={invoice.status === 'Done...' ? 'btn btn-success' : 'btn btn-danger'}>{invoice.status}</button>
                  </td>

            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default Order