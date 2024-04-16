import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { getAllReservas } from "../redux/boscoSlice";
import axios from "axios";


export const useReservation= () => {
    const dispatch = useDispatch();

    useEffect(() => {  
        const peticionBack = async () => {
            try {
                const responseBack = await axios.get("/reservation/filtered");
               
                dispatch(getAllReservas(responseBack.data));
            } 
            catch (error) {
              console.error("Algo falló en la petición a mi Backend", error);
            }
          };
        
          peticionBack();
    }, [dispatch])

}
