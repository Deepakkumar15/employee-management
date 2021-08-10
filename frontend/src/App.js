import React from 'react';
import  { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom' ;
import Header from './components/Header/Header';
import Update from './Update';
import Home from './Home' ;
import Search from './Search' ;

const App = () => {
  return (
    <Router>
      <Header />
      <main>
      {/* <Route path="/" exact={true}>
        <Home />
      </Route>   */}
      <Route path="/employees/:id" exact={true}>
        <Update />
      </Route>
      <Route path="/">
        <Search />
      </Route>
      </main>  
    </Router>  
  );
};

export default App;
