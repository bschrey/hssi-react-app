import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';

import './App.css';

import {AnimalsPage} from './animals/Animals';
import {PeoplePage} from './people/People';
import {FacilitiesPage} from './facilities/Facilities';
import {ActivitiesPage} from './activities/Activities';

export const HomePage = () => 
  <div className="home-page">
    <nav>
      <Link to="animals">[Animals]</Link>
      <Link to="people">[People]</Link>
      <Link to="facilities">[Facilities]</Link>
      <Link to="activities">[Activities]</Link>
    </nav>
    <div className="app">
      <h1>Welcome to the HSSI Application</h1>
    </div>
  </div>

const App = () => 
  <HashRouter>
    <div className="app">
      <Route exact path="/" component={HomePage} />
      <Route exact path="/animals" component={AnimalsPage} />
      <Route exact path="/people" component={PeoplePage} />
      <Route exact path="/facilities" component={FacilitiesPage} />
      <Route exact path="/activities" component={ActivitiesPage} />
    </div>
  </HashRouter>

export default App;
