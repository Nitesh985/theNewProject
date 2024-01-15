import { createContext, useContext, useState } from "react";


const UserContext = createContext(null)

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(()=>{
        const localValue = localStorage.getItem('USER')

        return localValue?JSON.parse(localValue):null
    })

    const setUserData = (data) => {
        localStorage.setItem("USER", JSON.stringify(data))
        setUser(data)
    }

    return <UserContext.Provider value={{user, setUserData}}>
        {children}
    </UserContext.Provider>
}

export default function useUserContext () {
    return useContext(UserContext)
}
