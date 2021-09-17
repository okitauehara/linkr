import styled from "styled-components";


export default function Trending(){

    return(
            <TrendingContainer>
                <TrendingTitle>trending</TrendingTitle>
                <TrendingList>
                    <Item>#javascript</Item>
                    <Item>#react</Item>
                    <Item>#html</Item>
                    <Item>#sql</Item>
                    <Item>#node</Item>
                    <Item>#material</Item>
                </TrendingList>
            </TrendingContainer>
    )
};

const TrendingContainer = styled.div`
    width: 301px;
    height: 406px;
    background-color: #171717;
    border-radius: 16px;
    margin-top: 215px;
    margin-left: 25px;
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
`;