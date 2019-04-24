import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import './Animals.css';

export const AnimalsPage = () => 
  <div className="animals-page">
    <nav>
      <Link to="">[Home]</Link>
      <Link to="people">[People]</Link>
      <Link to="facilities">[Facilities]</Link>
      <Link to="activities">[Activities]</Link>
    </nav>
    <div className="app">
      <Animals />
    </div>
  </div>

const ANIMAL_COLUMNS = {
  key: {
    label: 'ID',
    width: '20%',
  },
  name: {
  label: 'Name',
  width: '40%',
  },
  type: {
    label: 'Type',
    width: '20%',
  },
  weight: {
    label: 'Weight',
    width: '20%',
  },
};

const Animal = ({ animal, columns }) => {
  const {
    key,
    name,
    type,
    weight,
  } = animal;

  return (
    <div className="animal">
      <span style={{ width: columns.key.width }} >
        {key}
      </span>
      <span style={{ width: columns.name.width }} >
        {name}
      </span>
      <span style={{ width: columns.type.width }} >
        {type}
      </span>
      <span style={{ width: columns.weight.width }} >
        {weight}
      </span>
    </div>
  );
}

const AnimalsHeader = ({ columns }) =>
  <div className="animals-header">
    {Object.keys(columns).map(key =>
      <span
        key={key}
        style={{ width: columns[key].width }}
      >
        {columns[key].label}
      </span>
    )}
  </div>

class Animals extends React.Component {
  state = {
    animals: [],
    isLoading: false,
    error: false
  };

  constructor(props) {
    super(props);
  
    this.fetchAnimalIds = this.fetchAnimalIds.bind(this);
    this.fetchAnimal = this.fetchAnimal.bind(this);
    this.convertAnimalIds = this.convertAnimalIds.bind(this);
  };

  async fetchAnimalIds(fetchAnimal, convertAnimalIds) {
    let animalIdsResponse = await axios.get('http://localhost:3000/v1/animals');
    await convertAnimalIds(animalIdsResponse.data.ids, fetchAnimal);
  };

  async fetchAnimal(id) {
    let animalResponse = await axios.get(`http://localhost:3000/v1/animals/${id}`);
    return animalResponse.data;
  };

  async convertAnimalIds(animalIds, fetchAnimal) {
    let animals = await Promise.all(animalIds.map(id => fetchAnimal(id)));
    this.setState({
      error: false,
      animals,
      isLoading: false
    });
  }

  async componentDidMount() {
    this.setState({isLoading: true});
    try {
      await this.fetchAnimalIds(this.fetchAnimal, this.convertAnimalIds);
    } catch(e) {
      this.setState({
        error: true,
        animals: [],
        isLoading: false
      });
      console.log("Axios failed to retrieve animals.");
    }
  }

  render() {
    const {isLoading, error, animals} = this.state;
    return (
      <div className="animals">
        <AnimalsHeader columns={ANIMAL_COLUMNS} />
        { error && <p className="error">Something went wrong...</p> }
        { isLoading && <p className="message">Loading...</p> }
        {(animals || []).map(animal =>
          <Animal
            key={animal.key}
            animal={animal}
            columns={ANIMAL_COLUMNS}
          />
        )}
      </div>
    );
  }
};
