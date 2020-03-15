import React from 'react';

import './index.css';

let EmailInfo = ({mail}) => {
  return (
    <div className="email-info">
      <span className="email-info-title">E-mail Information</span>
      <div>
        <ul className="email-info-keys">
          <li>ID</li>
          <li>Received Time</li>
          <li>Recipiet</li>
          <li>Subject</li>
          <li>Sender</li>
          <li>Categorized As</li>
        </ul>
        <ul className="email-info-values">
          <li>{mail && mail["Mail ID"]}</li>
          <li>{mail && (mail["Sent Time"] || mail["Request Time"])}</li>
          <li>{mail && mail["Recipient"]}</li>
          <li>{mail && mail["Subject"]}</li>
          <li>{mail && mail["Sender"]}</li>
          <li>{mail && mail["Catagorized As"]}</li>
        </ul>
      </div>
    </div>
  );
}

export default EmailInfo;
