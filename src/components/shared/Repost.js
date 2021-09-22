import {Interaction} from './ContainerUserPost'
import { BiRepost } from 'react-icons/bi'
import {repost} from '../../service/API'
export default function Repost(props) {
    const {token, postId} = props
    function callRepost() {
        repost({token: token, postId: postId})
         .then(res => console.log(res.data))
         .catch(err => console.error(err))
    }
    
    return (
        <Interaction onClick={callRepost}>
            <BiRepost 
                style={{fontSize: '20px', marginTop: '18px'}}
            />
            <p>0 re-posts</p>
        </Interaction>
    )
}