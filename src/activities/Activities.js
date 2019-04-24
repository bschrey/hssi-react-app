import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import './Activities.css';

export const ActivitiesPage = () => 
  <div className="activities-page">
    <nav>
      <Link to="">[Home]</Link>
      <Link to="animals">[Animals]</Link>
      <Link to="people">[People]</Link>
      <Link to="facilities">[Facilities]</Link>
    </nav>
    <div className="app">
      <Activities />
    </div>
  </div>

const ACTIVITY_COLUMNS = {
  _id: {
    label: 'ID',
    width: '20%',
  },
  date: {
  label: 'Start Date',
  width: '30%',
  },
  enddate: {
  label: 'End Date',
  width: '30%',
  },
  type: {
    label: 'Type',
    width: '20%',
  }
};

const Activity = ({ activity, columns }) => {
  const {
    _id,
    date,
    enddate,
    type,
  } = activity;

  return (
    <div className="activity">
      <span style={{ width: columns._id.width }} >
        {_id}
      </span>
      <span style={{ width: columns.date.width }} >
        {date}
      </span>
      <span style={{ width: columns.enddate.width }} >
        {enddate}
      </span>
      <span style={{ width: columns.type.width }} >
        {type}
      </span>
    </div>
  );
}

const ActivitiesHeader = ({ columns }) =>
  <div className="activities-header">
    {Object.keys(columns).map(key =>
      <span
        key={key}
        style={{ width: columns[key].width }}
      >
        {columns[key].label}
      </span>
    )}
  </div>

class Activities extends React.Component {
  state = {
    activities: [],
    isLoading: false,
    error: false
  };

  async componentDidMount() {
    this.setState({isLoading: true});
    try {
      let activitiesResponse = await axios.get('http://localhost:7000/v1/activities');
      this.setState({
        error: false,
        activities: activitiesResponse.data,
        isLoading: false
      });
    } catch(e) {
      this.setState({
        error: true,
        activities: [],
        isLoading: false
      });
      console.log("Axios failed to retrieve activities.");
    }
  }

  render() {
    const {isLoading, error, activities} = this.state;
    return (
      <div className="activities">
        <ActivitiesHeader columns={ACTIVITY_COLUMNS} />
        { error && <p className="error">Something went wrong...</p> }
        { isLoading && <p className="message">Loading...</p> }
        {(activities || []).map(activity =>
          <Activity
            key={activity._id}
            activity={activity}
            columns={ACTIVITY_COLUMNS}
          />
        )}
      </div>
    );
  }
};
