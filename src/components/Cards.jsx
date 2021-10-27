import React from 'react';
import PropTypes from 'prop-types';

export default class Cards extends React.Component {
  render() {
    const { filterProducts: { results } } = this.props;
    return (
      <div>
        {results.map((product) => (
          (
            <div data-testid="product" className="card" key={ product.id }>
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
            </div>
          )))}
      </div>);
  }
}

Cards.propTypes = {
  filterProducts: PropTypes.shape({
    results: PropTypes.arrayOf,
  }).isRequired,
};
