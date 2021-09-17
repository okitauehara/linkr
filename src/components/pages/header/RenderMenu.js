import {Link} from "react-router-dom";
import styled from "styled-components";
import onClickOutside from "react-onclickoutside";


function RenderMenu({setIsActive}) {
    RenderMenu.handleClickOutside = () => setIsActive(false);
    return(
        <Menu>
            <Link to='/my-posts' onClick={() => {setIsActive(false)}}> My posts </Link>
            <Link to='/my-likes' onClick={() => {setIsActive(false)}}>My likes</Link>
            <Link to='/' onClick={() => {
                localStorage.setItem('@localdata', null);
                setIsActive(false)
                }}>Logout</Link>
        </Menu>
    );
}   

const clickOutsideConfig = {
    handleClickOutside: () => RenderMenu.handleClickOutside
};
      
export default onClickOutside(RenderMenu, clickOutsideConfig);


const Menu = styled.div `
    background-color: #171717;
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

    a {
        font-weight: bold;
        font-size: 17px;
        cursor: pointer;
        color: white;
        text-decoration: none;
    }
`;