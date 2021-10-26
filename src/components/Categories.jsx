import React from 'react';
//import { BrowserRouter, Route } from 'react-router-dom';
import { getCategories } from '../services/api';

export default class Categories extends React.Component {
  constructor() {
    super();

    this.state = {
      categoriesList: [],
    };

    componentDidMount = () => {
      this.categoriesList();
    };
    
    getCategories().then((callback) => this.setState({
      categoriesList: callback()
    })) 
  }
}
/* 4. Liste as categorias de produtos disponíveis via API na página principal
PRIORIDADE 1 - Listar filtros de categoria obtidos da API na tela principal, de listagem do produto. 
A requisição da API para recuperar as categorias deve ser feita uma única vez após o carregamento da tela.

Tela principal - Com a lista de categorias
Observações técnicas

Um endpoint da API do Mercado Livre retorna as categorias de produto disponíveis para busca. 
Em momento posterior tais categorias serão usadas para filtrar a listagem de produtos. 
Por hora, elas devem ser listadas na tela da listagem, conforme protótipo.

Adicione o atributo data-testid com o valor category nos elementos que possuem os nomes das categorias
O que será verificado:

  - Exibe as categorias retornadas pela API na página de listagem de produtos */