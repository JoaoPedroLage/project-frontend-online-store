import '../index.css';
import React from 'react';

export default class Loading extends React.Component {
  render() {
    return (
      <h1 data-testid="loading" className="cards">Carregando...</h1>
    );
  }
}
