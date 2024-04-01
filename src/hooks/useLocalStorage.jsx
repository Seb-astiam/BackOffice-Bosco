import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
    const [storage, setStorage] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            return initialValue
        }
    })

    const setValue = (value) => {
        try {
            setStorage(value)
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            
        }
    }


    return [storage, setValue]
}