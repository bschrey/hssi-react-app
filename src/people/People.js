import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import './People.css';

export const PeoplePage = () => 
  <div className="people-page">
    <nav>
      <Link to="">[Home]</Link>
      <Link to="animals">[Animals]</Link>
      <Link to="facilities">[Facilities]</Link>
      <Link to="activities">[Activities]</Link>
    </nav>
    <div className="app">
      <People />
    </div>
  </div>

const PERSON_COLUMNS = {
  key: {
    label: 'ID',
    width: '20%',
  },
  first: {
    label: 'First',
    width: '20%',
  },
  last: {
    label: 'Last',
    width: '20%',
  },
  gender: {
    label: 'Gender',
    width: '20%',
  },
  age: {
    label: 'Age',
    width: '20%',
  },
};

const Person = ({ person, columns }) => {
  const {
    key,
    first,
    last,
    gender,
    age,
  } = person;

  return (
    <div className="person">
      <span style={{ width: columns.key.width }} >
        {key}
      </span>
      <span style={{ width: columns.first.width }} >
        {first}
      </span>
      <span style={{ width: columns.last.width }} >
        {last}
      </span>
      <span style={{ width: columns.gender.width }} >
        {gender}
      </span>
      <span style={{ width: columns.age.width }} >
        {age}
      </span>
    </div>
  );
}

const PeopleHeader = ({ columns }) =>
  <div className="people-header">
    {Object.keys(columns).map(key =>
      <span
        key={key}
        style={{ width: columns[key].width }}
      >
        {columns[key].label}
      </span>
    )}
  </div>

class People extends React.Component {
  state = {
    people: [],
    isLoading: false,
    error: false
  };

  constructor(props) {
    super(props);
  
    this.fetchPeopleIds = this.fetchPeopleIds.bind(this);
    this.fetchPerson = this.fetchPerson.bind(this);
    this.convertPeopleIds = this.convertPeopleIds.bind(this);
  };

  async fetchPeopleIds(fetchPerson, convertPeopleIds) {
    let peopleIdsResponse = await axios.get('http://localhost:4000/v1/person');
    await convertPeopleIds(peopleIdsResponse.data.ids, fetchPerson);
  };

  async fetchPerson(id) {
    let personResponse = await axios.get(`http://localhost:4000/v1/person/${id}`);
    return personResponse.data;
  };

  async convertPeopleIds(peopleIds, fetchPerson) {
    let people = await Promise.all(peopleIds.map(id => fetchPerson(id)));
    this.setState({
      error: false,
      people,
      isLoading: false
    });
  }

  async componentDidMount() {
    this.setState({isLoading: true});
    try {
      await this.fetchPeopleIds(this.fetchPerson, this.convertPeopleIds);
    } catch(e) {
      this.setState({
        error: true,
        people: [],
        isLoading: false
      });
      console.log("Axios failed to retrieve people.");
    }
  }

  render() {
    const {isLoading, error, people} = this.state;
    return (
      <div className="people">
        <PeopleHeader columns={PERSON_COLUMNS} />
        { error && <p className="error">Something went wrong...</p> }
        { isLoading && <p className="message">Loading...</p> }
        {(people || []).map(person => 
          <Person
            key={person.key}
            person={person}
            columns={PERSON_COLUMNS}
          />
        )}
      </div>
    );
  }
};
