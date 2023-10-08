import styled from 'styled-components';
import { useContext } from 'react';
import { datasContext } from '../../routes/GetRoutes';
import BarChart from '../../components/Barchart';
import Linechart from '../../components/Linechart';
import Radarchart from '../../components/Radarchart';
import Radialchart from '../../components/Radialchart';
import CardsInfos from '../../components/CardsInfos';

const MainProfil = styled.main`
    position:absolute;
    display:flex;
    flex-direction:column;
    width: calc(100% - 117px);
    height:100%;
    top:91px;
    left:117px;
`

const MainGroup = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    flex-wrap:wrap;
    width:100%;
    height:100%;
`

const UserCard = styled.div`
width:100%;
`
const UserName = styled.div`
    color: red;
    font-size: 50px;
    width:100%;
    white-space:nowrap;
`

const Bienvenue = styled.p`
    color: #000000;
    font-size: 50px;
`

function Profil() {
    const { datas } = useContext(datasContext);

    const userName = {firstName : datas?.userDatas.userInfos.firstName, lastName : datas?.userDatas.userInfos.lastName}
    if (!datas) return null;
    return <MainProfil>
        <UserCard>
            <UserName>
            {<span><Bienvenue>Bonjour</Bienvenue> {(userName.firstName)}
            </span>}      
            </UserName>
        </UserCard>
        <MainGroup>
            <BarChart />
            <Linechart />
            <Radarchart />
            <Radialchart/>
        </MainGroup>
        <CardsInfos/>
    </MainProfil>;
}

export default Profil;
