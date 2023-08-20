import { useContext } from "react";
import AuthContext from "./authContext";


/*
Cusome hook to access auth context (AuthContext) within react component
Now any component in app can access auth context with a single line.
*/
const useAuth = () =>{
    const data = useContext(AuthContext);
    return data;
}

export default useAuth;