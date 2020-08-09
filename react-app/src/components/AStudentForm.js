import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as studentActions from "../actions/aStudent";
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
    name: '',
    surname: '',
    aClassId: '',
}

const AStudentForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

    //validate()
    //validate({name:'Ali'})
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('surname' in fieldValues)
            temp.surname = fieldValues.surname ? "" : "This field is required."
        if ('aClassId' in fieldValues)
            temp.aClassId = fieldValues.aClassId ? "" : "This field is required."
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
        props.studentFetchEntityList()
    }, []);


    const handleSubmit = e => {
        e.preventDefault()
        console.log("handleSubmit", values);
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            let { id, name, surname, aClassId } = values
            if (props.currentId)
                props.updateEntity(props.currentId, { id, name, surname, aClassId }, onSuccess);
            else
                props.createEntity({ id, name, surname, aClassId }, onSuccess);
        }
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.aStudentList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" align="center" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        name="name"
                        variant="outlined"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        {...(errors.name && { error: true, helperText: errors.name })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="surname"
                        variant="outlined"
                        label="Surname"
                        value={values.surname}
                        onChange={handleInputChange}
                        {...(errors.surname && { error: true, helperText: errors.surname })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {...(errors.aClassId && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Class name</InputLabel>
                        <Select
                            name="aClassId"
                            value={values.aClassId}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >{
                                props.aClassList.map(aClass =>
                                    <MenuItem value={aClass.id} key={aClass.id}>{aClass.className}</MenuItem>
                                )
                            }

                        </Select>
                        {errors.aClassId && <FormHelperText>{errors.aClassId}</FormHelperText>}
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
    aStudentList: state.aStudent.list,
    aClassList: state.aClass.list,
})

const mapActionToProps = {
    createEntity: studentActions.createEntity,
    updateEntity: studentActions.updateEntity,
    studentFetchEntityList: classActions.fetchEntityList,
    classFetchEntityList: classActions.fetchEntityList,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(AStudentForm));