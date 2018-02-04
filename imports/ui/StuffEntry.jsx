import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'

export default class StuffEntry extends Component {
  constructor(props) {
    super(props);
    let userFound = false;

    if (Meteor.users.find({username: this.props.stuff.interviewee}).count()) {
      userFound = true;
    }

    this.state = {
      loaded: false,
      name: this.props.stuff ? this.props.stuff.name : '',
      interviewee: this.props.stuff ? this.props.stuff.interviewee : '',
      userFound
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    let userFound = false;

    if (name == 'interviewee') {
      if (Meteor.users.find({username: value}).count()) {
        userFound = true;
      }
    }

    this.setState({
      [name]: value,
      userFound
    });
  }

  render() {
    const hasCancelButton = this.props.hasCancelButton;
    let intervieweeStatus = 'form-group';
    if (this.state.interviewee) {
      intervieweeStatus += this.state.userFound ? ' has-success' : ' has-error';
    }

    return (
      <div className="container">
        <h3>{this.props.title}</h3>
        <form action="action" onSubmit={this.props.handleSubmit}>

          <div className="form-group">
            <label>Interview name</label>
            <input className="form-control" type="text" name="name"
              value={this.state.name}
              onChange={this.handleInputChange} />
          </div>

          <div className={intervieweeStatus}>
            <label>Interviewee</label>
            <input className="form-control" type="text" name="interviewee"
              value={this.state.interviewee}
              onChange={this.handleInputChange} />
          </div>

          <input className="btn btn-default" type="submit" value={this.props.submitTitle}/>&nbsp;
          {hasCancelButton &&
            <Link className="btn btn-default" to="/stuff-list">Cancel</Link>
          }
        </form>
      </div>
    )
  }
}
