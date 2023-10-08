import styled from 'styled-components';
import { useContext } from 'react';
import { datasContext } from '../../routes/GetRoutes';
import BarChart from '../../components/Barchart';
import Linechart from '../../components/Linechart';
import Radarchart from '../../components/Radarchart';
import Radialchart from '../../components/Radialchart';
import CardsInfos from '../../components/CardsInfos';

const MainProfil = styled.main`
    position:relative;
    margin:auto;
    display:flex;
    flex-direction:column;
    white-space: break-spaces;
    width: calc(100% - 117px);
    max-width: 2000px;
    height:100%;
    max-height: 900px;
    top:50px;
    left:70px;
`
const Container = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    height:100%;
    justify-content:flex-start;
`
const MainContainerGraphic = styled.div`
    width:100%;
    padding:0;
    margin:0;
    display:flex;
    flex-direction:column;
`

const MainGroup = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:flex-start;
    flex-wrap:nowrap;
    margin-top: -20px;
    width:80%;
    height:fit-content;
`

const UserCard = styled.div`
    width:100%;
    font-size:50px;
`
const UserName = styled.div`
    color: red;
    font-size: 50px;
    width:100%;
    white-space:nowrap;
`

const Bienvenue = styled.p`
    color: #000000;
    font-size: 25px;
    padding:0;
    margin:50px 0 0 0;

    & span{
        color: red;
    }
`
const Sentence = styled.p`
    align-self: flex-start;
    font-size: 12px;
    color:black;
    padding:0;
`

function Profil() {
    const { datas } = useContext(datasContext);
    const levelSentence = "Félicitation ! Vous avez explosé vos objectifs hier 👏";
    const userName = { firstName: datas?.userDatas.userInfos.firstName, lastName: datas?.userDatas.userInfos.lastName }
    if (!datas) return null;
    return <MainProfil>
        <UserCard>
            <UserName>
                <Bienvenue>Bonjour <span>{(userName.firstName)}
                </span></Bienvenue>
                <Sentence>{levelSentence}</Sentence>
            </UserName>
        </UserCard>
        <Container>
            <MainContainerGraphic>
                <BarChart />
                <MainGroup>
                    <Linechart />
                    <Radarchart />
                    <Radialchart />
                </MainGroup>
            </MainContainerGraphic>
            <CardsInfos />
        </Container>

    </MainProfil>;
}

export default Profil;
