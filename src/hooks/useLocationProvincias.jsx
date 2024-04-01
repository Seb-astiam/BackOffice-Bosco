import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { getAllLocation } from "../redux/boscoSlice";
import axios from "axios";


export const useLocationProvincias = () => {
    const dispatch = useDispatch();

    useEffect(() => {  
        const peticionBack = async () => {
            try {
                const responseBack = await axios.get("/location/provinces");
                dispatch(getAllLocation(responseBack.data));
            } 
            catch (error) {
              console.error("Algo falló en la petición a mi Backend", error);
            }
          };
        
          peticionBack();
    }, [dispatch])

}
