import React from 'react';
import PropTypes from 'prop-types';

export default class ShoppingCart extends React.Component {
  render() {
    const {
      cartList,
    } = this.props;
    return (
      <div>
        {/* condição: A quantidade de produtos aparece
         no carrinho se o botão for clicado */}
        { cartList.length === 0
          ? (
            <h2 data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </h2>)
          : cartList.map((item) => (
            <div key={ item.name }>
              <h3 data-testid="shopping-cart-product-name">{ item.name }</h3>
              <p data-testid="shopping-cart-product-quantity">{ item.quantity }</p>
            </div>
          )) }
        <img src="https://cdn-icons-png.flaticon.com/512/126/126510.png" alt="carrinho de compras" />
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
  })).isRequired,
};
