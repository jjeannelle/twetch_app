import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Games from './components/Games/Games';
import Header from './components/Commons/Header';
import Sidebar from './components/Commons/Sidebar';
import TopStreams from './components/Games/TopStreams';
import Live from './components/Games/Live';
import GamesStreams from './components/Games/GamesStreams';
import SearchResult from './components/Search/SearchResult';
import Error from './components/Errors/SearchError';

function App() {
  return (

    <Router
    forceRefresh={true}
    >
      <div className="App">
          <Header />
          <Sidebar />
          <Switch>
          <Route exact path="/" component={Games} />
              <Route exact path="/top-streams" component={TopStreams} />
              <Route exact path="/live/:slug" component={Live} />
              <Route exact path="/game/:slug" component={GamesStreams} />
              <Route exact path="/resultats/:slug" component={SearchResult} />
              <Route exact path="/resultats/" component={Error} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
