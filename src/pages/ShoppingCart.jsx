import React from 'react';
import PropTypes from 'prop-types';

export default class ShoppingCart extends React.Component {
  constructor() {
    super();

    this.state = {
      shoppingCartProducts: [],
    };

    this.addOneProduct = this.addOneProduct.bind(this);
    this.rmOneProduct = this.rmOneProduct.bind(this);
    this.onCartList = this.onCartList.bind(this);
  }

  componentDidMount() {
    this.onCartList();
  }

  onCartList() {
    const { cartList } = this.props;
    this.setState({ shoppingCartProducts: cartList });
  }

  addOneProduct(name) {
    const { cartList } = this.props;
    const xabalu = cartList.map((item) => {
      if (item.name === name) {
        item.quantity += 1;
        return item;
      }
      return item;
    });
    this.setState({ shoppingCartProducts: xabalu });
  }

  rmOneProduct(name) {
    const { cartList } = this.props;
    const xabalu = cartList.map((item) => {
      if (item.name === name && item.quantity > 0) {
        item.quantity -= 1;
        return item;
      }
      return item;
    });
    this.setState({ shoppingCartProducts: xabalu });
  }

  render() {
    const { shoppingCartProducts } = this.state;

    return (
      <div className="shopping-cart">
        {/* condição: A quantidade de produtos aparece
         no carrinho se o botão for clicado */}
        <h1>Carrinho de Compras</h1>
        <br />
        <img src="https://cdn-icons-png.flaticon.com/512/126/126510.png" alt="carrinho de compras" />
        <hr size="10" width="100%" align="center" />
        { shoppingCartProducts.length === 0
          ? (
            <h2 data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </h2>)
          : shoppingCartProducts.map((item) => (
            <div key={ item.name }>
              <h3 data-testid="shopping-cart-product-name">{ item.name }</h3>
              <p data-testid="shopping-cart-product-quantity">
                { Number(item.quantity) }
              </p>
              <button
                quantity={ item.quantity }
                data-testid="product-increase-quantity"
                name={ `button of ${item.name}` }
                type="button"
                onClick={ () => this.addOneProduct(item.name) }
              >
                Adicionar
              </button>
              <button
                data-testid="product-decrease-quantity"
                name={ `button of ${item.name}` }
                type="button"
                onClick={ () => this.rmOneProduct(item.name) }
              >
                Remover
              </button>
              <br />
            </div>
          )) }
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
