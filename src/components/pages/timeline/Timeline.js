import PublishPost from "./PublishPost";
import { useState } from "react";

export default function Timeline() {

    const [posts, setPosts] = useState([]);
    console.log(posts);
    return (
        <PublishPost setPosts={setPosts} />
    );
}