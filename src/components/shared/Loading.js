import styled from 'styled-components';
import Loader from "react-loader-spinner";

export default function Loading() {
    return (
        <LoadingComponent>
            <Loader type="Circles" color="#ffffff" height={80} width={80}/>
            <Status>Carregando...</Status>
        </LoadingComponent>
    );
};

const LoadingComponent = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Status = styled.span`
    font-size: 35px;
    color: #ffffff;
    margin-top: 10px;
`;