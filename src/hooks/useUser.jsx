import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { getAllUsers } from "../redux/boscoSlice";
import axios from "axios";


export const useUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {  
        const peticionBack = async () => {
            try {
                const responseBack = await axios.get("http://localhost:3001/user");
                dispatch(getAllUsers(responseBack.data));
            } 
            catch (error) {
              console.error("Algo falló en la petición a mi Backend", error);
            }
          };
        
          peticionBack();
    }, [dispatch])

}
