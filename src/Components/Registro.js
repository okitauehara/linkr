
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import {Container,BoxLogo,BoxText,BoxInput,ButtonSign,InputRegister} from "./ComponentsStyle";

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
    const statusCode = res.response.status;
    if(statusCode === 403){
        alert("Email inserido já cadastrado")
       }
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



