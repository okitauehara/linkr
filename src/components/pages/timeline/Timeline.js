import Loading from "../../shared/Loading";
import Swal from "sweetalert2";
import PublishPost from "./PublishPost";
import { useContext, useEffect, useState } from "react";
import UserPost from "../../shared/UserPost";
import ContainerStyle from "../../shared/ContainerStyle";
import { getPosts, getTrending} from "../../../service/API";
import UserContext from "../../../contexts/UserContext";


export default function Timeline() {

    const {user, setHashList} = useContext(UserContext);
    const [posts, setPosts] = useState([]);
   

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
        getTrending(user.token)
            .then((r) => setHashList(r.data))
            .catch(() => console.error)
    }, [user.token , setHashList]);    

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




