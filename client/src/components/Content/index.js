import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { fetchAllMails, fetchReleaseRequests, clearSelectedMails } from "../../state/actions/mailsActions";
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
    this.props.history.listen(() => {
      window.location.pathname !== "/AllQuarantinedEmails" ? this.props.fetchReleaseRequests() : this.props.fetchAllMails();
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
  fetchAllMails: () => dispatch(fetchAllMails()),
  fetchReleaseRequests: () => dispatch(fetchReleaseRequests()),
  clearSelectedMails: () => dispatch(clearSelectedMails())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Content));