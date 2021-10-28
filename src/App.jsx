import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CardDetail from './pages/CardDetail';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={ Home } />
          <Route path="/ShoppingCart" component={ ShoppingCart } />
          <Route path="/CardDetail/:id/:title" component={ CardDetail } />
          { /* passa a prop 'id' já pela url (route passae e gera hystory, location e match, e no
            match tem o params que é onde tem a id , titulo, que vai ta na url. */ }
        </BrowserRouter>
      </div>
    );
  }
}
