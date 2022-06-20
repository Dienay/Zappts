import { useState, useEffect } from 'react';
import axios from 'axios';

import './style.scss';

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";


function CardPokemon({pokeName}) {
  const [detailPokemon, setDetailPokemon] = useState([]);
  const [typePokemon, setTypePokemon] = useState([]);
  const [typeNamePokemon, setTypeNamePokemon] = useState("");
  const [imagePokemon, setImagePokemon] = useState([]);

  const getDetailPokemon = (pokeName) => {
    axios
      .get(`${baseUrl}${pokeName}`)
      .then(response => {
        setDetailPokemon(response.data);
        setTypePokemon(response.data.types);
        setImagePokemon(response.data.sprites.front_default);
        setTypeNamePokemon(response.data.types[0].type.name);
      })
      .catch(err => {
        console.log(err);
      })
  };

  useEffect(() => {
    getDetailPokemon(pokeName);
  },[])

  return (
    <section className={`card-pokemon ${ typeNamePokemon }`}>
      <h3>{ detailPokemon.name }</h3>
      <ul>
        {typePokemon.map(types => {
          return <li key={types.type.name} ><p>{types.type.name}</p></li>;
        })}
      </ul>
      <img src={ imagePokemon } alt="" />
    </section>
  );
}

export default CardPokemon;
