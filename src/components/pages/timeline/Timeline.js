import Loading from "../../shared/Loading";
import Swal from "sweetalert2";
import PublishPost from "./PublishPost";
import { useContext, useEffect, useState } from "react";
import UserPost from "../../shared/UserPost";
import ContainerStyle from "../../shared/ContainerStyle";
import { getPosts } from "../../../service/API";
import UserContext from "../../../contexts/UserContext";


export default function Timeline() {

    const {user} = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    console.log(posts);

    useEffect (() => {
        getPosts(user.token)
            .then((r) => setPosts(r.data))
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Houve uma falha ao obter os posts, por favor atualize a página"
                })
            })
    }, []);
    

    return (
        <ContainerStyle>
        <div className="user-header">
            <h1>timeline</h1>
        </div>
        <PublishPost setPosts={setPosts} />
        {posts.length === 0 ? <Loading/> : posts.posts.map((post, index) => (
            <UserPost post={post} key={index}/>
        ))}
        </ContainerStyle>
    );
}




