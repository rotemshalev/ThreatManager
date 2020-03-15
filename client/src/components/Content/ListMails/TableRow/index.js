import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { selectMail } from "../../../../state/actions/mailsActions";
import './index.css';

class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
  }

  handleMailClicked = () => {
    let { mail } = this.props;
    this.props.selectMail(mail);
  }

  componentDidMount = () => {
    this.props.history.listen(() => {
      this.setState({selected: false});
    });
  }
  
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    this.setState({selected: nextProps.selectedMails[this.props.mail["Mail ID"]] === true});
  }

  render() {
    let mail = Object.assign({}, this.props.mail);
    let { selected } = this.state;
    
    return (
      <tr className="table-row" onClick={this.handleMailClicked}>
        <td>
          <input type="checkbox" onChange={this.handleMailClicked} checked={selected} value={mail} />
        </td>
        {delete mail["Mail Status"] && Object.values(mail).map((val, index) => <td key={index}>{val}</td>)}
      </tr>
    )
  }
}

const mapStateToProps = state => ({
  selectedMails: state.mailsReducer.selectedMails,
})

const mapDispatchToProps = dispatch => ({
  selectMail: mail => dispatch(selectMail(mail))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableRow));
