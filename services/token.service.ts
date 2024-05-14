interface User {
    name: string;
    uuid: string;
    email: string;
    password: string;
}


const getUser = (): User | null => {
    const userItem = localStorage.getItem("user");
    return userItem ? JSON.parse(userItem) : null;
};

const getToken = (): string | null => {
    return localStorage.getItem("access_token");
}

const setUser = (user: User): void => {
    localStorage.setItem("user", JSON.stringify(user));
};

const setToken = (access_token: string): void => {
    localStorage.setItem("access_token", access_token);
}

const removeUser = (): void => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
};


const TokenService = {
    getUser,
    getToken,
    setUser,
    setToken,
    removeUser
};

export default TokenService;
