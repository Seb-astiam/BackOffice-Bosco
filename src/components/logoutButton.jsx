import { useNavigate } from "react-router-dom"
import { btn } from "../estilos/estilosLogin";

export const LogoutButton = () => {
    const navigate = useNavigate();


    const hangleLogout = () => {
        localStorage.removeItem("loggedInUser");
        navigate('/');
    }

    return (
        <button onClick={hangleLogout} className={btn}>Cerrar sesión</button>
    )

}