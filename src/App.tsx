import type { Component } from 'solid-js';
import { Router, Route } from '@solidjs/router';


import Home from './homepage';
import Header from './Header';
import Create from './create';


const App: Component = () => {
  return (
    <>
      <Header />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/create" component={Create} />
      </Router>
    </>
  );
};

export default App;
