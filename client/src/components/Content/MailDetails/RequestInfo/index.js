import React from 'react';

import './index.css';

let RequestInfo = ({mail}) => {
  return (
    <div className="request-info">
      <span className="request-info-title">Request Information</span>
      <div>
        <ul className="request-info-keys">
          <li>Request Time</li>
          <li>Requested By</li>
        </ul>
        <ul className="request-info-values">
          <li>{mail["Request Time"]}</li>
          <li>{mail["Sender"]}</li>
        </ul>
      </div>
    </div>
  );
}

export default RequestInfo;
