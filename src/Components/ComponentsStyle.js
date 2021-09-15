import styled from "styled-components";


const Container = styled.div`
width: 100vw;
height: 100vh;
display: flex;
 @media(max-width: 620px){
     display: flex;
     flex-direction: column;
 }
`

const BoxLogo = styled.div`
position: relative;
width: 60vw;
height: 100vh;
background-color: #151515;
display: flex;
flex-direction: column;
color: #ffffff;
align-items: flex-start;
justify-content: center;
box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);

    h1{
        font-family: 'Passion One',sans-serif;
        font-size: 106px;
        letter-spacing: 0.05em;
    }

    h2{
        font-family: 'Oswald',sans-serif;
        font-size: 43px;
        margin-bottom: 10px;
    }
    @media(max-width: 620px){
     width: 100vw;
     height: 30vh;   
     display: flex;
     align-items: center;
     h1{
         font-size: 76px;
     }
     h2{
         font-size: 23px;
     }
 }
`
const BoxText = styled.div`
position: absolute;
top: 301px;
left: 144px;
@media(max-width: 620px){
     position: initial;
     text-align: center;

 }
`

const BoxInput = styled.div`
    box-sizing: border-box;
    width: 40vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span{
        color: #ffffff;
        font-family: 'Lato',sans-serif;
        font-size: 20px;
        text-decoration: underline;
        margin-top: 8px;
        cursor: pointer;
    }
    form{
        display: flex;
        flex-direction: column;
    }
    @media(max-width: 620px){
     width: 100vw;
     height: 60vh;
     justify-content: flex-start;
     margin-top: 30px;
     span{
        font-size: 15px;
        
     }
 }
`

const InputRegister = styled.input`
    width: 30vw;
    height: 65px;
    background: #FFFFFF;
    border-radius: 6px;
    border: none;
    margin-bottom: 8px;
    box-sizing: border-box;
    ::placeholder{
        color: #9F9F9F;
        font-family: 'Oswald',sans-serif;
        font-size: 27px;
        text-align: start;
        padding:10px;
        align-self: center;
        font-family: 'Oswald',sans-serif;
        font-size: 27px;
        padding: 10px;
    }
    @media(max-width: 620px){
     width: 90vw;
     height: 8vh;
        ::placeholder{
            font-size: 20px;
        }
 }
`


const ButtonSign = styled.button`
width: 30vw;
height: 65px;
background-color: #1877F2;
border-radius: 6px;
color: #FFFFFF;
font-family: 'Oswald',sans-serif;
font-size: 27px;
text-align: center;
border: none;
cursor: pointer;
font-weight: bold;
    :disabled{
        cursor: not-allowed;
        opacity: 0.6;
    }
    @media(max-width: 620px){
     width: 90vw;
     height: 8vh;
     font-size: 20px;
     margin-bottom: 20px;
 }
`

export {Container,BoxLogo,BoxText,BoxInput,ButtonSign,InputRegister}