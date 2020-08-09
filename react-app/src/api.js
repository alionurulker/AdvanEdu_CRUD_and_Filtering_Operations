import axios from "axios";

const baseUrl = "http://localhost:64981/api/"

const createApi = (controllerName) => {
    let url = baseUrl + controllerName+"/"
    return {
        fetchAll: () => axios.get(url),
        fetchFilterName: (filter) => axios.get(url + "?name=" + filter),
        fetchFilterSurname: (filter) => axios.get(url + "?surname=" + filter),
        fetchFilterClassName: (filter) => axios.get(url + "?className=" + filter),
        fetchFilterCourseName: (filter) => axios.get(url + "?courseName=" + filter),
        fetchById: id => axios.get(url + id),
        create: newRecord => axios.post(url, newRecord),
        update: (id, updateRecord) => axios.put(url + id, updateRecord),
        delete: id => axios.delete(url + id)
    }
}

export let classApi = createApi("AClass")
export let courseApi = createApi("ACourse")
export let studentApi = createApi("AStudent")
