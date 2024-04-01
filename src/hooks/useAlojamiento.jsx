import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { getAllAlojamientos } from "../redux/boscoSlice";
import axios from "axios";


export const useAlojamiento= () => {
    const dispatch = useDispatch();

    useEffect(() => {  
        const peticionBack = async () => {
            try {
                const responseBack = await axios.get("/profileHousing/filtered");
                dispatch(getAllAlojamientos(responseBack.data));
            } 
            catch (error) {
              console.error("Algo falló en la petición a mi Backend", error);
            }
          };
        
          peticionBack();
    }, [dispatch])

}
