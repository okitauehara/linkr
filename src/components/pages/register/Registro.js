import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { signUp } from "../../../service/API";
import {Container,BoxLogo,BoxText,BoxInput,ButtonSign,InputRegister} from "../../shared/LoginRegisterStyle";

export default function Register(){

    const [usuario, setUsuario] = useState({email: "", senha:"",username:"",URL:""})
    const [loading,setLoading] = useState(false);
    let history = useHistory();
    
    const handleChange = e => {
        const { name, value } = e.target;
        setUsuario(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
function Registrar(event){
    event.preventDefault();
    setLoading(true);
    const body = {
        email: usuario.email,
        password: usuario.senha,
        username: usuario.username,
        pictureUrl: usuario.URL,
    }
    signUp(body)
        .then(()=> history.push("/"))
        .catch(Erro);
}

function Erro(res){
    const statusCode = res.response.status;
    if(statusCode === 403){
        alert("Email inserido já cadastrado")
       }
    else if (statusCode === 500){
        alert("Não foi possível realizar o cadastro no momento. Tente novamente mais tarde.")
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
           <InputRegister type="email" placeholder="e-mail" value={usuario.email} onChange={handleChange} name="email" required></InputRegister>
           <InputRegister type="password" placeholder="password" value={usuario.senha} onChange={handleChange} name="senha" required></InputRegister>
           <InputRegister type="text" placeholder="username" value={usuario.username} onChange={handleChange} name="username" required></InputRegister>
           <InputRegister type="url" placeholder="picture url" value={usuario.URL} onChange={handleChange} name="URL" required></InputRegister>
           <ButtonSign disabled={loading} type="submit">Sign Up</ButtonSign>
        </form>
        <Link to="/">
           <span>Switch back to login</span>
        </Link>
       </BoxInput>
    </Container>
    );
}



