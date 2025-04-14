import { createContext, useEffect, useState } from "react";


export const UserContext = createContext(0)

export default function UserContextProvider(props){
    const [userlogin, setUserlogin] = useState(null)
    useEffect(()=>{
        if(localStorage.getItem('userToken') !== null)
        {
            setUserlogin(localStorage.getItem('userToken'));
        }

    },[])
    return (
        <UserContext.Provider value={{ userlogin, setUserlogin }}>
            {props.children}
        </UserContext.Provider>
    )
}
