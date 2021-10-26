import React from 'react';
import { getCategories } from '../services/api';

export default class Categories extends React.Component {
  constructor() {
    super();

    this.state = {
      categoriesList: [],
    };

    this.onGetCategoriesList = this.onGetCategoriesList.bind(this);
  }

  componentDidMount() {
    this.onGetCategoriesList();
  }

  async onGetCategoriesList() {
    const categoriesList = await getCategories();
    const categoryName = categoriesList.map((element) => (
      (
        <div key={ element.id }>
          <label
            key={ element.id }
            htmlFor={ element.name }
          >
            <input
              type="radio"
              data-testid="category"
              id={ element.id }
              name={ element.name }
              onChange={ this.handleCategoriesList }
            />
            { element.name }
          </label>
        </div>
      )));
    this.setState({
      categoriesList: categoryName,
    });
  }

  render() {
    const { categoriesList } = this.state;

    return (
      <div>
        <aside>
          Categorias
          {categoriesList}
        </aside>
      </div>
    );
  }
}
