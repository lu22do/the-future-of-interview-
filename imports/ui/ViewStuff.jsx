import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';

import Stuffs from '../../lib/globals';
import StuffEntry from './StuffEntry.jsx'

class ViewStuff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && !state.loaded) {
      this.setState({
        loaded: true,
        name: nextProps.stuff.name,
        interviewee: nextProps.stuff.interviewee,
        transcript: nextProps.stuff.transcript
      });
    }
  }

  render() {
    if (this.props.loading) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    return (
      <div className="container">
        <h3>Review an interview</h3>

        <h2>Interview name</h2>
        <p>
          {this.state.name}
        </p>

        <h2>Interviewee</h2>
        <p>
          {this.state.interviewee}
        </p>

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
