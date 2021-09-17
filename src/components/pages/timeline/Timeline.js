import PublishPost from "./PublishPost";
import { useState } from "react";

export default function Timeline() {

    const [posts, setPosts] = useState([]);
    return (
        <PublishPost setPosts={setPosts} />
    );
}