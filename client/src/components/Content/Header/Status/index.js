import React, { Component } from 'react';
import { connect } from "react-redux";

import { changeStatus } from "../../../../state/actions/statusActions";
import { clearSelectedMails } from '../../../../state/actions/mailsActions';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import './index.css';

class Status extends Component {
  constructor() {
    super();
    this.state = {
      status: "All Requests"
    };
  }

  handleChange = (e) => {
    this.setState({status: e.target.value});
    this.props.changeStatus(e.target.value);
    this.props.clearSelectedMails();
  }

  componentDidMount() {
    this.setState({status: this.props.status});
  }

  render() {
    return (
      <div className="status">
        <div className="status-title">Status</div>
        <FormControl>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={this.state.status}
            onChange={this.handleChange}
            className="status-dropdown"
          >
            <MenuItem value={"All Requests"}>All Requests</MenuItem>
            <MenuItem value={"Open"}>Open</MenuItem>
            <MenuItem value={"Approved"}>Approved</MenuItem>
            <MenuItem value={"Rejected"}>Rejected</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: state.statusReducer.status
})

const mapDispatchToProps = dispatch => ({
  changeStatus: (status) => dispatch(changeStatus(status)),
  clearSelectedMails: (status) => dispatch(clearSelectedMails(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(Status);
