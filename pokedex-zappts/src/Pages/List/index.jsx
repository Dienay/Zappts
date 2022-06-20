import React from 'react';
import Header from '../../Components/Header';
import Pokelist from '../../Components/PokeList';

import './style.scss';

function List() {
  return (
      <section className="list-page">
          <Header />
          <Pokelist />
      </section>
  );
}

export default List;
