import React from 'react';
import Categories from '../components/Categories';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>HOME</h1>
        <input
          type="text"
          name="search-input"
          id="home-initial-message"
        />
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        <Categories />
        <div>
          <Link data-testid="shopping-cart-button" to="/ShoppingCart">
            Carrinho de compras
          </Link>
        </div>
      </div>
    );
  }
}
