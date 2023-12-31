import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import sportSeeIcon from '../../svg/logo.svg';

const Navbar = styled.ul`
    position:fixed;
    left:0;
    width:100%;
    z-index: 2;
    display: flex;
    justify-content: flex-start;
    column-gap:calc(20% - 250px);
    flex-flow: row nowrap;
    align-items: center;
    list-style: none;
    background-color: #020203;
    color: white;
    padding:0 25px;
    margin: auto;
    height:70px;`

const NavLinkStyle = styled(NavLink)`
    width:250px;
    color: white;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    text-decoration:none;
`
const SportSeeLogo = styled.img`
    margin-top:10px;
    padding:10px;
    cursor: pointer;
`
/** 
 * @namespace NavbarTop
 * @function NavbarTop
 * @description It represents the structure and content of the top navigation menu.
 * @returns {JSX.Element} 
 */

function NavbarTop(){
    return <Navbar>
        <NavLinkStyle to="/">
                <SportSeeLogo src={sportSeeIcon} alt=""/>
            </NavLinkStyle>
            <NavLinkStyle to="/">Accueil</NavLinkStyle>
            <NavLinkStyle to="/profil">Profil</NavLinkStyle>
            <NavLinkStyle to="/reglages">Réglage</NavLinkStyle>
            <NavLinkStyle to="/communaute">Communauté</NavLinkStyle>
        </Navbar>
}



export default NavbarTop;