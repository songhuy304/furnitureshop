import React from 'react'
function Card(props) {
  return (
    <div class="card">
      <div class="card-body p-3">
        <div class="row">
          <div class="col-8">
            <div class="numbers">
              <p class="text-sm mb-0 text-uppercase font-weight-bold">
                {props.title && props.title}
              </p>
              <h5 class="font-weight-bolder">${props.title && props.total}</h5>
              <p class="mb-0">
                <span class="text-success text-sm font-weight-bolder">
                  +55%
                </span>
                since yesterday
              </p>
            </div>
          </div>
          <div class="col-4 text-end">
            <div class="w-75 h-75 rounded-circle d-flex align-items-center justify-content-center" style={{backgroundColor: props.circleColor ? props.circleColor : '#f6f6fe'}}>
              {props.icon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card