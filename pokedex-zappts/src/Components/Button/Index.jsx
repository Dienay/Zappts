import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

function Button() {
  return (
    <section className="button">
        <Link to='/lista'>Veja os pokemons</Link>
    </section>
  );
}

export default Button;
