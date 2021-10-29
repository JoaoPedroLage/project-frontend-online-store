import React from 'react';
import PropTypes from 'prop-types';
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
    this.setState({
      categoriesList,
    });
  }

  render() {
    const { categoriesList } = this.state;
    const { handleCategoriesList } = this.props;
    return (
      <div>
        <aside>
          Categorias
          {categoriesList.map((element) => (
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
                    name="categoriesName"
                    onChange={ handleCategoriesList }
                  />
                  { element.name }
                </label>
              </div>
            )))}
        </aside>
      </div>
    );
  }
}

Categories.propTypes = {
  handleCategoriesList: PropTypes.func.isRequired,
};
