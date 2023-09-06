import styled from 'styled-components';
import barbell from '../../svg/barbell.svg';
import bike from '../../svg/bike.svg';
import swim from '../../svg/swim.svg';
import yoga from '../../svg/yoga.svg';

const MenuLeft = styled.aside`
    top:-90px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    position: relative;
    height: 100vh;
    background-color: #020203;
    width:117px;
    z-index:1;
`
const NavLeft = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    height:100vh;
    margin:auto;
`
const IconNavLeft = styled.img`
    flex:0.01;
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

