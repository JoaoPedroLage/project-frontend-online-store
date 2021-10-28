import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Cards extends React.Component {
  render() {
    const { filterProducts: { results }, addToCart } = this.props;
    return (
      <div>
        {results.map((product) => (
          (
            <div data-testid="product" className="card" key={ product.id }>
              <h3 data-testid="shopping-cart-product-name">{ product.title }</h3>
              <img
                src={ product.thumbnail }
                alt={ product.title }
              />
              <br />
              <span>
                Preço:
                &nbsp;
                { product.price }
              </span>
              <button
                type="button"
                data-testid="product-add-to-cart"
                id={ product.title }
                onClick={ addToCart }
                name={ product.title }
              >
                Adicionar ao carrinho
              </button>
              <Link
                to={ `/CardDetail/${product.id}/${product.title}` }
                data-testid="product-detail-link"
              >
                <h3>{ product.title }</h3>
                <img
                  src={ product.thumbnail }
                  alt={ product.title }
                />
                <br />
                <span>
                  Preço:
                  &nbsp;
                  { product.price }
                </span>
              </Link>
            </div>
          )))}
      </div>);
  }
}

Cards.propTypes = {
  filterProducts: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};
