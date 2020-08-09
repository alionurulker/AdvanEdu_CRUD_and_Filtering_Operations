import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as classActions from "../actions/aClass";
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
    className: '',
    aCourseId: '',
}

const AClassForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

    //validate()
    //validate({name:'Ali'})
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('className' in fieldValues)
            temp.className = fieldValues.className ? "" : "This field is required."
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

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
        props.classFetchEntityList()
    }, []);


    const handleSubmit = e => {
        e.preventDefault()
        console.log("handleSubmit", values);
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            let { id, className, courseName, aCourseId } = values
            if (props.currentId)
                props.updateEntity(props.currentId, { id, className, courseName, aCourseId }, onSuccess);
            else
                props.createEntity({ id, className, courseName, aCourseId }, onSuccess);
        }
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.aClassList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" align="center" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        name="className"
                        variant="outlined"
                        label="className"
                        value={values.className}
                        onChange={handleInputChange}
                        {...(errors.className && { error: true, helperText: errors.className })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {...(errors.aCourseId && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Course Name</InputLabel>
                        <Select
                            name="aCourseId"
                            value={values.aCourseId}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >{
                                props.aCourseList.map(aCourse =>
                                    <MenuItem value={aCourse.id} key={aCourse.id}>{aCourse.courseName}</MenuItem>
                                )
                            }

                        </Select>
                        {errors.aCourseId && <FormHelperText>{errors.aCourseId}</FormHelperText>}
                    </FormControl>
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
    aClassList: state.aClass.list,
    aCourseList: state.aCourse.list,
})

const mapActionToProps = {
    createEntity: classActions.createEntity,
    updateEntity: classActions.updateEntity,
    classFetchEntityList: classActions.fetchEntityList,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(AClassForm));