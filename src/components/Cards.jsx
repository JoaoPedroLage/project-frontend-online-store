import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Cards extends React.Component {
  render() {
    const { filterProducts: { results } } = this.props;
    return (
      <div>
        {results.map((product) => (
          (
            <div data-testid="product" className="card" key={ product.id }>
              { /* tem que transformar todo o card num clicavel
              pra redirecionar para a pag CardDetail e ai no link tem que ter a prop. */ }
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
};
