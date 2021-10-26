import React from 'react';

export default class ShoppingCart extends React.Component {
  render() {
    return (
      <div>
        <h2 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h2>
        <img src="https://cdn-icons-png.flaticon.com/512/126/126510.png" alt="carrinho de compras" />
      </div>
    );
  }
}
