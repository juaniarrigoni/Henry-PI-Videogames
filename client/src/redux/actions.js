import axios from "axios"

/////-----DESDE EL BACK-----/////
export function getAllVideogames() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/videogames")
        return dispatch({
            type: "GET_ALL_VIDEOGAMES",
            payload: json.data
        })
    }
}

export function getVideogamesByName(name) {
    return async function (dispatch) {
        try {
            var response = await axios.get("http://localhost:3001/videogames?name=" + name)
            return dispatch({
                type: "GET_VIDEOGAMES_BY_NAME",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getAllGenres() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/genres'); //ver si le pongo ,{}

        return dispatch({
            type: 'GET_ALL_GENRES',
            payload: json.data
        })
    }
};

/////-----FILTROS-----/////
export function filterByCreation(payload) {
    return {
        type: "FILTER_CREATION",
        payload
    }
}

export function orderByName(payload) {
    return {
        type: "ORDER_NAME",
        payload
    }
}

export function orderByRating(payload) {
    return {
        type: "ORDER_RATING",
        payload
    }
}

export function filterByGenre(payload) { //el payload es el value del input
    return {
        type: 'FILTER_BY_GENRE',
        payload
    }
}

/////-----FORM-----/////