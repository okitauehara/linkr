import {Container,BoxLogo,BoxText,BoxInput,ButtonSign,InputRegister} from "./ComponentsStyle";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
export default function Login(){
    const [email,setEmail] = useState("");
    const [senha,setSenha] = useState("");
    const [loading,setLoading] = useState(false);
    const { setUser } = useContext(UserContext); 
    let history = useHistory();
    function Logar(e){
        e.preventDefault();
        setLoading(true);
        const body = {
            email: email,
            password:senha,
        }
        const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in",body);
        promisse.then(LoginSucess);
        promisse.catch(Erro);
    }

    function LoginSucess(res){
        setUser(res.data);
        history.push("/timeline")
    }
    function Erro(res){
        const statusCode = res.response.status
        if(statusCode === 403){
            alert("Email ou senha incorretos");
        }
        else if (statusCode === 500) {
            alert("Não foi possível realizar o login nesse momento");
        }
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
        <form onSubmit={Logar}>
           <InputRegister type="email" placeholder="e-mail" value={email} onChange={(e)=> setEmail(e.target.value)} required></InputRegister>
           <InputRegister type="password" placeholder="password" value={senha} onChange={(e)=> setSenha(e.target.value)} required></InputRegister>
           <ButtonSign disabled={loading} type="submit">Log in</ButtonSign>
        </form>
        <Link to="/sign-up">
           <span>First time? Create an account!</span>
        </Link>
       </BoxInput>
    </Container>
    );
}