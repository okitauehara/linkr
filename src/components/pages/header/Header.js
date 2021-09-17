import styled from "styled-components";
import {IoChevronDown, IoChevronUp} from "react-icons/io5"
import userContext from "../../../contexts/UserContext"
import {useState, useContext, useEffect} from "react"
import {useLocation, useHistory} from "react-router"
import onClickOutside from "react-onclickoutside";

function Header() {
    const {user, setUser} = useContext(userContext);
    const location = useLocation().pathname;
    const [isActive, setIsActive] = useState(false);
    const history = useHistory();
    const toggle = () => setIsActive(!isActive);
    
    Header.handleClickOutside = () => setIsActive(false);
    function renderMenu() {
        return(
            <Ul>
                <li onClick={() => {
                    history.push('/my-posts')
                    toggle();
                    }}> My posts </li>
                <li onClick={() => {
                    history.push('/my-likes')
                    toggle();
                    }}>My likes</li>
                <li onClick={() => {
                    localStorage.setItem('@localdata', null);
                    toggle();
                    setUser({});
                    history.push('/');
                    }}>Logout</li>
            </Ul>
        );
    }
    if(location === '/' || location === '/sign-up') {
        return <p></p>;
    }
    return (
        <HeaderContainer>
            <Title>linkr</Title>
            <div onClick={toggle}>
                {isActive ? 
                    <IoChevronUp className="header-arrow"/> 
                    :
                    <IoChevronDown className="header-arrow"/>
                }
                <Img src={user.user.avatar} alt=''/> 
            </div>
            {isActive ? renderMenu() : null}
        </HeaderContainer>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => Header.handleClickOutside
};
  
export default onClickOutside(Header, clickOutsideConfig);

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
    padding: 0 17px 0 28px;
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

const Ul = styled.ul `
    background-color: inherit;
    color: white;
    width: 130px;
    height: 120px;
    position: fixed;
    right: 0;
    top: 72px;
    border-radius: 0 0 0 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-bottom: 12px;

    li {
        font-weight: bold;
        font-size: 17px;
        cursor: pointer;
    }
`;