import NavbarTop from "./NavbarTop";
import NavbarLeft from "./NavbarLeft";
import { styled } from "styled-components";

const HeaderMenu = styled.div`
    position:relative;
    height:100%;
`
/**
 * @namespace HeaderComponents
 * @function HeaderComponents
 * @description it renders a header menu with top navbar
 * and left navbar.
 * @returns {JSX.Element} a header menu component.
 */

function HeaderComponents(){
    return <HeaderMenu>
    <NavbarTop></NavbarTop>
    <NavbarLeft></NavbarLeft>
    </HeaderMenu>
}



export default HeaderComponents;