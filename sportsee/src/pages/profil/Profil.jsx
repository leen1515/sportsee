import styled from 'styled-components';
import { useContext, useState, useEffect} from 'react';
import { datasContext } from '../../routes/GetRoutes';

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
    const {datas, set} = useContext(datasContext);
    const [infosUser, setInfosUser] = useState([null]);

    useEffect(() => setInfosUser(datas.getDatasUserInfos().getUserInfos()), [datas, setInfosUser, set])

    return <MainProfil>
        <UserCard>
            <UserName>
            {infosUser && <span><Bienvenue>Bonjour</Bienvenue> {JSON.stringify(infosUser?.firstName)?.includes('Mocked')
            ? (infosUser?.firstName?.split('-Mocked'))
            : (infosUser?.firstName)}
            </span>}      
            </UserName>
        </UserCard>
    </MainProfil>
}

export default Profil;
