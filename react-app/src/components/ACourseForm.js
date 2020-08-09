import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as courseActions from "../actions/aCourse";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(0.5)
    }
})

const initialFieldValues = {
    courseName:'',
}

const ACourseForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

    //validate()
    //validate({name:'Ali'})
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('courseName' in fieldValues)
            temp.courseName = fieldValues.courseName ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    

    const handleSubmit = e => {
        e.preventDefault()
        console.log("handleSubmit", values);
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId)
                props.updateEntity(props.currentId, values, onSuccess);
            else
                props.createEntity(values, onSuccess);
        }
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.aCourseList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" align="center" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        name="courseName"
                        variant="outlined"
                        label="Course Name"
                        value={values.courseName}
                        onChange={handleInputChange}
                        {...(errors.courseName && { error: true, helperText: errors.courseName })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>

                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>

                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    aCourseList: state.aCourse.list
})

const mapActionToProps = {
    createEntity: courseActions.createEntity,
    updateEntity: courseActions.updateEntity,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ACourseForm));