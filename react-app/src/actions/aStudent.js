import { studentApi } from "../api";

export const ACTION_TYPES = {
    CREATE: 'STUDENT_CREATE',
    UPDATE: 'STUDENT_UPDATE',
    DELETE: 'STUDENT_DELETE',
    FETCH_ALL: 'STUDENT_FETCH_ALL',
    FETCH_BY_ID: 'STUDENT_FETCH_BY_ID'
}

const formateData = data => ({
    ...data,
})

export const fetchEntityList = (filter, labelName) => dispatch => {
    if(labelName == "Name"){
        console.log("name",filter)
        studentApi.fetchFilterName(filter)
        .then(response => {
            console.log("fetchEntityList",response)
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.warn("api err: ",err))
    }else if(labelName == "Surname"){
        studentApi.fetchFilterSurname(filter)
        .then(response => {
            console.log("fetchEntityList",response)
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.warn("api err: ",err))
    }else if(labelName == "Class Name"){
        studentApi.fetchFilterClassName(filter)
        .then(response => {
            console.log("fetchEntityList",response)
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.warn("api err: ",err))
    }else if(labelName == "Course Name"){
        studentApi.fetchFilterCourseName(filter)
        .then(response => {
            console.log("fetchEntityList",response)
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.warn("api err: ",err))
    }else{
        studentApi.fetchAll()
        .then(response => {
            console.log("fetchEntityList",response)
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.warn("api err: ",err))
    }
    
}
export const fetchEntityById = () => dispatch => {
    studentApi.fetchById()
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
    studentApi.create(data)
        .then(res => {
            console.log("createEntitystudentApi",res)
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
    studentApi.update(id, data)
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
    studentApi.delete(id)
        .then(res => {
            console.log("deleteEntitystudentApi",res)
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.warn("api err: ",err))
}