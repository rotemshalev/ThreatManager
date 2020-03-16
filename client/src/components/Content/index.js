import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { fetchMails, clearSelectedMails } from "../../state/actions/mailsActions";
import Header from './Header';
import MailDetails from './MailDetails';
import ListMails from './ListMails';

import './index.css';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let mailsType;
    this.props.history.listen(() => {
      mailsType = window.location.pathname === "/ReleaseRequests" ? "releaseRequests" : "mails";
      this.props.fetchMails(mailsType);
      this.props.clearSelectedMails()
    });
  }

  render() {
    return (
      <div className="content">
        <Header />
        {this.props.mails && <ListMails mails={this.props.mails} />}
        <MailDetails mail={this.props.lastMailClicked} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mails: state.mailsReducer.mails,
  lastMailClicked: state.mailsReducer.lastMailClicked,
  loading: state.loading,
  error: state.error
})

const mapDispatchToProps = dispatch => ({
  fetchMails: (mailsType) => dispatch(fetchMails(mailsType)),
  clearSelectedMails: () => dispatch(clearSelectedMails())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Content));