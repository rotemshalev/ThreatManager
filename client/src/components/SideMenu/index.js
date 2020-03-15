import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

let SideMenu = () => {
  return (
    <div className="side-menu">
      <ul className="req-types-list">
        <li><Link to="/ReleaseRequests">Release Requests</Link></li>
        <li><Link to="/AllQuarantinedEmails">All Quarantined Emails</Link></li>
      </ul>
    </div>
  );
}

export default SideMenu;
