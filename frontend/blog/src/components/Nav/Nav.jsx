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
    
    // 1. CAMBIO: Estado para saber si el usuario logueado es Administrador
    const [ isAdmin, setIsAdmin ] = useState(false);

    function logoutHandler() {
        sessionStorage.removeItem("token");
        setUserLogin(false);
        setIsAdmin(false); // Reseteamos el rol de administrador al salir
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

    // 2. CAMBIO: Funciones que saltan al hacer clic en los iconos de mantenimiento
    function handleBackup() {
        swal("Mantenimiento", "Ejecutando copia de seguridad...", "info");
    }

    function handleRestore() {
        swal("Mantenimiento", "Restaurando base de datos...", "info");
    }

            function handleShutdown() {
        swal({
            title: "¿Apagar el Servidor?",
            text: "La aplicación del servidor se detendrá y la ventana de la consola se cerrará. ¿Deseas continuar?",
            icon: "error",
            buttons: ["Cancelar", "Confirmar Apagado"],
            dangerMode: true,
        }).then(async (willShutdown) => {
            if (willShutdown) {
                try {
                    // 1. Recuperamos el token de forma segura del sessionStorage
                    const token = sessionStorage.getItem("token");

                    // 2. Realizamos la petición POST incluyendo el token Bearer correctamente
                    const response = await fetch("http://localhost:4000/api/v0.0/maintenance/shutdown", {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    });

                    // 3. Evaluamos la respuesta del backend
                    if (response.status === 200) {
                        // Borramos la sesión en el navegador
                        sessionStorage.removeItem("token");
                        setUserLogin(false);
                        setIsAdmin(false);

                        
                        swal({
                            title: "Servidor Desconectado",
                            text: "La orden se ha ejecutado con éxito. El servidor se ha detenido y la ventana negra se cerrará. Ya puedes cerrar esta pestaña.",
                            icon: "success",
                            button: "Entendido"
                        }).then(() => {
                            navigate('/');
                        });

                    } else {
                        swal({
                            title: "Acceso Denegado",
                            text: `El servidor rechazó la orden (Código: ${response.status}). Asegúrate de tener permisos de administrador.`,
                            icon: "error",
                            button: "Aceptar"
                        });
                    }

                } catch (error) {
                    console.error("Error al conectar con el servidor:", error);
                    swal({
                        title: "Error de Conexión",
                        text: "No se pudo comunicar con el servidor de mantenimiento.",
                        icon: "error",
                        button: "Aceptar"
                    });
                }
            }
        });
    }



    function decodeJwtForUsername () {
        const Token = sessionStorage.getItem("token");
        const dataToken = Token.split(".")[1]; 
        const decodedData = atob(dataToken);
        const objectData = JSON.parse(decodedData);
        
        setUserName(objectData.name)
        
        // 3. CAMBIO: Comprobamos el rol dentro del token
        if (objectData.role === 'admin') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
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
                            
                            {/* 4. CAMBIO: Si es Admin, pintamos los iconos con las nuevas clases CSS antes de la foto */}
                            { isAdmin === true && (
                                <li className="maintenancePanel">
                                    <i className="fa-solid fa-floppy-disk maintenanceIcon iconBackup" title="Copia de Seguridad" onClick={handleBackup}></i>
                                    <i className="fa-solid fa-rotate-left maintenanceIcon iconRestore" title="Restaurar Copia" onClick={handleRestore}></i>
                                    <i className="fa-solid fa-power-off maintenanceIcon iconShutdown" title="Apagar Servidor" onClick={handleShutdown}></i>
                                </li>
                            )}

                            <li className="topListItem">
                                <img className="topImg" 
                                     src={image} 
                                     alt="" 
                                     onClick = {whatIsNextTask}
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
