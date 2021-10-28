import '../index.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import Cards from '../components/Cards';
import Loading from '../components/Loading';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      categoryId: '',
      searchMode: false,
      productName: '',
      findProduct: false,
      loading: false,
      filterProducts: [],
      isSearchButtonDisabled: false,
    };

    this.onHandleInput = this.onHandleInput.bind(this);
    this.onHandleSearch = this.onHandleSearch.bind(this);
    this.handleCategoriesList = this.handleCategoriesList.bind(this);
  }

  async handleCategoriesList({ target }) {
    this.setState({ searchMode: true, loading: true }); // iniciar o modo de pesquisa
    let findProduct = false; // começa como falso
    const { productName } = this.state;

    const filterProducts = await getProductsFromCategoryAndQuery(target.id, productName);
    this.setState({
      categoryId: target.id,
      filterProducts,
    });
    if (filterProducts.results.length > 0) findProduct = true; // aqui tem q ser o resultado
    this.setState({ filterProducts, findProduct, loading: false });
  }

  async onHandleSearch() {
    this.setState({ searchMode: true, loading: true }); // iniciar o modo de pesquisa
    let findProduct = false; // começa como falso
    const { productName } = this.state;
    const categoriesList = await getCategories();
    const categoryId = categoriesList
      .filter((categories) => (categories.name.includes(productName)));
    const filterProducts = await getProductsFromCategoryAndQuery(categoryId, productName);
    // aqui tem q fazer a condicção de qdo nao encontra nenhum produto para renderizar a msg
    if (filterProducts.results.length > 0) findProduct = true; // aqui tem q ser o resultado
    this.setState({ filterProducts, findProduct, loading: false });
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

  render() {
    const {
      loading,
      searchMode,
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
            <Categories handleCategoriesList={ this.handleCategoriesList } />
          </section>
          {searchMode && (
            loading ? <Loading />
              : (
                <div>
                  { findProduct ? (
                    <section className="cards">
                      <Cards { ...this.state } />
                    </section>
                  )
                    : <h2>Nenhum produto foi encontrado</h2>}
                </div>)
          )}
        </div>
      </div>
    );
  }
}
