import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { fetchAllMailsFurther } from "../../../state/actions/mailsActions";
import TableTitles from './TableTitles'
import TableRow from './TableRow'
import './index.css';

class ListMails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  tableRows = () => {
    if (this.props.location.pathname === "/ReleaseRequests") {
      return this.props.mails
      .filter(mail => (mail["Mail Status"] === this.props.status) || this.props.status === "All Requests")
      .filter(mail => mail["Subject"].toLowerCase().startsWith(this.props.search.toLowerCase()))
      .map((mail, index) => {
        return <TableRow key={index} mail={mail} />;
      })
    }
    return this.props.mails
    .filter(mail => mail["Subject"].toLowerCase().startsWith(this.props.search.toLowerCase()))
    .map((mail, index) => {
      return <TableRow key={index} mail={mail} />;
    })
  }

  trackScrolling = () => {
    let mailsEl = document.getElementsByClassName("list-mails-container")[0];
    if (mailsEl.scrollHeight - mailsEl.scrollTop - mailsEl.clientHeight < 1) {
      this.props.fetchAllMailsFurther()
    }
  }

  render() {
    return (
      <div className="list-mails-container" onScroll={this.trackScrolling}>
        <table className="list-mails" cellSpacing="1">
          <tbody>
            <TableTitles />
            {this.tableRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: state.statusReducer.status,
  search: state.searchReducer.search
})

const mapDispatchToProps = dispatch => ({
  fetchAllMailsFurther: () => dispatch(fetchAllMailsFurther()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListMails));