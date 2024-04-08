import ModalBootstrap from 'react-bootstrap/Modal';
import React from 'react';
import Button from 'react-bootstrap/Button';
function Modal({ showModal, closeModal ,orderItem }) {
    return (
      <ModalBootstrap
        style={{ marginTop: "100px" }}
        show={showModal}
        onHide={closeModal}
      >
        <ModalBootstrap.Header closeButton>
          <ModalBootstrap.Title>Chi Tiết Sản Phẩm</ModalBootstrap.Title>
        </ModalBootstrap.Header>
        <ModalBootstrap.Body>
          <div className="row">
            <div class="col-md-6">
              <input
                disabled
                type="email"
                class="form-control"
                value={orderItem ? orderItem.customer_name : ''}
              />
            </div>
            <div class="col-md-6">
              <input
                disabled
                readonly
                type="email"
                class="form-control"
                value={orderItem ? orderItem.total : ''}
              />
            </div>
          </div>
          <h2 className="mt-4 text-center">Sản Phẩm đơn hàng</h2>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">price</th>
                <th scope="col">quantity</th>
                <th scope="col">total</th>
              </tr>
            </thead>
            <tbody>
              {orderItem.invoice_items && orderItem.invoice_items.map((_, i) => (
                <tr key={i}>
                  <th scope="row">{i}</th>
                  <th>{_.name}</th>
                  <td>{_.price}</td>
                  <td>{_.quantity}</td>
                  <td>{_.itemTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
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