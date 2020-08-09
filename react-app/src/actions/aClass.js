import { classApi } from "../api";

export const ACTION_TYPES = {
    CREATE: 'CLASS_CREATE',
    UPDATE: 'CLASS_UPDATE',
    DELETE: 'CLASS_DELETE',
    FETCH_ALL: 'CLASS_FETCH_ALL',
    FETCH_BY_ID: 'CLASS_FETCH_BY_ID'
}

const formateData = data => ({
    ...data,
})

export const fetchEntityList = () => dispatch => {
    classApi.fetchAll()
        .then(response => {
            console.log("fetchEntityList",response)
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.warn("api err: ",err))
}
export const fetchEntityById = () => dispatch => {
    classApi.fetchById()
        .then(response => {
            console.log("fetchEntityById",response)
            dispatch({
                type: ACTION_TYPES.FETCH_BY_ID,
                payload: response.data
            })
        })
        .catch(err => console.warn("api err: ",err))
}
export const createEntity = (data, onSuccess) => dispatch => {
    data = formateData(data)
    classApi.create(data)
        .then(res => {
            console.log("createEntityclassApi",res)
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.warn("api err: ",err))
}
export const updateEntity = (id, data, onSuccess) => dispatch => {
    data = formateData(data)
    classApi.update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...res.data }
            })
            onSuccess()
        })
        .catch(err => console.warn("api err: ",err))
}
export const deleteEntity = (id, onSuccess) => dispatch => {
    classApi.delete(id)
        .then(res => {
            console.log("deleteEntityclassApi",res)
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.warn("api err: ",err))
}