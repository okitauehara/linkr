import { useState } from "react";
import { createPost, getPosts } from "../../../service/API";
import styled from "styled-components";
import Swal from "sweetalert2";

// Receberá foto do usuário por context
import Profile from "../../../assets/hidethepainharold.jpg";


export default function PublishPost() {

    // Ficará no componente pai e passará setPosts por props
    const [posts, setPosts] = useState([]);

    const [text, setText] = useState('');
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);

    // Receberá o token original por context
    const token = "6a10cdfd-6b2c-42bf-9693-8096d10d3eb0";

    function publish(e) {
        e.preventDefault();
        setLoading(true);

        const body = {
            text,
            link,
        }

        createPost({ token, body })
            .then(() => {
                getPosts(token)
                    .then((r) => setPosts(r.data))
                    .catch(() => console.error)
                setText('');
                setLink('');
                setLoading(false);

                //Apenas para remover o warning e verificar se o post foi bem-sucedido
                console.log(posts);
            })
            .catch(() => {
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Houve um erro ao publicar seu link',
                })
            })
    }

    return (
        <Container onSubmit={publish}>
            <ProfileImg src={Profile}></ProfileImg>
            <PublishForm>
                <Title>O que você tem pra favoritar hoje?</Title>
                <Input
                    type='url'
                    required
                    placeholder='http://...'
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    disabled={loading}>
                </Input>
                <TextArea
                    placeholder='Muito irado esse link falando de #javascript'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={loading}>
                </TextArea>
                {loading ? <Submit disabled={loading}>Publicando...</Submit> : <Submit disabled={loading}>Publicar</Submit>}
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
    border: none;
    border-radius: 5px;
    outline: none;
    margin-bottom: 5px;
    padding-left: 10px;
    display: flex;
    background-color: ${props => props.disabled ? '#e5e5e5' : '#efefef'};
    pointer-events: ${props => props.disabled ? 'none' : 'all'};

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
    border: none;
    border-radius: 5px;
    outline: none;
    margin-bottom: 5px;
    padding-left: 10px;
    padding-top: 10px;
    display: flex;
    resize: none;
    background-color: ${props => props.disabled ? '#e5e5e5' : '#efefef'};
    pointer-events: ${props => props.disabled ? 'none' : 'all'};

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
    opacity: ${props => props.disabled ? '0.7' : '1'};
    pointer-events: ${props => props.disabled ? 'none' : 'all'};

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