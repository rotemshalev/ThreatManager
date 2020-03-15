import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { deleteMails, changeMailsStatus, fetchReleaseRequests, fetchAllMails, clearSelectedMails } from "../../../state/actions/mailsActions";
import { changeSearch } from "../../../state/actions/searchAction";
import ClearIcon from '@material-ui/icons/Clear';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import Status from './Status';
import './index.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      rejectOrDeleteTitle: "Reject"
    }
  }
  
  handleDeleteRejectClick = () => {
    if (this.state.rejectOrDeleteTitle === "Delete") {
      this.props.deleteMails(this.props.selectedMails);
    }
    else {
      this.props.changeMailsStatus(this.props.selectedMails, "Rejected");
    }
  }

  handleReleaseClick = () => {
    if (this.state.rejectOrDeleteTitle === "Reject") {
      this.props.changeMailsStatus(this.props.selectedMails, "Approved");
    }
    else {
      this.props.deleteMails(this.props.selectedMails);
    }
  }

  handleSearchChange = (e) => {
    this.setState({search: e.target.value});
    this.props.changeSearch(e.target.value);
    this.props.clearSelectedMails();
  }

  handleRefreshClick = () => {
    if (window.location.pathname === "/ReleaseRequests") {
      this.props.fetchReleaseRequests()
    }
    else {
      this.props.fetchAllMails()
    }
  }
  
  componentDidMount() {
    this.props.history.listen(() => {
      window.location.pathname !== "/AllQuarantinedEmails" ?
      this.setState({rejectOrDeleteTitle: "Reject"}) :
      this.setState({rejectOrDeleteTitle: "Delete"});
    });
  }

  render() {
    return (
      <div className="header">
        {window.location.pathname === "/ReleaseRequests" && <Status />}
        <button onClick={this.handleReleaseClick}>
          <OpenInBrowserIcon fontSize="small" />Release
        </button>
        <button onClick={this.handleDeleteRejectClick}>
          <ClearIcon fontSize="small"/>{this.state.rejectOrDeleteTitle}
        </button>
        <button disabled>
          <SaveAltIcon fontSize="small"/>Download EML
        </button>
        <button onClick={this.handleRefreshClick}>
          <RefreshIcon fontSize="small"/>Refresh
        </button>
        <div className="search-container">
          <div className="search-icon">
            <SearchIcon fontSize="small"/>
          </div>
          <input className="search" onChange={this.handleSearchChange} placeholder="Search Subject" type="text" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedMails: state.mailsReducer.selectedMails,
})

const mapDispatchToProps = dispatch => ({
  deleteMails: (selectedMails) => dispatch(deleteMails(selectedMails)),
  changeMailsStatus: (selectedMails, status) => dispatch(changeMailsStatus(selectedMails, status)),
  changeSearch: (search) => dispatch(changeSearch(search)),
  fetchReleaseRequests: () => dispatch(fetchReleaseRequests()),
  fetchAllMails: () => dispatch(fetchAllMails()),
  clearSelectedMails: () => dispatch(clearSelectedMails())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
