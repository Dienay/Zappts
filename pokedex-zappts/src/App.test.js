import {
    render,
    fireEvent,
    screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import "@testing-library/jest-dom/extend-expect";
import App from './App';
import PokeList from './Components/PokeList/index';

import axios from "axios";

describe('Renderização de telas', () => {
    test('Renderizar tela Inicial', () => {
        render(<App />);
        expect(screen.getByText('Qual pokemon você escolheria?')).toBeInTheDocument();
    })
})

describe('Navegar entre Telas', () => {
    test('Navegar até tela contato', () => {
        render(<App />);

        fireEvent.click(screen.getByText('Contato'))

        expect(screen.getByText('Contato dos Pokemons')).toBeInTheDocument()
    })

    test('Navegar até tela de Lista de Pokemons', () => {
        render(<App />);

        fireEvent.click(screen.getByText('Pokemons'))

        expect(screen.getByPlaceholderText('Pesquisar pokemon')).toBeInTheDocument()
    })
})

describe('Renderização Lista de Pokemons', () => {
    test('Renderizar Lista', async () => {
        render(<PokeList />);

        const data = {
            "results": [
                {
                "name": "bulbasaur",
                "url": "https://pokeapi.co/api/v2/pokemon/1/"
                },
                {
                "name": "ivysaur",
                "url": "https://pokeapi.co/api/v2/pokemon/2/"
                }
            ]
        }
        axios.get = jest.fn().mockResolvedValue(data);
        expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    })
})
