import { combineReducers } from "redux";
import { aClass } from "./aClass";
import { aCourse } from "./aCourse";
import { aStudent } from "./aStudent";

export const reducers = combineReducers({
    aClass,
    aCourse,
    aStudent
})