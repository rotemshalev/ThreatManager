import React from 'react';
import { connect } from "react-redux";

import './index.css';

let allTitles = {
  "allQuarantinedEmails": [
    "Mail ID",
    "Sent Time",
    "Recipient",
    "Sender",
    "Subject",
    "Catagorized As"
  ],
  "releaseRequests": [
    "Mail ID",
    "Request Time",
    "Requested By",
    "Recipient",
    "Sender",
    "Subject",
    "Catagorized As"
  ]
}

class TableTitles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
  }
  
  handleClickAll = () => {
    this.setState({checked: !this.state.checked});
    if (!(this.state.checked && Object.keys(this.props.selectedMails).length === 0)) {
      [...document.getElementsByClassName("table-row")].forEach(elem => elem.click());
    }
  }

  render() {
    let titles = window.location.pathname === "/AllQuarantinedEmails" ? allTitles.allQuarantinedEmails : allTitles.releaseRequests;
    return (
      <tr className="table-titles">
        <td><input type="checkbox" checked={this.state.checked} onChange={this.handleClickAll} /></td>
        {titles.map((title, index) => <td key={index}>{title}</td>)}
      </tr>
    );
  }
}

const mapStateToProps = state => ({
  selectedMails: state.mailsReducer.selectedMails,
})

export default connect(mapStateToProps)(TableTitles);