import React, { Component } from 'react';
import Stuffs from '../../lib/globals';
import { withRouter } from 'react-router-dom'; // makes history available in props

import StuffEntry from './StuffEntry.jsx'

class NewStuff extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let name = this.stuffEntry.state.name;
    let interviewee = this.stuffEntry.state.interviewee;
    let that = this;

    if (!Stuffs.find({name}).count()) {
      Stuffs.insert(
        { name,
          interviewee,
          owner: Meteor.userId() },
        function(err, _id) {
          if (err) {
            alert('Unexpected error creating this interview! (' + err + ')');
            that.props.history.push('/');
          }
          else {
            that.props.history.push('/stuff-list');
          }
        }
      );
    }
    else {
      alert('This interview already exists! Could not create it.')
      this.setState({
        name: '',
        interviewee: ''
      });
    }
    return false;
  }

  render() {
    return (
      <StuffEntry title="Create new interview:" stuff={{name: '', interviewee: ''}} handleSubmit={this.handleSubmit}
        ref={(stuffEntry) => {this.stuffEntry = stuffEntry}} submitTitle="Create" />
    );
  }
}

export default withRouter(NewStuff);
