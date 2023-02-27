import { movieSearchInfoProvider, movieSearchProvider, movieStreamProvider } from "../providers/MovieProvider";
import { getLocalStorage, setLocalStorage } from "../stores/storage";

export function movieSearch(value, page = 1) {
    return movieSearchProvider(value, page).then(res => {
        setLocalStorage(value, res.data);
        return res.data;
    }).catch(err => {
        console.log(err);
    });
}

export function movieSearchPage(value, page) {
    return movieSearchProvider(value, page).then(res => {
        setLocalStorage(value + page, res.data);
        return res.data;
    }).catch(err => {
        console.log(err);
    });
}

export function movieSearchInfo(id, type) {
    return movieSearchInfoProvider(id, type).then(res => {
        setLocalStorage(id + "/" + type, res.data);
        return res.data;
    }).catch(err => {
        console.log(err);
    });
}

export function movieStream(episodeId, id, type) {
    return movieStreamProvider(episodeId, id, type).then(res => {
        setLocalStorage(episodeId, res.data);
        return res.data;
    }).catch(err => {
        console.log(err);
    })
}