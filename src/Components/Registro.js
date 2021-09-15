
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

export default function Register(){
    const [email,setEmail] = useState("");
    const [senha,setSenha] = useState("");
    const [username,setUsername] = useState("");
    const [url,setURL] = useState("");
    const [loading,setLoading] = useState(false);
    let history = useHistory();
function Registrar(event){
    event.preventDefault();
    setLoading(true);
    const body = {
        email:email,
        password:senha,
        username:username,
        pictureUrl:url
    }
    const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up",body);
    promisse.then(()=> history.push("/"));
    promisse.catch(Erro);
}

function Erro(res){
    console.log(res)
    const statusCode = res.status;
    //if(statusCode === 403){
        alert("Email inserido já cadastrado")
       // }
    setLoading(false);
}


    return(
    <Container>
       <BoxLogo>
        <BoxText>
           <h1>linkr</h1>
           <h2>save, share and discover</h2>
           <h2>the best links on the web</h2>
        </BoxText>
       </BoxLogo>
       <BoxInput>
        <form onSubmit={Registrar}>
           <InputRegister type="email" placeholder="e-mail" value={email} onChange={(e)=> setEmail(e.target.value)} required></InputRegister>
           <InputRegister type="password" placeholder="password" value={senha} onChange={(e)=> setSenha(e.target.value)} required></InputRegister>
           <InputRegister type="text" placeholder="username" value={username} onChange={(e)=> setUsername(e.target.value)} required></InputRegister>
           <InputRegister type="url" placeholder="picture url" value={url} onChange={(e)=> setURL(e.target.value)} required></InputRegister>
           <ButtonSign disabled={loading} type="submit">Sign Up</ButtonSign>
        </form>
           <span>Switch back to login</span>
       </BoxInput>
    </Container>
    );
}







const Container = styled.div`
width: 100vw;
height: 100vh;
display: flex;
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
        font-size: 60px;
        letter-spacing: 0.05em;
    }
    h2{
        font-family: 'Oswald',sans-serif;
        font-size: 22px;
        margin-bottom: 10px;
    }
`
const BoxText = styled.div`
position: absolute;
top: 160px;
left: 80px;
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
        font-size: 10px;
        text-decoration: underline;
        margin-top: 10px;
        cursor: pointer;
    }
    form{
        display: flex;
        flex-direction: column;
    }
`

const InputRegister = styled.input`
    width: 30vw;
    height: 30px;
    background: #FFFFFF;
    border-radius: 6px;
    border: none;
    margin-bottom: 8px;
    ::placeholder{
        color: #9F9F9F;
        font-family: 'Oswald',sans-serif;
        font-size: 15px;
        text-align: start;
        padding: 10px;
    }
`


const ButtonSign = styled.button`
width: 30vw;
height: 35px;
background-color: #1877F2;
border-radius: 6px;
color: #FFFFFF;
font-family: 'Oswald',sans-serif;
font-size: 15px;
text-align: center;
border: none;
cursor: pointer;
    :disabled{
        cursor: not-allowed;
        opacity: 0.6;
    }

`