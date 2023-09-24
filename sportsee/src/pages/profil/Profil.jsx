import styled from 'styled-components';
import { useContext } from 'react';
import { datasContext } from '../../routes/GetRoutes';
import BarChart from '../../components/Barchart';
import Linechart from '../../components/Linechart';

const MainProfil = styled.main`
    position:absolute;
    top:91px;
    left:117px;
`
const UserCard = styled.div`

`
const UserName = styled.h2`
    color: red;
    font-size: 50px;
`

const Bienvenue = styled.p`
    color: #000000;
    font-size: 50px;
`

function Profil() {
    const {datas} = useContext(datasContext);
    const userName = {firstName : datas?.userDatas.userInfos.firstName, lastName : datas?.userDatas.userInfos.lastName}
    console.log("dataaaa PRofil", datas?.userDatas.userInfos)

    return <MainProfil>
        <UserCard>
            <UserName>
            {datas && <span><Bienvenue>Bonjour</Bienvenue> {JSON.stringify(userName.firstName)?.includes('Mocked')
            ? (userName.firstName.split('-Mocked'))
            : (userName.firstName)}
            </span>}      
            </UserName>
        </UserCard>
        <BarChart />
        <Linechart />
    </MainProfil>
}

export default Profil;
