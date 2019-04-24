import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import './Facilities.css';

export const FacilitiesPage = () => 
  <div className="facilities-page">
    <nav>
      <Link to="">[Home]</Link>
      <Link to="animals">[Animals]</Link>
      <Link to="people">[People]</Link>
      <Link to="activities">[Activities]</Link>
    </nav>
    <div className="app">
      <Facilities />
    </div>
  </div>

const FACILITY_COLUMNS = {
  _id: {
    label: 'ID',
    width: '20%',
  },
  name: {
    label: 'Name',
    width: '20%',
  },
  address: {
    label: 'Address',
    width: '40%',
  },
  type: {
    label: 'Type',
    width: '20%',
  },
};

const Facility = ({ facility, columns }) => {
  const {
    _id,
    name,
    address,
    type,
  } = facility;

  return (
    <div className="facility">
      <span style={{ width: columns._id.width }} >
        {_id}
      </span>
      <span style={{ width: columns.name.width }} >
        {name}
      </span>
      <span style={{ width: columns.address.width }} >
        {address}
      </span>
      <span style={{ width: columns.type.width }} >
        {type}
      </span>
    </div>
  );
}

const FacilitiesHeader = ({ columns }) =>
  <div className="facilities-header">
    {Object.keys(columns).map(key =>
      <span
        key={key}
        style={{ width: columns[key].width }}
      >
        {columns[key].label}
      </span>
    )}
  </div>

class Facilities extends React.Component {
  state = {
    facilities: [],
    isLoading: false,
    error: false
  };

  async componentDidMount() {
    this.setState({isLoading: true});
    try {
      let facilitiesResponse = await axios.get('http://localhost:5000/v1/facilities');
      this.setState({
        error: false,
        facilities: facilitiesResponse.data,
        isLoading: false
      });
    } catch(e) {
      this.setState({
        error: true,
        facilities: [],
        isLoading: false
      });
      console.log("Axios failed to retrieve facilities.");
    }
  }

  render() {
    const {isLoading, error, facilities} = this.state;
    return (
      <div className="facilities">
        <FacilitiesHeader columns={FACILITY_COLUMNS} />
        { error && <p className="error">Something went wrong...</p> }
        { isLoading && <p className="message">Loading...</p> }
        {(facilities || []).map(facility =>
          <Facility
            key={facility._id}
            facility={facility}
            columns={FACILITY_COLUMNS}
          />
        )}
      </div>
    );
  }
};
