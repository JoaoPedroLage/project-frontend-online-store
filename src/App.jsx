import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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
            render={ (propsRouter) => (<Home
              { ...propsRouter }
              addToCart={ this.addToCart }
            />) }
          />
          <Route
            path="/ShoppingCart"
            render={ (propsRouter) => (<ShoppingCart
              { ...propsRouter }
              cartList={ cartList }
            />) }
          />
        </BrowserRouter>
      </div>
    );
  }
}
