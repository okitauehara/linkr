import styled from "styled-components";
import { useLocation } from 'react-router';
import { useContext } from "react";
import UserContext from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import Loading from "./Loading";


export default function Trending(){

    const {hashList} = useContext(UserContext);
    

    const location = useLocation().pathname
    if(location === '/' || location === '/sign-up'){
        return false
    }

      


    return(
        <TrendingContainer>
        <TrendingTitle>trending</TrendingTitle>
        {hashList.length === 0 ? <Loading /> :
        <TrendingList >
            {hashList.hashtags.map((hashtag, index) => (
                <Link key={index} to={`/hashtag/${hashtag.name}/posts`}>
                    <Item >#{hashtag.name}</Item>
                </Link>
            ))}
        </TrendingList>}
    </TrendingContainer>
    )
};

const TrendingContainer = styled.div`
    width: 301px;
    height: 415px;
    background-color: #171717;
    border-radius: 16px;
    margin-top: 215px;
    margin-left: 25px;
    
    @media (max-width: 620px){
        margin-left: 0;
        display: none;
        
    }
`;

const TrendingTitle = styled.h1`
    font-family: 'Oswald', sans-serif;
    font-size: 27px;
    line-height: 61px;
    border-bottom: 1px solid #484848;
    color: #fff;
    padding-left: 15px;
`;

const TrendingList = styled.ul`
    padding: 15px;
`;

const Item = styled.li`
    font-size: 19px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 10px;
    word-break: break-word;
`;