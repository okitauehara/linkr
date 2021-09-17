import styled from "styled-components";


const ContainerStyle = styled.div`
    margin-top: 132px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;

    .user-header { 
        width: 611px;
        padding-left: 18px;
        display: flex;
        align-items: center;
        color: white;
        font-family: 'Oswald', sans-serif;
        font-size: 43px;
        margin-bottom: 43px;
    }   
    .user-header img {
        object-fit: cover;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 18px;
    }
    .posts-empty {
        margin-top: 43px;
        font-size: 43px;
        color: white;
    }

    @media (max-width: 620px) {
        margin-top: 50px;

        .user-header {
            width: 100vw;
            font-size: 33px;
        }
    }
`

export default ContainerStyle;