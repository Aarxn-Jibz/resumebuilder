import type { Component } from 'solid-js';
import Home from './homepage';
import Header from './Header';


const App: Component = () => {
  return (
    <>
      <Header />
      <Home />
    </>
  );
};

export default App;
