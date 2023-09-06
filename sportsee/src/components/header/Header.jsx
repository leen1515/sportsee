import NavbarTop from "./NavbarTop";
import NavbarLeft from "./NavbarLeft";
import { styled } from "styled-components";
const HeaderMenu = styled.div`
    position:relative;
    height:100%;
`

function HeaderComponents(){
    return <HeaderMenu>
    <NavbarTop></NavbarTop>
    <NavbarLeft></NavbarLeft>
    </HeaderMenu>
}



export default HeaderComponents;