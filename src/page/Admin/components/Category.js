import React from 'react'
function Category() {
  return (
    <div className="px-5">
      <h2 className="text-center">Quản Lý Sản Phẩm</h2>
      <form classname="row g-3 mt-5">
        <div classname="col-md-6">
          <label for="inputEmail4" classname="form-label">
          Name
          </label>
          <input type="text" classname="form-control" id="inputEmail4" />
        </div>
        <div classname="col-12">
          <button type="submit" classname="btn btn-primary">
            Thêm Sản Phẩm
          </button>
        </div>
      </form>
    </div>
  )
}

export default Category