import styled from "styled-components";

const ContainerUserPost = styled.div`
 position: relative;
`;

const MainContent = styled.div `
    z-index: 1;
    word-break: break-word;
    background-color: #171717;
    color: white;
    width: 611px;
    min-height:276px;
    display:flex;
    border-radius: 16px;
    padding: 18px 18px 18px 0;
    z-index: 0; 
    .top-post{
        display: flex;
        justify-content: space-between;
    }
    strong {
        font-weight: bold;
    }
    .photo-and-likes {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 85px;
    }
    .photo-and-likes img { 
        object-fit: cover;
        width: 50px;
        height: 50px;
        margin-bottom: 20px;
        border-radius: 50%;
    }
    .photo-and-likes img:hover { 
        filter: brightness(0.8);
    }
    .photo-and-likes p {
        margin-top: 5px;
        font-size: 11px;
    }
    .name-and-location {
        display: flex;
    }
    .main-post {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 503px;
        color: white;
    }
    .comments {
        cursor: pointer;
        margin-top: 10px;
        font-size: 18px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .top-post {
        display: flex;
        justify-content: space-between;
    }
    .main-post p:nth-child(1) {
        font-size: 19px;
        margin-bottom: 15px;
    }
    .main-post p:nth-child(2) {
        font-size: 17px;
        color: #B7B7B7;
        margin-bottom: 15px;
    }
    .main-post p {
        display: flex;
        align-items: center;
    }
    .link-content {
        width: 503px;
        min-height: 155px;
        border: solid 1px #4D4D4D;
        border-radius: 11px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
    }
    .link-content:hover{
        filter: brightness(1.2);
    }
    .link-content > div {
        width: 350px;
        height: 100%; 
    }
    .link-content img {
        object-fit: cover;
        width: 153px;
        height: 100%;
        border-radius: 0 11px 11px 0;
    }
    .link-description {
        padding: 24px 27px 0 19px; 
        display: flex;
        flex-direction: column;
        color: #cecece;
    }
    .link-description p:nth-child(1) {
        font-size: 16px;
    }   
    .link-description p:nth-child(2) {
        font-size: 11px;
        color: #9b9595;
        margin: 5px 0 13px 0;
    }   
    .link-description p:nth-child(3) {
        font-size: 11px;
    }
    @media (max-width: 620px) {
        width: 100%;
        min-height: 232px;
        border-radius: 0;

        .main-post {
            width: 74vw;
        }
        strong {
            max-width: 200px;
        }
        .link-content {
            width: 74vw;
            min-height: 115px;
        }
        
        .link-content img {
            object-fit: cover;
            width: 25vw;
        }
        .link-description {
            padding: 10px;
        }
        .link-description p:nth-child(1) {
            font-size: 11px;
        }   
        .link-description p:nth-child(2) {
            font-size: 9px;
            color: #9b9595;
            margin: 5px 0 8px 0;
        }   
        .link-description p:nth-child(3) {
            font-size: 9px;
        }
    }

`;
const BoxModal = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    div {
        align-items: center;
        justify-content: center;
        flex-direction: row;
        margin-top: 30px;
    }
    button{
        border-radius: 5px;
        width: 134px;
        height: 37px;
        border: none;
        font-size: 18px;
        margin: 10px;
    }
`

const ModalTitle = styled.h1`
font-size: 34px;
color: #ffffff;
text-align: center;
`

const ModalConfirm = styled.button`
background: #1877F2;
color: #ffffff;
opacity: ${props => props.state ? 1 : 0.6};
cursor: ${props => props.state ? 'pointer' : 'not-allowed'};
`
const ModalCancel = styled.button`
background: #ffffff;
color: #1877F2;
opacity: ${props => props.state ? 1 : 0.6};
cursor: ${props => props.state ? 'pointer' : 'not-allowed'};
`
const HashtagCSS = styled.div`
    word-break: break-word;
    margin-bottom: 15px;

    span {
        font-weight: 700;
        cursor: pointer;
    }
`;

const Interaction = styled.div`
    cursor: pointer;  
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
`;
const EditBox = styled.textarea`
    font-family: 'Lato', sans-serif;
    font-size: 17px;
    color: #4c4c4c;
    margin-bottom: 15px;
    resize: none;
    outline: none;
    border-radius: 5px;
    padding: 10px;
    pointer-events: ${props => props.disabled ? 'none' : 'all'};
    background-color: ${props => props.disabled ? '#e5e5e5' : '#ffffff'};
`;

const BoxFrame = styled.div`
width: 100%;
background: #333333;
    div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        
    }
    button {
        background: #1877F2;
        border-radius: 5px;
        font-size: 14px;
        font-family: 'Lato',sans-serif;
        color: #FFFFFF;
        border: none;
        width: 138px;
        height: 31px;
        cursor: pointer;
    }
    p{
        font-size: 25px;
        text-align: center;
        color: #FFFFFF;
        cursor: pointer;
    }
    iframe{
        margin-top: 16px;
        border-radius: 10px;
    }
`

const BoxPost = styled.div` 
    display: flex;
    flex-direction: column;
    margin-bottom: 18px;
`

const InputComment = styled.input`
    width: 510px;
    height: 39px;
    background: #252525;
    border-radius: 8px;
    border: none;
    color: #FFFFFF;
    opacity: ${props => props.disabled ? '0.6' : '1'};
    ::placeholder{
        padding: 10px;
    }
    :focus{
        outline: none;
    }
`
const ButtonComment = styled.button`
     position: absolute;
        right: 30px;
        color: #FFFFFF;
        width: 30px;
        background: none;
        border: none;
        cursor: ${props => props.disabled ? 'not-allowed' : 'Pointer'};
        pointer-events: ${props=> props.disabled ? 'none' : 'all'};
        .icon-send{
            width: 20px;
            height: 20px;
        }
`

const ContainerComments = styled.div`
background-color: #1E1E1E;
display: flex;
flex-direction: column;
width: 611px;
border-radius: 16px;
margin-top:-30px;
    img{
        object-fit: cover;
        width: 39px;
        height: 39px;
        border-radius: 304px;
        margin-left: 20px;
    }
    form{
        position: relative;
        display: flex;
        justify-content: space-around;
        height: 100px;
        align-items: center;
    }
    .borda{
        border: 1px solid #353535;
        width: 571px;
        height: 1px;
    }
`
const Comments = styled.div`
display: flex;
width: 611px;
flex-direction: column;
font-family: 'Lato',sans-serif;
font-size: 14px;
padding-top:60px;
    img{ 
        margin-left: 25px;
        margin-right: 18px;
        object-fit: cover;
    }
    h1{
        color: #F3F3F3;
        margin-bottom: 10px;
    }
    h2{
        color: #ACACAC; 
    }
`
const Comment = styled.div`
display: flex;
word-break: break-word;
padding: 8px;
.user-info{
    display: flex;
    span{
        margin-left: 5px;
        color: #565656;
        font-size: 14px;
    }
}
`

export {
    MainContent,
    ContainerUserPost,
    BoxModal,
    ModalTitle,
    ModalConfirm,
    ModalCancel,
    HashtagCSS,
    Interaction,
    EditBox,
    BoxFrame,
    Comment,
    Comments,
    BoxPost,
    ContainerComments,
    ButtonComment,
    InputComment,
};