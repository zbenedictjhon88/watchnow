import axios from "axios";
import apiConfig from "../../config/api.config";

export function movieSearchProvider(value, page) {
    return axios.get(apiConfig.based_url + value + "?page=" + page);
}

export function movieSearchInfoProvider(id, type) {
    return axios.get(apiConfig.based_url + "info?id=" + id + "/" + type);
}

export function movieStreamProvider(episodeId, id, type, server = "asianload") {
    return axios.get(apiConfig.based_url + "watch?episodeId=" + episodeId + "&mediaId=" + id + "/" + type + "&server=" + server);
}