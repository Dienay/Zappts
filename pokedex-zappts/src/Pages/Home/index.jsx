import React from 'react';

import Button from '../../Components/Button/Index';
import Header from '../../Components/Header';
import Banner from '../../Images/banner.png'

import './style.scss';

function Home() {
  return (
  <>
    <Header />
    <section className="main">
        <div>
          <h1>Qual pokemon você escolheria?</h1>
          <p>Você pode saber o tipo de Pokémon, seus pontos fortes, fracos e habilidades.</p>
          <Button />
        </div>
        <picture>
          <img src={Banner} alt="Imagem com pokebolas, nuvens e um pikachu" />
        </picture>
    </section>
  </>
  );
}

export default Home;
