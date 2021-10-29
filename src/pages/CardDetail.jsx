import '../index.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductByID } from '../services/api';

export default class CardDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      product: {
        thumbnail: '', // essas infs não tem como pegar pelo params / props, então é gambiarra pra pegar pela API.
        price: '',
      }, // inicia sem nenhum produto, pq vai usar o id pra fazer outra pesquisa pra pegar todos os detalhes.
    };

    this.getProduct = this.getProduct.bind(this); // bind da func assincrona
  }

  componentDidMount() {
    this.getProduct();
  }

  async getProduct() { // função pra pesquisar o ID do produto na api
    const { match } = this.props; // aqui a info vem pelo mathc/ params do route lá do app
    const product = await getProductByID(match.params.id);
    this.setState({
      product,
    });
  }

  render() {
    const { product } = this.state;
    const { match, addToCart } = this.props;
    const details = (
      product && ( // gambiarra pra passar no teste. Avaliador esperava só o nome e não as demais infos.
        <div>
          <img src={ product.thumbnail } alt="Foto do Produto" />
          <h3>{` Preço R$${product.price}`}</h3>
        </div>
      )// assim dá pra mostrar a imagem e o preço do item. Poderia estar td na div do render, mas o teste não passa!
    );
    return (
      <>
        <div data-testid="product-detail-name">
          <h3>{`${match.params.title}`}</h3>
        </div>
        {details}
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          id={ match.params.title }
          onClick={ addToCart }
          name={ match.params.title }
        >
          Adicionar ao carrinho
        </button>
        <br />
        <Link
          to="/ShoppingCart"
          data-testid="shopping-cart-button" // do requisito 3
        >
          Carrinho de Compras
        </Link>
      </>
    );
  }
}

CardDetail.propTypes = { // td isso pra declarar as props e poder pegar o title pra usar na pagina.
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string, // props do macth - componente do route
      title: PropTypes.string, // props do macth - componente do route
    }),
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};
