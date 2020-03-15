import React from 'react';
import { connect } from 'react-redux';

import EmailInfo from './EmailInfo';
import RequestInfo from './RequestInfo';
import './index.css';

let MailDetails = ({mail}) => {
  return (
    <div className="mail-details-container">
      <div className="mail-details-title">Details</div>
      <div className="mail-details">
        <EmailInfo mail={mail} />      
        {mail && mail["Request Time"] && <RequestInfo mail={mail} />}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  mail: state.mailsReducer.lastMailSelected
})

export default connect(mapStateToProps)(MailDetails);
