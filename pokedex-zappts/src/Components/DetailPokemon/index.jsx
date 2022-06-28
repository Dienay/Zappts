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

    const [attack, setAttack] = useState();
    const [defense, setDefense] = useState();
    const [speed, setSpeed] = useState();

    useEffect(() => {
        if (pokeName) {
            axios
                .get(`${baseUrl}${pokeName}`)
                .then(response => {
                    setDetailPokemon(response.data);
                    setTypePokemon(response.data.types);
                    setImagePokemon(response.data.sprites.other.dream_world.front_default);
                    setTypeNamePokemon(response.data.types[0].type.name);
                    setAbilities(response.data.abilities);
                    setPokeId(response.data.id)
                    setAttack(detailPokemon.stats[1].base_stat)
                    setDefense(detailPokemon.stats[2].base_stat)
                    setSpeed(detailPokemon.stats[5].base_stat)
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }, [pokeName, detailPokemon.stats])

    // Lida com títulos de tipo e abilidades
    useEffect(() => {
        if (typePokemon.length === 1) {
            setTypeTitle("Tipo")
        } else {
            setTypeTitle("Tipos")
        }

        if (abilities.length === 1) {
            setAbilityTitle("Abilidade")
        } else {
            setAbilityTitle("Abilidades")
        }
    }, [typePokemon, abilities])

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
                            <h3 className="name">{detailPokemon.name}</h3>
                            <p className="id">#{pokeIdFormatted}</p>
                        </header>
                        <ul className="types list-detail">
                            <h4>{typeTitle}</h4>
                            {typePokemon.map(types => {
                                return (
                                    <li key={types.type.name} >
                                        <p>{types.type.name}</p>
                                    </li>
                                )
                            })}
                        </ul>
                        <ul className="abilities list-detail">
                            <h4>{abilityTitle}</h4>
                            {abilities.map(ability => {
                                return <li key={ability.ability.name} ><p>{ability.ability.name}</p></li>;
                            })}
                        </ul>
                        <ul className="stats list-detail">
                            <h4>Características</h4>
                            <li>Peso: {detailPokemon.weight} Kg</li>
                            <li>
                                <label for="attack-progress">Ataque: {attack}</label>
                                <progress id="attack-progress" min="0" max="200" value={attack}>{attack}</progress>
                            </li>
                            <li>
                                <label for="defense-progress">Defesa: {defense}</label>
                                <progress id="defense-progress" max="250" value={defense}></progress>
                            </li>
                            <li>
                                <label for="speed-progress">Velocidae: {speed}</label>
                                <progress id="speed-progress" max="200" value={speed}></progress>
                            </li>
                        </ul>
                    </section>
                </section>
            </div>
        </section>
    );
}

export default DetailPokemon;
