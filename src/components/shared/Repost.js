import {Interaction} from './ContainerUserPost'
import { BiRepost } from 'react-icons/bi'
import {repost} from '../../service/API'
import styled from 'styled-components'

function RepostButton({token, postId, numberOfReposts, setNumberOfReposts, posts, setPosts}) {
    function callRepost() {
        repost({token: token, postId: postId})
        .then((res) => {
            setNumberOfReposts(numberOfReposts + 1)
            
        })
        .catch(err => alert(err))
    }
    
    return (
        <Interaction onClick={callRepost}>
            <BiRepost 
                style={{fontSize: '20px', marginTop: '18px'}}
            />
            <p>{numberOfReposts} re-posts</p>
        </Interaction>
    )
}
function RepostedDiv({repostedBy, id}) {
    return(
        <ContainerRepost>
        <BiRepost  style={{fontSize: '20px'}}/>
        <span> Re-posted by <strong>{repostedBy.id === id ? 'you' : repostedBy.username}</strong></span>
        </ContainerRepost>

    )

}

export {
    RepostButton,
    RepostedDiv
}

const ContainerRepost = styled.div`
    z-index: -1;
    position: absolute;
    top: -33px;
    display: flex;
    align-items: center;
    color: white;
    height: 50px;
    width: 611px;
    padding: 0 0 17px 13px;
    border-radius: 16px 16px 0 0;
    background-color: #1E1E1E;
    
    span {
        font-size: 11px;
        margin-left: 5px;
    }
`