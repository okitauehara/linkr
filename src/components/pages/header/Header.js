import styled from "styled-components";
import {IoChevronDown, IoChevronUp} from "react-icons/io5"
import {useState, useContext, useEffect } from "react"
import {useLocation} from "react-router"
import RenderMenu from "./RenderMenu";
import { Link } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import {DebounceInput} from 'react-debounce-input';
import { searchUser } from "../../../service/API";

export default function Header() {
    const {user} = useContext(UserContext);
    const location = useLocation().pathname;
    const [isActive, setIsActive] = useState(false);
    const toggle = () => setIsActive(!isActive);
    
    const [searchUserName, setSearchUserName] = useState('');
    const [userInfo, setUserInfo] = useState([]);

    useEffect (() => {
        setUserInfo(undefined)
        searchUser({ token: user.token, inputText: searchUserName})
            .then((resp) => {
             setUserInfo(resp.data.users)}) 
            .catch()
        
    }, [searchUserName, user.token]);  

    if(location === '/' || location === '/sign-up') {
        return <p></p>;
    }

    console.log(searchUserName);

    return (
        <HeaderContainer>
            <Link to="/timeline">
                <Title>linkr</Title>
            </Link>
            <Container>
            <DebounceInput
                    minLength={3}
                    debounceTimeout={300}
                    onChange={event => setSearchUserName(event.target.value)} placeholder="Search for people and friends"/>
                    {userInfo === undefined || searchUserName.length <=2 ? null : 
                    <SearchBar>

                    {userInfo.length === 0 ? <h2>Nenhum usuário encontrado</h2> : userInfo.map((user) =>( 
                            <Link onClick={() => setSearchUserName("")} 
                            to={`/user/${user.id}`}>
                                <SearchedUser>
                                <Img src={user.avatar} alt='' key={user.id}/><h3>{user.username}</h3> {user.isFollowingLoggedUser ? <h4>• following</h4> : null}
                                </SearchedUser>
                            </Link>))
                    }
                    </SearchBar>}
            </Container>
            <section onClick={toggle}>
                {isActive ? 
                    <IoChevronUp className="header-arrow"/> 
                    :
                    <IoChevronDown className="header-arrow"/>
                }
                <Img src={user.user.avatar} alt=''/> 
            </section>
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

    section {
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
     
        @media (max-width: 620px){
        margin-left: 0;
        display: none;
    }
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
`;

const SearchBar = styled.div`
       display: flex;
       flex-direction: column;
       cursor: default;
       width: 50vw;
       max-height: 400px;
       position: absolute;
       top: 45px;
       padding-top: 24px;
       padding-left: 17px;
       background-color: #E7E7E7;
       border-radius: 8px;  
       overflow-y: auto;
       overflow-x: auto;

    &::-webkit-scrollbar{
      width: 9px;
      height: 9px;
   }

    &::-webkit-scrollbar-thumb {
       border-radius: 20px; 
       border: 2px solid #8f96a3;
       background-color: #2f3237;
   }

   h2{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        padding: 20px 20px 25px 3px;
        color: #515151;
    }

   h3{
     padding-top: 14px;
     padding-left: 12px;
     color: #515151;
     font-weight: 400;
     font-size: 19px;
   }

   h4{
       padding-top: 14px;
       padding-left: 8px;
       color:#C5C5C5;
       font-weight: 400;
       font-size: 19px;
   }

`;

const SearchedUser = styled.div`
       display: flex;
       margin-bottom: 16px;
    
`;

 

