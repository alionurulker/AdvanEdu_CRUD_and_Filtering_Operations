import { courseApi } from "../api";

export const ACTION_TYPES = {
    CREATE: 'COURSE_CREATE',
    UPDATE: 'COURSE_UPDATE',
    DELETE: 'COURSE_DELETE',
    FETCH_ALL: 'COURSE_FETCH_ALL',
    FETCH_BY_ID: 'COURSE_FETCH_BY_ID'
}

const formateData = data => ({
    ...data,
})

export const fetchEntityList = () => dispatch => {
    courseApi.fetchAll()
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
    courseApi.fetchById()
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
    courseApi.create(data)
        .then(res => {
            console.log("createEntitycourseApi",res)
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
    courseApi.update(id, data)
        .then(res => {
            console.log("updateEntitycourseApi",res)
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.warn("api err: ",err))
}
export const deleteEntity = (id, onSuccess) => dispatch => {
    courseApi.delete(id)
        .then(res => {
            console.log("deleteEntitycourseApi",res)
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.warn("api err: ",err))
}