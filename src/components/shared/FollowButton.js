import { useContext, useState } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import { toggleFollow } from "../../service/API";
import Swal from "sweetalert2";

export default function Follow({ followingList, userId }) {

    const { user } = useContext(UserContext);
    const [following, setFollowing] = useState(followingList.some(item => item.id === Number(userId)));
    const [isDisabled, setIsDisabled] = useState(false);

    function changeFollow() {
        setIsDisabled(true);

        if(following) {
            setFollowing(false);
            toggleFollow({ token: user.token, userId: userId, status: 'unfollow' })
                .then(() => {
                    setIsDisabled(false);
                })
                .catch(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Ops...",
                        text: "Houve uma falha na resposta do servidor, por favor atualize a página"
                    })
                })
        } else {
            setFollowing(true);
            toggleFollow({ token: user.token, userId: userId, status: 'follow' })
                .then(() => {
                    setIsDisabled(false);
                })
                .catch(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Ops...",
                        text: "Houve uma falha na resposta do servidor, por favor atualize a página"
                    })
                })
        }
    }

    return (
        <Button onClick={changeFollow} disabled={isDisabled} state={following}>{following ? 'Unfollow' : 'Follow'}</Button>
    );
}

const Button = styled.button`
    width: 112px;
    height: 31px;
    font-size: 14px;
    font-weight: 700;
    border: none;
    border-radius: 5px;
    margin-top: 132px;
    // Lembrete de alterar a organização flex-box na revisão final
    margin-bottom: -153px;
    align-self: flex-end;
    background-color: ${props => props.state ? '#ffffff' : '#1877f2'};
    color: ${props => props.state ? '#1877f2' : '#ffffff'};
    cursor: pointer;
    pointer-events: ${props => props.disabled ? 'none' : 'all'};

    @media (max-width: 960px) {
        display: none;
    }
`;