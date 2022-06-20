import { useState, useEffect } from 'react';
import './style.scss';
import Logo from '../../Images/logo.png';
import { Link } from 'react-router-dom';


function Header() {
    const [dropdown, serDropdown] = useState("")
    const header = document.querySelector('header.main-header')

    const handleDropdown = () => {
        if (dropdown) {
            serDropdown("")
        } else {
            serDropdown("open-dropdown")
        }
    }

    window.addEventListener('resize', function (event) {
        if (window.matchMedia("(min-width: 700px)").matches && dropdown === "open-dropdown") {
            serDropdown("")
        }
    });

    return (
        <section className={`header ${dropdown}`}>
            <div>
                <section className="menu">
                    <button onClick={handleDropdown} className="menu-dropdown">menu</button>
                </section>
                <img className='logo' src={Logo} alt='Logo como nome Pokémon escrito' />
                <nav className='navbar-header'>
                    <ul className='navbar'>
                        <li className='navbar-item'><Link to='/'>Home</Link></li>
                        <li className='navbar-item'><Link to='/lista'>Pokemons</Link></li>
                        <li className='navbar-item'><Link to='/contato'>Contato</Link></li>
                    </ul>
                </nav>
            </div>
        </section>
    )
}

export default Header;
