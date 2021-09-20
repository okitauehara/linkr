import styled from "styled-components";
import {IoChevronDown, IoChevronUp} from "react-icons/io5"
import userContext from "../../../contexts/UserContext"
import {useState, useContext, } from "react"
import {useLocation} from "react-router"
import RenderMenu from "./RenderMenu";
import { Link } from "react-router-dom";

export default function Header() {
    const {user} = useContext(userContext);
    const location = useLocation().pathname;
    const [isActive, setIsActive] = useState(false);
    const toggle = () => setIsActive(!isActive);
    
    if(location === '/' || location === '/sign-up') {
        return <p></p>;
    }
    return (
        <HeaderContainer>
            <Link to="/timeline">
                <Title>linkr</Title>
            </Link>
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
