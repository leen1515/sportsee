// import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';


function NavbarTop(){
    return <ul>
            <NavLink to="/">Accueil</NavLink>
            <NavLink to="/profil">Profil</NavLink>
            <NavLink to="/reglages">Réglages</NavLink>
            <NavLink to="/communaute">Communauté</NavLink>
        </ul>
}



export default NavbarTop;