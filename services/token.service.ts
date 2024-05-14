interface User {
    name: string;
    uuid: string;
    email: string;
    password: string;
}


const getUser = (): User | null => {
    const userItem = window?.localStorage?.getItem("user");
    return userItem ? JSON.parse(userItem) : null;
};

const getToken = (): string | null => {
    return window?.localStorage?.getItem("access_token");
}

const setUser = (user: User): void => {
    window?.localStorage?.setItem("user", JSON.stringify(user));
};

const setToken = (access_token: string): void => {
    window?.localStorage?.setItem("access_token", access_token);
}

const removeUser = (): void => {
    window?.localStorage?.removeItem("user");
    window?.localStorage?.removeItem("access_token");
};


const TokenService = {
    getUser,
    getToken,
    setUser,
    setToken,
    removeUser
};

export default TokenService;
