import { useState, useEffect } from 'react';
import axios from 'axios';

import './style.scss';

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

function DetailPokemon({ pokeName, showDetail, setPokeName, setShowDetail }) {
    const [detailPokemon, setDetailPokemon] = useState([]);
    const [typePokemon, setTypePokemon] = useState([]);
    const [typeTitle, setTypeTitle] = useState("");
    const [typeNamePokemon, setTypeNamePokemon] = useState('');
    const [imagePokemon, setImagePokemon] = useState([]);
    const [pokeId, setPokeId] = useState();
    const [pokeIdFormatted, setPokeIdFormatted] = useState();
    const [abilities, setAbilities] = useState([]);
    const [abilityTitle, setAbilityTitle] = useState("");

    const getDetailPokemon = (pokeName) => {
        axios
            .get(`${baseUrl}${pokeName}`)
            .then(response => {
                setDetailPokemon(response.data);
                setTypePokemon(response.data.types);
                setImagePokemon(response.data.sprites.other.dream_world.front_default);
                setTypeNamePokemon(response.data.types[0].type.name);
                setAbilities(response.data.abilities);
                setPokeId(response.data.id)
            })
            .catch(err => {
                console.log(err);
            })
    };

    useEffect(() => {
        if (pokeName) {
            getDetailPokemon(pokeName);
        }
        // getDetailPokemon("bulbasaur");
    }, [pokeName])

    useEffect(() => {
        if (pokeId) {
            const leftPad = (id) => {
                var length = 3 - id.toString().length + 1;
                return Array(length).join('0') + id;
            };

            setPokeIdFormatted(leftPad(pokeId))
        }
    }, [pokeId])

    // Fecha card com detalhes do Pokemon
    const closeDetailChange = () => {
        setImagePokemon([])
        setPokeName('')
        setShowDetail('')
    }

    return (
        <section className={`detail-pokemon ${showDetail}`}>
            <div className="container">
                <section className="close"><button className="close-detail" onClick={closeDetailChange}>close</button></section>
                <section className="content-detail">
                    <section className={`image-side ${typeNamePokemon}`}>
                        <img src={imagePokemon} alt={`Imagem do pokemon camado ${detailPokemon.name}`} />
                    </section>
                    <section className="detail-side">
                        <header>
                            <h3>{detailPokemon.name}</h3>
                            <p>#{pokeIdFormatted}</p>
                        </header>
                        <ul className="types">
                            <h4>Types</h4>
                            {typePokemon.map(types => {
                                return <li key={types.type.name} ><p>{types.type.name}</p></li>;
                            })}
                        </ul>
                        <ul>
                            <h4>Abilities</h4>
                            {abilities.map(ability => {
                                return <li key={ability.ability.name} ><p>{ability.ability.name}</p></li>;
                            })}
                        </ul>

                    </section>
                </section>
            </div>
        </section>
    );
}

export default DetailPokemon;
