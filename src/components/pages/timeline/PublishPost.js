import { useContext, useState } from "react";
import { createPost, getFollowingUsersPosts } from "../../../service/API";
import Swal from "sweetalert2";
import UserContext from "../../../contexts/UserContext";
import { Link } from "react-router-dom";
import {FiMapPin} from 'react-icons/fi'
import { Container,
    ProfileImg,
    PublishForm,
    Title,
    Input,
    TextArea,
    PublishBottom,
    Localization,
    Submit } from "./ContainerPublishPost"
export default function PublishPost({ setPosts }) {

    const { user } = useContext(UserContext);

    const [text, setText] = useState('');
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLocating, setIsLocating] = useState(false);
    const [location, setLocation] = useState({});
    function getLocalization() {
        if(!isLocating) {
            setIsLocating(true)
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({latitude: position.coords.latitude, longitude: position.coords.longitude})
            }, (error) => {
                if(error.code === error.PERMISSION_DENIED) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ops...',
                        text: 'Não foi possível acessar a localização',
                    })
                    setIsLocating(false);
                }
            }
            )
        } else {
            setIsLocating(false)
            setLocation({})
        }
    }
    function publish(event) {
        event.preventDefault();
        setLoading(true);
        let body;
        if(isLocating) {
            body = {
                text,
                link,
                geolocation: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                }
            }
        } else {
            body = {
               text,
               link,
           }
        }

        createPost({ token: user.token, body })
            .then(() => {
                getFollowingUsersPosts(user.token)
                    .then((response) => setPosts(response.data.posts))
                    .catch(() => {
                        Swal.fire({
                            icon: "error",
                            title: "Ops...",
                            text: "Houve uma falha ao obter os posts, por favor atualize a página"
                        })
                    })
                setText('');
                setLink('');
                setLoading(false);
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
            <Link to={'/my-posts'}>
                <ProfileImg src={user.user.avatar}></ProfileImg>
            </Link>
            <PublishForm>
                <Title>O que você tem pra favoritar hoje?</Title>
                <Input
                    type='url'
                    required
                    placeholder='http://...'
                    value={link}
                    onChange={(event) => setLink(event.target.value)}
                    disabled={loading}>
                </Input>
                <TextArea
                    placeholder='Muito irado esse link falando de #javascript'
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    disabled={loading}>
                </TextArea>
                <PublishBottom>
                    <Localization isLocating={isLocating} onClick={getLocalization}>
                        <FiMapPin style={{fontSize: '18px'}}/>
                        <span>Localização {isLocating ? 'ativada' : 'desativada'}</span>
                    </Localization>
                    {loading ? <Submit disabled={loading}>Publicando...</Submit> : <Submit disabled={loading}>Publicar</Submit>}
                </PublishBottom>
            </PublishForm>
        </Container>
    );
}
