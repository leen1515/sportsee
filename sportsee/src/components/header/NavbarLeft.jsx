import styled from 'styled-components';
import barbell from '../../svg/barbell.svg';
import bike from '../../svg/bike.svg';
import swim from '../../svg/swim.svg';
import yoga from '../../svg/yoga.svg';

const MenuLeft = styled.aside`
    display:flex;
    flex-direction:column;
    justify-content:center;
    position: fixed;
    height: 100vh;
    background-color: #020203;
    width:100px;
    z-index:1;
`
const NavLeft = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    height:100vh;
    margin:-20px auto 0 auto;
`
const IconNavLeft = styled.img`
    flex:0.01;
    width: 50px;
    padding-bottom: 20px;
`
const Copyright = styled.div`
    bottom:90px;
    width:100%;
    height:fit-content;
    transform: rotate(-90deg);
    position: relative;
    white-space: nowrap;
    flex:1;
    font-size: 0.8em;
    color: white;
    z-index:1;
    margin:auto;
`
/** 
 * @namespace NavbarLeft
 * @function NavbarLeft
 * @description Defines a component `NavbarLeft`. it represents the structure and content of the left navigation menu.
 * @returns {JSX.Element} 
 */
function NavbarLeft(){
    return  <MenuLeft>
    <NavLeft>
        <IconNavLeft src={yoga} alt="Meditation" />
        <IconNavLeft src={swim} alt="Swimming" />
        <IconNavLeft src={bike} alt="Biking" />
        <IconNavLeft src={barbell} alt="Body-Building" />
    </NavLeft>
    <Copyright>Copyright SportSee 2020</Copyright>
</MenuLeft>

}

export default NavbarLeft;

