import axios from "axios";
import { Repository } from "../interfaces/Repository";
import { GithubUser } from "../interfaces/GithubUser";
import { RepositoryPayload } from "../interfaces/RepositoryPayload";

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL || "https://api.github.com"
const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN

const githubClient = axios.create({
    baseURL: GITHUB_API_URL,
    headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
        Accept: "application/vnd.github.v3+json"
    }
});

export const fetchRepositories = async (): Promise<Repository[]> => {
    try {
        const response = await githubClient.get(`${GITHUB_API_URL}/user/repos`, {
            headers: {
                Authorization: `Bearer ${GITHUB_API_TOKEN}`
            },
            params: {
                per_page: 10,
                sort: "created",
                direction: "desc",
                affiliation: "owner",
                t: Date.now() // Evitar cache
            }
        });
        return response.data as Repository[]
    } catch (error) {
        console.error("Error al leer repositorios", error);
        throw new Error(`${(error as Error).message}`)
    }
}

export const fetchUserInfo = async (): Promise<GithubUser> => {
    try {
        const response = await githubClient.get("user");
        return response.data as GithubUser
    } catch (error) {
        console.error("Error al leer usuario", error);
        throw new Error(`${(error as Error).message}`)
    }
}

export const createRepository = async (repository : RepositoryPayload): Promise<Repository> => {
    try {
        const response = await githubClient.post("user/repos", repository);
        return response.data as Repository
    } catch (error) {
        console.error("Error al agregar repositorio", error);
        throw new Error(`${(error as Error).message}`)
    }
}