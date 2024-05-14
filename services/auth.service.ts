import axios from "axios";
import api from "./api.service";
import TokenService from "./token.service";

const signup = async  (credentials: any) => {
    const res = await api.post(`/auth/signup`, credentials)
    const data = res.data;
};

const signin = async (credentials:any) => {
    const response = await api.post(`/auth/signin`, credentials);
    return response.data;
}



const logout = () => {
    TokenService.removeUser();
};


const AuthService = {
    signup,
    signin,
    logout, 
};
  
export default AuthService;