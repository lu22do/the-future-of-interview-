import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';

import Stuffs from '../../lib/globals';

class ViewStuff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      loadingIndicator: true
    };

    setTimeout(() => {
      this.setState({
        loadingIndicator: false
      });
    }, 5000);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && !nextProps.loaded) {
      this.setState({
        loaded: true,
        name: nextProps.stuff.name,
        interviewee: nextProps.stuff.interviewee,
        transcript: nextProps.stuff.transcript
      });
    }
  }

  render() {
    if (this.state.loadingIndicator) {
      return (
        <h2>
          Converting video to text with Veritone APIs!...
        </h2>
      )
    }

    return (
      <div className="container">
        <h3>Interview review</h3>

        <h4>Interview name</h4>
        <p>
          {this.state.name}
        </p>
        <br />

        <h4>Interviewee</h4>
        <p>
          {this.state.interviewee}
        </p>
        <br />

        <h4>Transcript</h4>
        <h5>Question 1: Tell me my about one of your weaknesses?</h5>
        <p>
          {this.state.transcript}
        </p>

        <input className="btn btn-default" input="button" value="See video"/>&nbsp;
        <br />
        <br />

        <hr></hr>
        <input className="btn btn-default" value="Hire"/>&nbsp;
        <input className="btn btn-default" value="Reject"/>&nbsp;

      </div>
    );
  }
}

export default withRouter(withTracker(props => {
  const handle = Meteor.subscribe('stuffs');
  const loading = !handle.ready();
  const stuff = Stuffs.findOne(props.match.params.id);

  return {
    loading,
    stuff
  };
})(ViewStuff));
