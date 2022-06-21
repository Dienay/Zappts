import { useState, useEffect } from 'react';
import axios from 'axios';

import CardPokemon from '../CardPokemon';

import './style.scss';
import Search from '../Search';
import DetailPokemon from '../DetailPokemon';

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

function Pokelist() {
    // Quantidade de Pokemons por página
    const limit = 24;

    // Lista de Pokemons
    const [pokelist, setPokelist] = useState([]);

    // Pesquisa Pokemon
    const [text, setText] = useState('');

    // Usado par pegar detalhes do Pokemon
    const [showDetail, setShowDetail] = useState('');
    const [pokeName, setPokeName] = useState('');

    // Variáveis para lidar com paginação
    const [currentPage, setCurrenPage] = useState(1);
    const [offset, setOffset] = useState(0);

    // Abre card com detalhes do Pokemon
    const openDetailChange = (pokeName) => {
        setPokeName(pokeName)
        setShowDetail('show')
    }

    // Fecha card com detalhes do Pokemon
    const closeDetailChange = () => {
        setPokeName('')
        setShowDetail('')
    }

    // Carrega Lista de Pokemons
    useEffect(() => {
        axios
            .get(`${baseUrl}?offset=${offset}&limit=${limit}`)
            .then(response => {
                setPokelist(response.data.results);
            })
            .catch(err => {
                console.log(err);
            })
    }, [currentPage, offset]);

    // Vai para a página seguinte
    function gotoNextPage() {
        if (currentPage < 7) {
            setOffset(offset + limit)
            setCurrenPage(currentPage + 1)
        }
    }


    // Vai para a página anterior
    function gotoPrevPage() {
        if (currentPage > 1) {
            setOffset(offset - limit)
            setCurrenPage(currentPage - 1)
        }
    }

    // Lida com lista para paginação
    useEffect(() => {
        // Carrega lista numerade de páginas
        const pageList = document.querySelector('.page');

        // Aguarda elemento ser clicado para carregar página correspondente
        pageList.addEventListener('click', (e) => {
            const currentPage = parseInt(e.target.innerText)
            setCurrenPage(currentPage)
            setOffset((currentPage - 1) * limit)
        })

        //Indica na lista a página atual da lista
        for (let page of pageList.children) {
            const pageCurrent = parseInt(page.innerText)

            if (pageCurrent === currentPage) {
                page.classList.add('current-page')
            } else {
                page.classList.remove('current-page')
            }
        }
    }, [currentPage])

    // Lida com pesquisa de Pokemons
    useEffect(() => {
        // Procura pokemon através do nome digitado no input
        if (text) {
            fetch(`${baseUrl}${text}`)
                .then((response) => response.json())
                .then((response) => {
                    setPokelist([response])
                })
        }
        // Responsável por mostrar lista de pokemons apoś o nonme ser apagado do input
        if (!text) {
            axios
                .get(`${baseUrl}?offset=${offset}&limit=${limit}`)
                .then(response => {
                    setPokelist(response.data.results);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [text, offset])

    return (
        <section>
            <Search
                value={text}
                onChange={(search) => setText(search)} />
            <ul className="pokelist">
                {pokelist && pokelist.map(pokemon => {
                    return (
                        <li key={pokemon.name} onClick={() => { openDetailChange(pokemon.name) }}>
                            <CardPokemon pokeName={pokemon.name} />
                        </li>
                    )
                })}
            </ul>
            <DetailPokemon
                showDetail={showDetail}
                closeDetailChange={closeDetailChange}
                pokeName={pokeName}
            />
            <section className="pagination">
                {gotoPrevPage && <button className="previous" onClick={gotoPrevPage}>Previous</button>}
                <ul className="page">
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                </ul>
                {gotoNextPage && <button className="next" onClick={gotoNextPage}>Next</button>}
            </section>
        </section>
    );
}

export default Pokelist;
