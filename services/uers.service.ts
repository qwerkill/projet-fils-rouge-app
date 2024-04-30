import api from "./api.service";

const getAllUsers = async () => {
    const res = await api.get("/users");
    return res.data;
}

const getUser = async (uuid: string) => {
    const res = await api.get(`/users/${uuid}`);
    return res.data;
}

const createUser = async (data: any) => {
    const res = await api.post("/users", data);
    return res.data;
}

const updateUser = async (uuid: string, data: any) => {
    const res = await api.put(`/users/${uuid}`, data);
    return res.data;
}

const deleteUser = async (uuid: string) => {
    const res = await api.delete(`/users/${uuid}`);
    return res.data;
}

const UserService = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};

export default UserService;