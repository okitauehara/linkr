import {Container,BoxLogo,BoxText,BoxInput,ButtonSign,InputRegister} from "../../shared/LoginRegisterStyle";
import UserContext from "../../../contexts/UserContext";
import { useContext, useState,useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { login } from "../../../service/API";

export default function Login(){
    const [email,setEmail] = useState("");
    const [senha,setSenha] = useState("");
    const [loading,setLoading] = useState(false);
    const [loginScreen,setLoginScreen] = useState(false);
    const { setUser } = useContext(UserContext); 
    let history = useHistory();

    function Logar(e){
        e.preventDefault();
        setLoading(true);
        const body = {
            email: email,
            password:senha,
        }
        login(body)
            .then(LoginSucess)
            .catch(Erro);
    }

    function LoginSucess(res){
        setUser(res.data);
        localStorage.setItem('@userdata',JSON.stringify(res.data));
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
        setLoading(false);
    }

    useEffect(() =>{
        if(localStorage.getItem('@userdata')){
            const userData = JSON.parse(localStorage.getItem('@userdata'));
            setUser(userData);
            history.push("/timeline");
        }
        else{
            setLoginScreen(true);
        }
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!loginScreen && localStorage.getItem("@userdata")){
        return(
            <p></p>
        );
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