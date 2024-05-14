import api from "./api.service"

const searchGame = async (search: string) => {
    const res = await api.get(`/games/search/=${search}`);
    return res.data;
}

const getGames = async () => {
    const res = await api.get("/games");
    return res.data;
}

const getGame = async (uuid: string) => {
    const res = await api.get(`/games/${uuid}`);
    return res.data;
}

const createGame = async (data: any) => {
    const res = await api.post("/games", data);
    return res.data;
}

const updateGame = async (uuid: string, data: any) => {
    const res = await api.patch(`/games/${uuid}`, data);
    return res.data;
}

const joinGame = async (uuid: string, userUuid:string) => {
const res = await api.patch(`/games/join/${uuid}`, {userUuid});
console.log(res.data);
    return res.data;
}

const deleteGame = async (uuid: string) => {
    const res = await api.delete(`/games/${uuid}`);
    return res.data;
}

const GameService = {
    searchGame,
    getGames,
    getGame,
    joinGame,
    createGame,
    updateGame,
    deleteGame,
};

export default GameService;