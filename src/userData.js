import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState();
    const [userHistory, setUserHistory] = useState([]);

    return <UserContext.Provider value={{ userData, setUserData, userHistory, setUserHistory }}>{children}</UserContext.Provider>;
}