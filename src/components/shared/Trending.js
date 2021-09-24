import styled from "styled-components";
import { useContext, useState } from "react";
import UserContext from '../../contexts/UserContext';
import { Link, useHistory } from 'react-router-dom';
import Loading from "./Loading";
import { getHashtag } from "../../service/API";
import Swal from "sweetalert2";

export default function Trending(){

    const { user, hashList } = useContext(UserContext);
    const [hashtag, setHashtag] = useState('');
    const history = useHistory();

    function pressedKey(event) {
        if(event.keyCode === 13) {
            searchHashtag();
        }
    }

    function searchHashtag() {
        getHashtag({ token: user.token, hashtag: hashtag })
            .then(() => {
                setHashtag('');
                history.push(`/hashtag/${hashtag}/posts`)
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Ops...",
                    text: "Houve uma falha ao carregar os posts dessa hashtag, por favor atualize a página"
                })
            });
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
            <SearchHashtagInput
                onKeyDown={(event) => pressedKey(event)}
                value={hashtag}
                onChange={(event) => setHashtag(event.target.value)}
                placeholder={"type a hashtag"}>
            </SearchHashtagInput>
            <FloatHashtag>#</FloatHashtag>
        </TrendingContainer>
    )
};

const TrendingContainer = styled.div`
    width: 301px;
    height: 435px;
    background-color: #171717;
    border-radius: 16px;
    margin-top: 215px;
    margin-left: 25px;
    padding: 15px;
    position: relative;
    
    @media (max-width: 960px){
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
`;

const TrendingList = styled.ul`
    padding-top: 15px;
`;

const Item = styled.li`
    font-size: 19px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 10px;
    word-break: break-word;
    cursor: pointer;
`;

const SearchHashtagInput = styled.input`
    font-family: 'Lato', sans-serif;
    width: 100%;
    height: 35px;
    background-color: #252525;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding-left: 30px;
    outline: none;

    &::placeholder {
        font-family: 'Lato', sans-serif;
        font-size: 16px;
        font-style: italic;
        color: #575757;
    }
`;

const FloatHashtag = styled.span`
    font-size: 19px;
    font-weight: 700;
    position: absolute;
    color: #ffffff;
    bottom: 27px;
    left: 25px;
`;