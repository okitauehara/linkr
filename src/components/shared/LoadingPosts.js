import styled from 'styled-components';
import Loader from "react-loader-spinner";

export default function LoadingPosts() {
    return (
        <LoadingComponent>
            <Loader type="Circles" color="#ffffff" height={40} width={40}/>
            <Status>Carregando mais posts...</Status>
        </LoadingComponent>
    );
};

const LoadingComponent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Status = styled.span`
    font-size: 25px;
    color: #ffffff;
    margin-top: 10px;
`;