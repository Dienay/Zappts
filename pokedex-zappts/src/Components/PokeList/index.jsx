import { useState, useEffect } from 'react';
import axios from 'axios';

import CardPokemon from '../CardPokemon';

import './style.scss';
import Search from '../Search';
import DetailPokemon from '../DetailPokemon';

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

function Pokelist() {
    const [pokelist, setPokelist] = useState([]);
    const [text, setText] = useState('');
    const [typeFilter, setTypeFilter] = useState([])

    // Pagination
    const [currentUrl, setCurrentUrl] = useState(`${baseUrl}?limit=24`);
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    const [currentPage, setCurrenPage] = useState(1);
    const [showDetail, setShowDetail] = useState('');
    const [pokeName, setPokeName] = useState('');

    const openDetailChange = (pokeName) => {
        setPokeName(pokeName)
        setShowDetail('show')
        console.log("abre")
        console.log(pokeName)
        console.log(showDetail)
    }

    const closeDetailChange = () => {
        setPokeName('')
        setShowDetail('')
        console.log(showDetail)
    }

    useEffect(() => {
        axios
            .get(currentUrl)
            .then(response => {
                setPokelist(response.data.results);
                console.log(response.data.results);
                setNextUrl(response.data.next)
                setPrevUrl(response.data.previous)
            })
            .catch(err => {
                console.log(err);
            })
    }, [currentUrl]);

    function gotoNextPage() {
        if (currentPage < 7) {
            setCurrentUrl(nextUrl)
            setCurrenPage(currentPage + 1)
        }
    }

    function gotoPrevPage() {
        if (currentPage > 1) {
            setCurrentUrl(prevUrl)
            setCurrenPage(currentPage - 1)
        }
    }

    useEffect(() => {
        const pageList = document.querySelector('.page').children;

        for (let page of pageList) {
            const pageCurrent = parseInt(page.innerText)

            if (pageCurrent === currentPage) {
                page.classList.add('current-page')
            } else {
                page.classList.remove('current-page')
            }
        }
    }, [currentPage])

    useEffect(() => {
        if (text) {
            fetch(`${baseUrl}${text}`)
                .then((response) => response.json())
                .then((response) => {
                    setPokelist([response])
                })
        }
        if(!text) {
            axios
            .get(currentUrl)
            .then(response => {
                setPokelist(response.data.results);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }, [text])

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
