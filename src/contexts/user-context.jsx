import { createContext,useState } from "react";
export const UserContext = createContext();
function UserContextProvider({children}){
    const getUserDetail = () => {
       return localStorage.getItem('userDetail') ? JSON.parse(localStorage.getItem('userDetail')) :  null
    }
    const [userDetail, setUserDetail] = useState(getUserDetail());
    
    return(
        <UserContext.Provider value={{userDetail,setUserDetail,getUserDetail}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider