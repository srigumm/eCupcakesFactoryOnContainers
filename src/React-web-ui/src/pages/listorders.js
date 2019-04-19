
import React from 'react';

const DisplayOrders = (props) =>(
    <div>
    <h1>TEST</h1>
    <ul>
    {props.list.map((orderrequest, index) => (
      <div>
          <label>{orderrequest.id}</label>
      </div>
    ))}
  </ul>
  </div>
);

export default DisplayOrders;