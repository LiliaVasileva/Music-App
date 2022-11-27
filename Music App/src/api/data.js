import { get } from "./api.js";

export async function getAll(){
    return get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}