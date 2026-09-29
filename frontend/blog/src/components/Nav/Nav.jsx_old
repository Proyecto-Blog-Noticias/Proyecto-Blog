import "./nav.css";
import image from "./Avatar.jpg"
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export default function Nav ({userLogin, setUserLogin}){

    const navigate = useNavigate()

    const [ userName, setUserName ] = useState("");

    function logoutHandler() {
        sessionStorage.removeItem("token");
        setUserLogin(false);
    }

    function whatIsNextTask () {
        swal({
            title: `Hola ${userName}!!!`,
            text: "Qué quieres hacer....?",
            icon: "info",
            buttons: ["Editar Perfil", "Redactar Noticia"]
        })
        
        .then((RedactarNoticia) => {
            if (RedactarNoticia) {
                navigate('/write')
            } else {
                swal("Sorry, Todavía estamos implementando esta opción");
            }
          });
    }

    function decodeJwtForUsername () {
        const Token = sessionStorage.getItem("token");
        const dataToken = Token.split(".")[1];
        const decodedData = atob(dataToken);
        const objectData = JSON.parse(decodedData);
        //userName = objectData.name;
        setUserName(objectData.name)
        //return userName;        
    }

    useEffect(
        ()=>{
            if (userLogin===true){
                    decodeJwtForUsername()
            }
        },
        [userLogin]
    )
    return(
        <div className="top">
            <div className="topLeft">
                <ul className="topList">
                    <Link to={`/`}>
                        <li className="topListItem blogHeadTitle">EL PAíS</li>
                    </Link>
                </ul>
            </div>
            

            {/*Menú condicionado al LOGIN*/}
            <div className="topRight">
            { userLogin === true ? 
                    (
                        <ul className="topList">
                            <li className="topListItem">
                                <img className="topImg" 
                                     src={image} 
                                     alt="" 
                                     onClick = {whatIsNextTask}
                                     //title = {decodeJwtForUsername()}
                                     title = {userName}
                                />
                            </li>
                            <li className="topListItem">
                                <Link className="link" to="/" onClick={logoutHandler}>SALIR</Link>
                            </li>
                        </ul> 
                    ) 
                    : 
                    (
                    <ul className="topList">
                        
                        <i className="topIcon fa-solid fa-circle-user"></i>
                        <li className="topListItem">
                            <Link className="link" to="/login">INICIAR SESIÓN</Link>
                        </li>
                    </ul> 
                    )
                }
            </div>
        </div>
    );
}