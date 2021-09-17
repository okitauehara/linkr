import styled from "styled-components";

const ContainerUserPost = styled.div`
    word-break: break-word;
    background-color: #171717;
    color: white;
    width: 611px;
    min-height:276px;
    display:flex;
    margin-top: 18px;
    border-radius: 16px;
    padding: 18px 18px 18px 0;
    
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
    .main-post {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 503px;
        color: white;
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
        width: 100vw;
        min-height: 232px;
        border-radius: 0;

        .main-post {
            width: 74vw;
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
export default ContainerUserPost;