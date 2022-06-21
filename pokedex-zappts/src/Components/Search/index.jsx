import React from 'react';

import './style.scss';

function Search({value, onChange}) {
    // Lida com input de pesquisa
    const handleChange = (event) => {
        onChange(event.target.value);
    }

  return (
      <section className="search">
          <input type="search" value={value} onChange={handleChange} placeholder="Pesquisar pokemon"/>
      </section>
  );
}

export default Search;
