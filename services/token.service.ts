interface User {
    token: string;
    refreshToken: string;
    name: string;
}

const getLocalRefreshToken = (): string | null => {
    const user = getUser();
    return user?.refreshToken || null;
};

const getLocalAccessToken = (): string | null => {
    const user = getUser();
    return user?.token || null;
};

const updateLocalAccessToken = (token: string): void => {
    const user = getUser();
    if (user) {
        user.token = token;
        setUser(user);
    }
};

const getUser = (): User | null => {
    const userItem = localStorage.getItem("user");
    return userItem ? JSON.parse(userItem) : null;
};

const setUser = (user: User): void => {
    localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = (): void => {
    localStorage.removeItem("user");
};

const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser
};

export default TokenService;
