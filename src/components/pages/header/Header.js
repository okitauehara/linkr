import styled from "styled-components";
import {IoChevronDown, IoChevronUp} from "react-icons/io5"
import {useState, useContext, useEffect} from "react"
import {useLocation} from "react-router"
import RenderMenu from "./RenderMenu";
import { Link } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import {DebounceInput} from 'react-debounce-input';
import Swal from "sweetalert2";
import { searchUser } from "../../../service/API";

export default function Header() {
    const {user} = useContext(UserContext);
    const location = useLocation().pathname;
    const [isActive, setIsActive] = useState(false);
    const toggle = () => setIsActive(!isActive);
    
    const [searchUserName, setSearchUserName] = useState();
    const [userInfo, setUserInfo] = useState('');

    useEffect (() => {
        searchUser({ token: user.token, inputText: searchUserName})
            .then((r) => setUserInfo(r.data))
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Ops...",
                    text: "Houve uma falha ao obter os posts, por favor atualize a página"
                })
            })
    }, [searchUserName]);  

    // console.log(userInfo.users[0].username);
    //o map vai passar por cada um desse de cima e vai renderizar as paradas, ou seja , o map tem que ter map.userInfo.users (eu acho)

    if(location === '/' || location === '/sign-up') {
        return <p></p>;
    }

    return (
        <HeaderContainer>
            <Link to="/timeline">
                <Title>linkr</Title>
            </Link>

            {/* <input type='text' onChange={(event) => setUserName(event.target.value)} value={userName}/> */}
            <Container>
            <DebounceInput
                    minLength={3}
                    debounceTimeout={300}
                    onChange={event => setSearchUserName(event.target.value)} placeholder="Search for people and friends" />
                    <searchBar className="searchUserBox">
                        <Img src='https://www.futcards.com.br/wp-content/uploads/2018/10/fred-fluminense-1-300x300.jpg' alt=''/>
                        <h3>Juan</h3><h4>• following</h4>
                    </searchBar>
            </Container>
            <div onClick={toggle}>
                {isActive ? 
                    <IoChevronUp className="header-arrow"/> 
                    :
                    <IoChevronDown className="header-arrow"/>
                }
                <Img src={user.user.avatar} alt=''/> 
            </div>
            {isActive ? <RenderMenu setIsActive={setIsActive}/> : null}
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    height: 72px;
    background-color: #151515;
    padding: 0 28px;
    user-select: none;

    div {
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .header-arrow {
        color: white;
        margin-right: 8px;
        font-size: 30px;
    }

    input{
        width: 50vw;
        height: 45px;
        border-radius: 8px;
        font-size: 19px;
        padding-left: 17px;
        z-index: 9;
        border: 0 none;
        outline: 0;
    }

    input::placeholder{
        color:#c6c6c6;
       
    }

    @media (max-width: 620px) {
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

    }
`;

const Title = styled.span`
    font-family: 'Passion One', cursive;
    font-size: 49px;
    font-weight: bold;
    color: white;
`;

const Img = styled.img `
    object-fit: cover;
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

 const Container = styled.div`
   display: flex ;
   flex-direction: column;

    .searchUserBox {
       display: flex;
       text-align: center;
       cursor: default;
       width: 50vw;
       height: 200px;
       position: absolute;
       top: 45px;
       padding-top: 24px;
       padding-left: 17px;
       background-color: #E7E7E7;
       border-radius: 8px;       
   }
   h3{
     padding-top: 14px;
     padding-left: 12px;
   }
   h4{
       padding-top: 14px;
       padding-left: 8px;
       color:#C5C5C5;
   }
 `;