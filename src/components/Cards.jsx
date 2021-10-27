import React from 'react';
import PropTypes from 'prop-types';

export default class Cards extends React.Component {
  render() {
    const { filterProducts: { results } } = this.props;
    return (
      <div>
        {results.map((product) => (
          (
            <div className="card" key={ product.id }>
              <h3 data-testid="product">{ product.title }</h3>
              <img
                data-testid="product"
                src={ product.thumbnail }
                alt={ product.title }
              />
              <br />
              <span data-testid="product">
                Preço:
                &nbsp;
                { product.price }
              </span>
            </div>
          )))}
      </div>);
  }
}

Cards.propTypes = {
  filterProducts: PropTypes.shape({
    results: PropTypes.shape,
  }).isRequired,
};