import {Container,BoxLogo,BoxText,BoxInput,ButtonSign,InputRegister} from "../../shared/LoginRegisterStyle";
import UserContext from "../../../contexts/UserContext";
import { useContext, useState,useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { login } from "../../../service/API";
import Swal from "sweetalert2";

export default function Login(){
    const [email,setEmail] = useState("");
    const [senha,setSenha] = useState("");
    const [loading,setLoading] = useState(false);
    const { user,setUser } = useContext(UserContext); 
    let history = useHistory();
    
    useEffect(() =>{
        if(user){
            history.push("/timeline");
        }
        else{
            history.push("/");
        }
         // eslint-disable-next-line
    },[user]);
    function Logar(event){
        event.preventDefault();
        setLoading(true);
        const body = {
            email: email,
            password:senha,
        }
        login(body)
            .then(LoginSucess)
            .catch(Erro);
    }

    function LoginSucess(response){
        setUser(response.data);
        localStorage.setItem('@user',JSON.stringify(response.data));
    }
    function Erro(response){
        const statusCode = response.response.status
        if(statusCode === 403){
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: "Email ou senha incorretos"
            })
        }
        else if (statusCode === 500) {
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: "Não foi possível realizar o login neste momento"
            })
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
        <form onSubmit={Logar}>
        <InputRegister type="email" placeholder="e-mail" value={email} onChange={(event)=> setEmail(event.target.value)} required></InputRegister>
           <InputRegister type="password" placeholder="password" value={senha} onChange={(event)=> setSenha(event.target.value)} required></InputRegister>
           <ButtonSign disabled={loading} type="submit">Log in</ButtonSign>
        </form>
        <Link to="/sign-up">
           <span>First time? Create an account!</span>
        </Link>
       </BoxInput>
    </Container>
    );
}