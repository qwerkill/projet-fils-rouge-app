import api from "./api.service";

const getGrounds = async () => {
    const res = await api.get("/grounds");
    return res.data;
}

const getGround = async (uuid: string) => {
    const res = await api.get(`/grounds/${uuid}`);
    return res.data;
}

const createGround = async (data: any) => {
    const res = await api.post("/grounds", data);
    return res.data;
}

const updateGround = async (uuid: string, data: any) => {
    const res = await api.patch(`/grounds/${uuid}`, data);
    return res.data;
}


const deleteGround = async (uuid: string) => {
    const res = await api.delete(`/grounds/${uuid}`);
    return res.data;
}


const GroundService = {
    getGrounds,
    getGround,
    createGround,
    updateGround,
    deleteGround,
};

export default GroundService;