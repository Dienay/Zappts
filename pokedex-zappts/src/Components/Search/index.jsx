import React from 'react';

import './style.scss';

function Search({value, onChange, search}) {
    const handleChange = (event) => {
        onChange(event.target.value);
    }

  return (
      <section className="search">
          <input type="search" value={value} onChange={handleChange} />
      </section>
  );
}

export default Search;
