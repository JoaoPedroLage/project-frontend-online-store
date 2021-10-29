import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CardDetail from './pages/CardDetail';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartList: [],
    };

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart({ target }) { // função para adicionar o produto ao carrinho de compras
    const { name } = target;
    const object = {
      name,
      quantity: 1,
    };
    this.setState((prevState) => ({ cartList: [...prevState.cartList, object] }));
  }

  render() {
    const { cartList } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Route
            exact
            path="/"
            render={ (propsRouter) => (
              <Home
                { ...propsRouter }
                addToCart={ this.addToCart }
              />) }
          />
          <Route
            path="/ShoppingCart"
            render={ (propsRouter) => (
              <ShoppingCart
                { ...propsRouter }
                cartList={ cartList }
              />) }
          />
          <Route
            path="/CardDetail/:id/:title"
            render={ (propsRouter) => (
              <CardDetail
                { ...propsRouter }
                addToCart={ this.addToCart }
              />) }
          />
          { /* passa a prop 'id' já pela url (route passae e gera hystory, location e match, e no
            match tem o params que é onde tem a id , titulo, que vai ta na url. */ }
        </BrowserRouter>
      </div>
    );
  }
}
