import styled from "styled-components";
import Profile from "../../../assets/hidethepainharold.jpg";

export default function PublishPost() {
    return (
        <Container>
            <ProfileImg src={Profile}></ProfileImg>
            <PublishForm>
                <Title>O que você tem pra favoritar hoje?</Title>
                <Input type='url' placeholder='http://...'></Input>
                <TextArea placeholder='Muito irado esse link falando de #javascript'></TextArea>
                <Submit>Publicar</Submit>
            </PublishForm>
        </Container>
    );
}

const Container = styled.section`
    width: 575px;
    height: 173px;
    background-color: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 18px;

    @media (max-width: 620px) {
        width: 100%;
        height: auto;
        border-radius: 0px;
        padding: 0px;
        justify-content: center;
    }
`;

const ProfileImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    margin-right: 18px;

    @media (max-width: 620px) {
        display: none;
    }
`;

const PublishForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 20px;
    font-weight: 300;
    color: #707070;
    margin-bottom: 10px;

    @media (max-width: 620px) {
        width: 100vw;
        text-align: center;
        margin-top: 10px;
    }
`;

const Input = styled.input`
    width: 493px;
    height: 30px;
    font-family: 'Lato', sans-serif;
    background-color: #efefef;
    border: none;
    border-radius: 5px;
    outline: none;
    margin-bottom: 5px;
    padding-left: 10px;
    display: flex;

    &::placeholder {
        font-family: 'Lato', sans-serif;
        font-size: 15px;
        font-weight: 300;
        color: #949494;
    }

    @media (max-width: 620px) {
        width: auto;
        margin: 0px 15px 5px 15px;
    }
`;

const TextArea = styled.textarea`
    width: 493px;
    height: 56px;
    font-family: 'Lato', sans-serif;
    background-color: #efefef;
    border: none;
    border-radius: 5px;
    outline: none;
    margin-bottom: 5px;
    padding-left: 10px;
    padding-top: 10px;
    display: flex;
    resize: none;

    &::placeholder {
        font-family: 'Lato', sans-serif;
        font-size: 15px;
        font-weight: 300;
        color: #949494;
    }

    @media (max-width: 620px) {
        width: auto;
        margin: 0px 15px 5px 15px;
    }
`;

const Submit = styled.button`
    width: 112px;
    height: 31px;
    background-color: #1877f2;
    border: none;
    border-radius: 5px;
    align-self: flex-end;
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;

    &:hover {
        cursor: pointer;
        filter: brightness(1.1);
    }

    @media (max-width: 620px) {
        height: 22px;
        margin-bottom: 10px;
        margin-right: 15px;
    }
`;