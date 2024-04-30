import { createContext,useState } from "react";
export const UserContext = createContext();
function UserContextProvider({children}){
    const getUserDetail = () => {
       return localStorage.getItem('userDetail') ? JSON.parse(localStorage.getItem('userDetail')) :  null
    }
    const [userDetail, setUserDetail] = useState(getUserDetail());
    
    return(
        <UserContext.Provider value={{userDetail,setUserDetail}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider