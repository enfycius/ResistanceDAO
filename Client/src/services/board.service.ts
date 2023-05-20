import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

export const getBoards = () => {
  return axios.get(API_URL + "get" + "/boards", { headers: authHeader() });
};

export const postBoard = (title: string, content: string) => {
    return axios.post(API_URL + "post" + "/board", {title,
    content}, {
        headers: authHeader()
    });
}