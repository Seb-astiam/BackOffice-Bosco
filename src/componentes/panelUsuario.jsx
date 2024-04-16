import axios from "axios"
import { useEffect, useState } from "react"
import { RiEditLine } from "@remixicon/react";

export const PanelUsuario = () => {

    const [user, setUser] = useState('')

    useEffect(() => {
        const orderByEmail = async () => {
            const email = localStorage.getItem('loggedInUser');
            const { data } = await axios.get(`/user/${email.replace(/[ '"]+/g, '')}`);
            setUser(data)
        }
        orderByEmail();
    }, [])

    

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-6">
                <h2>{user.picture}</h2>
                <button>
                    <RiEditLine /> 
                </button>
            </div>

            <div className="flex gap-6">
                <h2>{user.email}</h2>
                <button>
                    <RiEditLine /> 
                </button>
            </div>

            <div className="flex gap-6">
                <h2>{user.name}</h2>
                <button>
                    <RiEditLine /> 
                </button>
            </div>


        </div>
    )
}
