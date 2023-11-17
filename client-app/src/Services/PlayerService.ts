import axios, { AxiosResponse } from "axios";
import { IPlayer } from "../Interfaces/interface";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Players = {
  lists: () => requests.get<IPlayer[]>("/players"),
  create: (player: IPlayer) => requests.post<void>("/players", player),
  update: (player: IPlayer) => requests.put<void>(`/players`, player),
  delete: (playerID: number) => requests.del<void>(`/players?playerID=${playerID}`),
};

const PlayersService = {
  Players
};

export default PlayersService;
