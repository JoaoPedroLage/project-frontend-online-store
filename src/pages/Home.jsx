import '../index.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import Cards from '../components/Cards';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      productName: '',
      findProduct: false,
      filterProducts: [],
      isSearchButtonDisabled: false,
    };

    this.onHandleInput = this.onHandleInput.bind(this);
    this.onHandleSearch = this.onHandleSearch.bind(this);
  }

  onHandleInput({ target }) {
    const { name, value } = target;

    this.setState(({ [name]: value }), () => {
      const { productName } = this.state;

      const minChar = 2;

      if (productName.length >= minChar) {
        this.setState({ isSearchButtonDisabled: false });
      } else { this.setState({ isSearchButtonDisabled: true }); }
    });
  }

  async onHandleSearch() {
    const { productName } = this.state;
    const categoriesList = await getCategories();

    const categoryId = categoriesList
      .filter((categories) => (categories.name.includes(productName)));
    const filterProducts = await getProductsFromCategoryAndQuery(categoryId, productName);

    this.setState({ filterProducts, findProduct: true });
  }

  render() {
    const {
      findProduct,
      productName,
      isSearchButtonDisabled } = this.state;

    return (
      <div>
        <h1>HOME</h1>
        <label htmlFor="query-input">
          <input
            type="text"
            name="productName"
            value={ productName }
            data-testid="query-input"
            onChange={ this.onHandleInput }
          />
        </label>
        <button
          type="button"
          data-testid="query-button"
          disabled={ isSearchButtonDisabled }
          onClick={ this.onHandleSearch }
        >
          Pesquisar
        </button>
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        <div>
          <Link data-testid="shopping-cart-button" to="/ShoppingCart">
            Carrinho de compras
          </Link>
        </div>
        <br />
        <div className="main-section">
          <section className="categories">
            <Categories />
          </section>
          { findProduct ? (
            <section className="cards">
              <Cards { ...this.state } />
            </section>
          ) : (<h2>Nenhum produto foi encontrado</h2>
          )}
        </div>
      </div>
    );
  }
}